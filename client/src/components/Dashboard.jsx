import React, { useState } from 'react';
import { Search } from 'lucide-react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import RiskGauge from './RiskGauge';
import FilingTimeline from './FilingTimeline';
import KPICards from './KPICards';
import FilingFrequency from './FilingFrequency';
import PetitionerConcentration from './PetitionerConcentration';
import DismissalPattern from './DismissalPattern';
import PatternAnalysis from './PatternAnalysis';
import AuditTrailTable from './AuditTrailTable';
import RespondentRepeatedPetitioners from './RespondentRepeatedPetitioners';
import PetitionerAnalysis from './PetitionerAnalysis';
import CleanHistoryState from './CleanHistoryState';
import { API_BASE_URL } from '../config/api';
import CommandCenter from './CommandCenter';

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Petitioner Investigation State
    const [petitionerData, setPetitionerData] = useState(null);
    const [petitionerLoading, setPetitionerLoading] = useState(false);

    const handleSearch = async (respondentName) => {
        setIsLoading(true);
        setError(null);
        setPetitionerData(null); // Clear petitioner analysis on new respondent search
        try {
            const response = await axios.get(`${API_BASE_URL}/api/cases/analyze?name=${respondentName}`);
            setData(response.data.vpiReport);
        } catch (err) {
            console.error("API Error:", err);
            setError("Analysis system offline. Verify backend connection.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleInvestigatePetitioner = async (petitionerName) => {
        setPetitionerLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/api/cases/petitioner?name=${petitionerName}`);
            if (response.data.petitionerProfile) {
                setPetitionerData(response.data.petitionerProfile);
            } else {
                setPetitionerData({ name: petitionerName, notFound: true });
            }
        } catch (err) {
            console.error("Petitioner API Error:", err);
        } finally {
            setPetitionerLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-slate-200 selection:bg-red-500/30 pb-12">
            <Header
                onSearch={handleSearch}
                isLoading={isLoading}
                onBack={() => setData(null)}
                showBack={!!data}
            />

            <main className="max-w-[1400px] mx-auto px-6 mt-4">
                <AnimatePresence mode="wait">
                    {!data && !isLoading && !error && (
                        <CommandCenter onSearch={handleSearch} />
                    )}

                    {error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-red-900/10 border border-red-500/20 p-6 rounded text-red-500 text-center flex flex-col items-center"
                        >
                            <span className="text-2xl mb-4">⚠️</span>
                            <p className="font-mono text-xs uppercase tracking-widest">{error}</p>
                        </motion.div>
                    )}

                    {data && (
                        <motion.div
                            key="dashboard-grid"
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            className="flex flex-col gap-4 relative"
                        >
                            <div className="flex justify-between items-end mb-2">
                                <motion.div variants={itemVariants}>
                                    <h2 className="text-2xl font-black text-white tracking-tight uppercase">Analysis Profile: {data.respondentName}</h2>
                                    <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-1">
                                        {data.riskNote}
                                    </p>
                                </motion.div>
                            </div>

                            {/* Row 1: KPI CARDS */}
                            <motion.div variants={itemVariants}>
                                <KPICards stats={data.stats} />
                            </motion.div>

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                                {/* Left Column: Main Analysis / Clean State */}
                                <div className="lg:col-span-8 flex flex-col gap-4">
                                    {data.stats.totalCases === 0 ? (
                                        <motion.div variants={itemVariants}>
                                            <CleanHistoryState
                                                respondentName={data.respondentName}
                                                foundAsPetitioner={data.foundAsPetitioner}
                                                onInvestigate={handleInvestigatePetitioner}
                                            />
                                        </motion.div>
                                    ) : (
                                        <>
                                            {/* Row 2: REPEAT PETITIONER ANALYSIS */}
                                            <motion.div variants={itemVariants}>
                                                <RespondentRepeatedPetitioners
                                                    petitioners={data.petitionerDistribution}
                                                    onInvestigate={handleInvestigatePetitioner}
                                                    isInvestigating={petitionerLoading}
                                                />
                                            </motion.div>

                                            {/* Row 3: FILING TIMELINE */}
                                            <motion.div variants={itemVariants}>
                                                <FilingTimeline data={data.cases} mainPetitioner={data.petitionerDistribution[0]?.name || ''} />
                                            </motion.div>

                                            {/* Row 4: CHARTS */}
                                            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <FilingFrequency data={data.statusDistribution} />
                                                <PetitionerConcentration data={data.petitionerDistribution} />
                                                <DismissalPattern data={data.statusDistribution} />
                                            </motion.div>
                                        </>
                                    )}
                                </div>

                                {/* Right Column: Risk & Summary */}
                                <div className="lg:col-span-4 flex flex-col gap-4">
                                    <motion.div variants={itemVariants}>
                                        <RiskGauge score={data.vpiScore} level={data.riskLevel} />
                                    </motion.div>
                                    <motion.div variants={itemVariants} className="flex-1">
                                        <PatternAnalysis summary={data.summary} />
                                    </motion.div>
                                </div>
                            </div>

                            {/* Row 6: CASE RECORDS */}
                            <motion.div variants={itemVariants}>
                                <AuditTrailTable cases={data.cases} />
                            </motion.div>

                            {/* Petitioner Analysis Sidebar */}
                            <AnimatePresence>
                                {petitionerData && (
                                    <PetitionerAnalysis
                                        data={petitionerData}
                                        onClose={() => setPetitionerData(null)}
                                        onRefresh={handleInvestigatePetitioner}
                                    />
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Subtle background noise overlay */}
            <div className="fixed inset-0 -z-10 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    );
};

export default Dashboard;
