const mongoose = require('mongoose');

const PetitionerSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    aiAnalysis: {
        modusOperandi: String,
        judicialSentiment: String,
        criticalExcerpts: [String],
        riskIndicators: [String],
        lastUpdated: { type: Date, default: Date.now }
    }
});

module.exports = mongoose.model('Petitioner', PetitionerSchema);
