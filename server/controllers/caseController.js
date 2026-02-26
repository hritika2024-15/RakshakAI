const Case = require('../models/case');
const Petitioner = require('../models/Petitioner');
const { GoogleGenerativeAI } = require('@google/generative-ai');

exports.getVexProfile = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) return res.status(400).json({ message: "Respondent name query is required" });

    // 1. Fetch cases against the respondent
    const cases = await Case.find({
      respondentName: { $regex: name, $options: 'i' }
    }).sort({ filingDate: 1 });

    if (cases.length === 0) {
      // Cross-reference: Check if this name exists as a Petitioner - get canonical name
      const petitionerEntry = await Case.findOne({ petitionerName: { $regex: name, $options: 'i' } }).select('petitionerName');
      const canonicalName = petitionerEntry ? petitionerEntry.petitionerName : name;

      return res.status(200).json({
        vpiReport: {
          respondentName: canonicalName,
          foundAsPetitioner: !!petitionerEntry,
          vpiScore: 0,
          riskLevel: "Normal Litigation",
          riskNote: "Statistical Pattern Indicator – Not a legal determination.",
          summary: petitionerEntry ?
            "Target identified as a petitioner in other records. No respondent history detected." :
            "No prior litigation pressure detected for this entity.",
          cases: [],
          stats: {
            totalCases: 0,
            uniquePetitioners: 0,
            repeatPetitioners: 0,
            dismissalRate: "0.0",
            avgInterval: "N/A",
            totalCosts: "₹0"
          },
          petitionerDistribution: [],
          statusDistribution: []
        }
      });
    }

    const totalCases = cases.length;

    // Petitioner Analysis
    const petitionerCounts = {};
    cases.forEach(c => {
      petitionerCounts[c.petitionerName] = (petitionerCounts[c.petitionerName] || 0) + 1;
    });

    const uniquePetitioners = Object.keys(petitionerCounts).length;
    const sortedPetitioners = Object.entries(petitionerCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({
        name,
        count,
        percentage: ((count / totalCases) * 100).toFixed(1)
      }));

    const repeatPetitionersCount = Object.values(petitionerCounts).filter(c => c > 1).length;
    const maxPetitionerShare = sortedPetitioners[0].count / totalCases;

    // Dismissal/Withdrawal Rate
    const dismissedCount = cases.filter(c => ['Dismissed', 'Withdrawn', 'Frivolous'].includes(c.status)).length;
    const dismissalRate = (dismissedCount / totalCases) * 100;

    // Interval Calculation
    let avgIntervalDays = 0;
    let shortIntervalCount = 0;
    if (totalCases > 1) {
      const dates = cases.map(c => new Date(c.filingDate));
      let totalDiff = 0;
      for (let i = 1; i < dates.length; i++) {
        const diff = (dates[i] - dates[i - 1]) / (1000 * 60 * 60 * 24);
        totalDiff += diff;
        if (diff < 60) shortIntervalCount++;
      }
      avgIntervalDays = totalDiff / (totalCases - 1);
    }
    const shortIntervalRatio = shortIntervalCount / (totalCases - 1 || 1);

    // Spike Index (Max cases in any 30-day window)
    let maxSpike = 0;
    for (let i = 0; i < cases.length; i++) {
      const startDate = new Date(cases[i].filingDate);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 30);
      const count = cases.filter(c => {
        const d = new Date(c.filingDate);
        return d >= startDate && d <= endDate;
      }).length;
      if (count > maxSpike) maxSpike = count;
    }
    const spikeIndex = Math.min(maxSpike / 5, 1); // Normalized to 5 cases/month

    // Pressure Score = (0.4 × repeated filer ratio) + (0.3 × filing frequency spike index) + (0.2 × dismissal rate) + (0.1 × short interval clustering)
    // repeated_filer_ratio: top petitioner share
    // spike_index: normalized spike
    // dismissal_rate: normalized (80% = 1.0)
    // short_interval_clustering: simplified as ratio of intervals < 60 days

    let pressureScore = Math.round(
      (0.4 * maxPetitionerShare * 100) +
      (0.3 * spikeIndex * 100) +
      (0.2 * Math.min(dismissalRate / 80, 1) * 100) +
      (0.1 * shortIntervalRatio * 100)
    );

    let riskLevel = "Normal Litigation";
    if (pressureScore > 60) riskLevel = "High Litigation Pressure Pattern";
    else if (pressureScore > 30) riskLevel = "Elevated Litigation Activity";

    const vpiReport = {
      respondentName: cases[0]?.respondentName || name,
      vpiScore: pressureScore,
      riskLevel,
      riskNote: "Statistical Pattern Indicator – Not a legal determination.",
      summary: pressureScore > 60 ?
        `Significant concentrated pattern detected. ${sortedPetitioners[0].name} accounts for ${sortedPetitioners[0].percentage}% of identified filings. Primary temporal clusters indicate non-random distribution.` :
        `Litigation patterns appear consistent with baseline industrial exposure. No extensive volume clustering from singular entities detected.`,
      stats: {
        totalCases,
        uniquePetitioners: uniquePetitioners,
        repeatPetitioners: repeatPetitionersCount,
        dismissalRate: dismissalRate.toFixed(1),
        avgInterval: avgIntervalDays > 0 ? `${(avgIntervalDays / 30).toFixed(1)}mo` : "N/A",
        totalCosts: `₹${Math.round((totalCases * 65000) / 1000)}K`,
      },
      petitionerDistribution: sortedPetitioners.slice(0, 5),
      statusDistribution: [], // Will populate below
      cases: cases.reverse().map(c => ({
        cnrNumber: c.caseNumber || 'N/A',
        petitioner: c.petitionerName,
        courtName: c.courtName || 'Unknown',
        filingDate: c.filingDate ? new Date(c.filingDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A',
        status: c.status || 'Ongoing',
        costs: `₹${Math.floor(c.costs / 1000)}K`,
        remarks: c.remarks
      }))
    };

    // Populate status distribution for charts
    const yearStatusMap = {};
    cases.forEach(c => {
      const year = new Date(c.filingDate).getFullYear();
      if (!yearStatusMap[year]) yearStatusMap[year] = { year, Dismissed: 0, Ongoing: 0, Allowed: 0 };
      const status = ['Dismissed', 'Withdrawn', 'Frivolous'].includes(c.status) ? 'Dismissed' :
        (c.status === 'Ongoing' ? 'Ongoing' : 'Allowed');
      yearStatusMap[year][status]++;
    });
    vpiReport.statusDistribution = Object.values(yearStatusMap);

    res.status(200).json({ vpiReport });

  } catch (error) {
    console.error("Analysis Error:", error);
    res.status(500).json({ message: "Internal Analysis Engine Failure" });
  }
};

exports.analyzePetitioner = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Petitioner name is required" });

    // 1. Collect all remarks/summaries from cases for this petitioner
    const cases = await Case.find({ petitionerName: { $regex: name, $options: 'i' } });

    if (cases.length === 0) {
      return res.status(404).json({ message: "No cases found for this petitioner" });
    }

    const aggregatedRemarks = cases
      .map(c => c.remarks)
      .filter(r => r && r.trim() !== "")
      .join("\n\n---\n\n");

    if (!aggregatedRemarks) {
      return res.status(200).json({
        message: "No judicial remarks found to analyze",
        aiAnalysis: {
          modusOperandi: "No recorded judicial reprimands",
          judicialSentiment: "No prior judicial criticism detected in the provided records.",
          criticalExcerpts: [],
          riskIndicators: ["No high-risk judicial patterns identified."],
          lastUpdated: new Date()
        }
      });
    }

    // 2. Call Gemini 2.5 Flash API
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: "You are a Senior Judicial Intelligence Analyst. Analyze the provided court order excerpts for a specific petitioner. Identify patterns of 'Abuse of Process'.\nOutput Requirements (JSON only):\n'modus_operandi': 1-sentence description of filing behavior.\n'judicial_sentiment': Objective summary of how judges view this petitioner.\n'critical_excerpts': Array of 2-3 direct quotes where judges used terms like 'frivolous', 'meritless', or 'cost imposed'.\n'risk_indicators': 3 bullet points of factual red flags (e.g., high dismissal rate).\nConstraints: Do not use defamatory labels. Stick to judicial facts. If no criticism is found, return 'No recorded judicial reprimands'."
    });

    const prompt = `Analyze the following judicial remarks for petitioner "${name}":\n\n${aggregatedRemarks}\n\nReturn JSON only.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Clean up potential markdown formatting from AI response more robustly
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    let analysis;
    try {
      analysis = JSON.parse(text);
    } catch (parseError) {
      console.error("JSON Parse Error on AI output:", text);
      // Fallback in case AI doesn't return perfect JSON
      analysis = {
        modus_operandi: "Analysis pattern detected but response parsing failed.",
        judicial_sentiment: "Pattern detection active. Judicial records indicate concentrated filing activity.",
        critical_excerpts: ["Manual review of judicial remarks recommended."],
        risk_indicators: ["Automated pattern extraction encountered a parsing variance."]
      };
    }

    // 3. Update or create Petitioner record
    const updatedPetitioner = await Petitioner.findOneAndUpdate(
      { name: { $regex: new RegExp(`^${name}$`, "i") } },
      {
        name: name,
        aiAnalysis: {
          modusOperandi: analysis.modus_operandi,
          judicialSentiment: analysis.judicial_sentiment,
          criticalExcerpts: analysis.critical_excerpts,
          riskIndicators: analysis.risk_indicators,
          lastUpdated: new Date()
        }
      },
      { upsert: true, new: true }
    );

    res.status(200).json({
      message: "Analysis completed successfully",
      aiAnalysis: updatedPetitioner.aiAnalysis
    });

  } catch (error) {
    console.error("AI Analysis Error:", error);
    res.status(500).json({ message: "AI Analysis Engine Failure", error: error.message });
  }
};

exports.getPetitionerProfile = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) return res.status(400).json({ message: "Petitioner name is required" });

    const cases = await Case.find({
      petitionerName: { $regex: name, $options: 'i' }
    }).sort({ filingDate: 1 });

    if (cases.length === 0) {
      return res.status(200).json({ petitionerProfile: null });
    }

    const totalCases = cases.length;

    // Target (Respondent) Distribution
    const respondentCounts = {};
    cases.forEach(c => {
      respondentCounts[c.respondentName] = (respondentCounts[c.respondentName] || 0) + 1;
    });

    const uniqueRespondents = Object.keys(respondentCounts).length;
    const sortedRespondents = Object.entries(respondentCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({
        name,
        count,
        percentage: ((count / totalCases) * 100).toFixed(1)
      }));

    const topRespondent = sortedRespondents[0];
    const concentrationScore = (topRespondent.count / totalCases) * 100;

    // Dismissal Rate
    const dismissedCount = cases.filter(c => ['Dismissed', 'Withdrawn', 'Frivolous'].includes(c.status)).length;
    const dismissalRate = (dismissedCount / totalCases) * 100;

    // Interval Calculation
    let avgInterval = "N/A";
    if (totalCases > 1) {
      const dates = cases.map(c => new Date(c.filingDate));
      let totalDiff = 0;
      for (let i = 1; i < dates.length; i++) {
        totalDiff += (dates[i] - dates[i - 1]);
      }
      const avgMs = totalDiff / (totalCases - 1);
      avgInterval = `${(avgMs / (1000 * 60 * 60 * 24 * 30)).toFixed(1)}mo`;
    }

    // Volume Chart Data (Last 5 Years)
    const yearCounts = {};
    cases.forEach(c => {
      const year = new Date(c.filingDate).getFullYear();
      yearCounts[year] = (yearCounts[year] || 0) + 1;
    });
    const volumeData = Object.entries(yearCounts).map(([year, count]) => ({ year: parseInt(year), count }));

    // Fetch existing AI Analysis
    const petitioner = await Petitioner.findOne({ name: { $regex: name, $options: 'i' } });

    res.status(200).json({
      petitionerProfile: {
        name: cases[0]?.petitionerName || name,
        stats: {
          totalCases,
          uniqueRespondents,
          dismissalRate: dismissalRate.toFixed(1),
          avgInterval,
          concentrationScore: concentrationScore.toFixed(1),
          topTarget: topRespondent.name
        },
        volumeData,
        targetDistribution: sortedRespondents.slice(0, 5),
        cases: cases.map(c => ({
          respondent: c.respondentName,
          filingDate: c.filingDate,
          status: c.status,
          remarks: c.remarks
        })),
        aiAnalysis: petitioner ? petitioner.aiAnalysis : null
      }
    });

  } catch (error) {
    console.error("Petitioner Analysis Error:", error);
    res.status(500).json({ message: "Petitioner Intelligence Failure" });
  }
};
