import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { X, ExternalLink, ShieldAlert, BarChart, Target, Calendar, AlertTriangle, RefreshCw, Quote, Activity, Zap, Database } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6'];

const PetitionerAnalysis = ({ data, onClose, onRefresh }) => {
    const [isAnalyzing, setIsAnalyzing] = React.useState(false);
    const [localAiAnalysis, setLocalAiAnalysis] = React.useState(data?.aiAnalysis || null);

    React.useEffect(() => {
        setLocalAiAnalysis(data?.aiAnalysis || null);
    }, [data]);

    if (!data) return null;

    const { name, stats, volumeData, targetDistribution } = data;

    const handleReAnalyze = async () => {
        setIsAnalyzing(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/api/cases/analyze-petitioner`, { name });
            setLocalAiAnalysis(response.data.aiAnalysis);
            if (onRefresh) onRefresh(name);
        } catch (err) {
            console.error("Analysis Error:", err);
            alert("AI Analysis Engine failed. Check backend connection and API key.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const sidebarVariants = {
        hidden: { x: '100%', opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                damping: 35,
                stiffness: 300,
                when: "beforeChildren",
                staggerChildren: 0.08
            }
        },
        exit: {
            x: '100%',
            opacity: 0,
            transition: { ease: 'easeInOut', duration: 0.4 }
        }
    };

    const itemFade = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-y-0 right-0 w-full md:w-[820px] bg-[#050505]/98 backdrop-blur-3xl border-l border-white/10 z-[100] shadow-[-60px_0_120px_rgba(0,0,0,0.9)] overflow-y-auto p-0 scrollbar-hide flex flex-col"
        >
            <div className="scan-line absolute inset-x-0 h-[2px] bg-red-600/20 blur-[2px] z-50 pointer-events-none" />

            {/* Top Bar / Identification Section */}
            <div className="p-10 pb-6 relative overflow-hidden shrink-0 border-b border-white/5">
                <div className="absolute top-0 right-0 p-12 opacity-[0.02] rotate-12 -mr-20 -mt-20 pointer-events-none">
                    <ShieldAlert size={400} />
                </div>

                <div className="flex justify-between items-start relative z-10">
                    <motion.div variants={itemFade} className="flex gap-8 items-center">
                        {/* Biometric Avatar Visual */}
                        <div className="relative group shrink-0">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute -inset-3 border border-dashed border-red-500/20 rounded-full"
                            />
                            <div className="w-20 h-20 rounded-3xl bg-black border border-white/10 flex items-center justify-center relative overflow-hidden group-hover:border-red-500/40 transition-colors shadow-2xl">
                                <Activity size={32} className="text-red-500 animate-pulse" />
                                <div className="absolute inset-0 bg-gradient-to-t from-red-600/10 to-transparent" />
                                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-red-600/50" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="px-2 py-0.5 rounded bg-red-600/10 border border-red-500/20">
                                    <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em]">Identity Profile</span>
                                </div>
                                <span className="text-slate-700 font-mono text-[10px] tracking-widest">DOCKET_ID: {Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
                            </div>
                            <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none mb-3">
                                {name}
                            </h2>
                            <div className="flex items-center gap-4">
                                <p className="text-dim font-mono text-[9px] uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                                    Secure Node Established
                                </p>
                                <span className="text-slate-800">•</span>
                                <p className="text-dim font-mono text-[9px] uppercase tracking-widest">
                                    Sync: v4.2.1-STABLE
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.button
                        variants={itemFade}
                        whileHover={{ rotate: 90, scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onClose}
                        className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-red-600 hover:text-white transition-all group"
                    >
                        <X size={24} className="text-slate-400 group-hover:text-white" />
                    </motion.button>
                </div>
            </div>

            <div className="flex-1 px-10 py-10">
                {data.notFound ? (
                    <motion.div variants={itemFade} className="h-full flex flex-col items-center justify-center text-center py-20">
                        <div className="relative mb-8">
                            <div className="absolute inset-0 bg-red-500/10 blur-[40px] rounded-full animate-pulse" />
                            <div className="relative w-24 h-24 rounded-[2rem] bg-black border border-white/5 flex items-center justify-center">
                                <Database size={40} className="text-slate-700" />
                            </div>
                        </div>
                        <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-2">Dataset Node Empty</h3>
                        <p className="text-[10px] text-red-500 font-black uppercase tracking-[0.4em] mb-6 flex items-center justify-center gap-2">
                            Search Parameter Zeroed
                        </p>
                        <p className="text-slate-400 text-[11px] leading-relaxed max-w-sm uppercase tracking-widest font-medium">
                            No judicial records matched for <span className="text-white">{name}</span> across high-velocity indices. Verify the entity spelling or search via Forum Heatmap.
                        </p>
                    </motion.div>
                ) : (
                    <>
                        {/* Technical Telemetry Grid */}
                        <motion.div variants={itemFade} className="grid grid-cols-4 gap-4 mb-10">
                            {[
                                { label: "Case Volume", value: stats.totalCases, trend: "Static Index", color: "text-white" },
                                { label: "Spread Complexity", value: stats.uniqueRespondents, trend: "High Density", color: "text-blue-400" },
                                { label: "Dismissal Ratio", value: `${stats.dismissalRate}%`, trend: "Elevated Risk", color: "text-red-500" },
                                { label: "Filing Cycle", value: stats.avgInterval, trend: "System Normal", color: "text-emerald-500" }
                            ].map((stat, i) => (
                                <div key={i} className="card-panel p-5 bg-black/40 border border-white/5 group hover:border-red-500/20 transition-all flex flex-col justify-between min-h-[100px]">
                                    <p className="text-[9px] text-slate-500 uppercase tracking-widest font-black mb-4">{stat.label}</p>
                                    <div className="flex items-end justify-between">
                                        <p className={`text-2xl font-black tracking-tighter leading-none ${stat.color}`}>{stat.value}</p>
                                        <span className="text-[7px] font-mono text-dim uppercase opacity-50 mb-1">{stat.trend}</span>
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        {/* Neural Core Analysis */}
                        <motion.div
                            variants={itemFade}
                            className="mb-10 rounded-3xl border border-blue-900/30 bg-blue-950/10 backdrop-blur-md overflow-hidden shadow-2xl shadow-blue-950/20 relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.05] to-transparent pointer-events-none" />

                            <div className="px-8 py-5 flex justify-between items-center border-b border-blue-900/20">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                                        <Zap size={18} className="text-blue-400 animate-pulse" />
                                    </div>
                                    <div>
                                        <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-100">Neural Intelligence Synthesis</h3>
                                        <p className="text-[9px] text-blue-400/50 font-mono tracking-widest uppercase">Verified Pattern Matcher v.Stable</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleReAnalyze}
                                    disabled={isAnalyzing}
                                    className={`group relative px-5 py-2.5 rounded-xl border border-blue-500/30 bg-blue-600/10 text-[10px] font-black uppercase tracking-[0.2em] text-blue-100 hover:bg-blue-600 transition-all overflow-hidden ${isAnalyzing ? 'opacity-50' : ''}`}
                                >
                                    <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                                    <span className="relative flex items-center gap-2">
                                        <RefreshCw size={12} className={isAnalyzing ? 'animate-spin' : ''} />
                                        {isAnalyzing ? 'Processing...' : 'Recalibrate Signals'}
                                    </span>
                                </button>
                            </div>

                            <div className="p-10 relative">
                                {localAiAnalysis ? (
                                    <div className="space-y-10">
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="h-[2px] w-12 bg-blue-600" />
                                                <h4 className="text-blue-400 text-[11px] font-black uppercase tracking-widest">Modus Operandi Technical Summary</h4>
                                            </div>
                                            <p className="text-white text-[15px] font-medium leading-relaxed bg-white/[0.02] p-6 rounded-2xl border border-white/5 relative italic">
                                                <Quote size={24} className="absolute -top-4 -left-3 text-blue-600/20" />
                                                {localAiAnalysis.modusOperandi}
                                            </p>
                                        </motion.div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                                                <h4 className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" /> Judicial Correlation Signal
                                                </h4>
                                                <p className="text-slate-300 text-[12px] leading-relaxed italic opacity-80 border-l-2 border-white/10 pl-6 py-2">
                                                    "{localAiAnalysis.judicialSentiment}"
                                                </p>
                                            </motion.div>

                                            {localAiAnalysis.criticalExcerpts?.length > 0 && (
                                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                                                    <h4 className="text-red-500 text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                                                        <div className="w-1.5 h-1.5 bg-red-600 rounded-full" /> High-Confidence Indicators
                                                    </h4>
                                                    <div className="space-y-4">
                                                        {localAiAnalysis.criticalExcerpts.slice(0, 2).map((excerpt, idx) => (
                                                            <div key={idx} className="bg-red-600/5 p-4 rounded-xl border border-red-500/10 hover:bg-red-600/10 transition-colors">
                                                                <p className="text-[11px] text-red-500/80 font-mono leading-relaxed">
                                                                    {excerpt}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-16 text-center">
                                        <div className="w-24 h-24 rounded-[2rem] bg-blue-600/5 border border-blue-500/20 flex items-center justify-center mb-8 relative group-hover:scale-110 transition-transform">
                                            <ShieldAlert size={40} className="text-blue-400 opacity-40 group-hover:opacity-100 transition-opacity" />
                                            <div className="absolute inset-0 bg-blue-400/5 blur-2xl group-hover:bg-blue-400/10 transition-colors" />
                                        </div>
                                        <p className="text-[11px] text-blue-400/60 uppercase tracking-[0.4em] font-black mb-10">Neural Analysis Required for Complete Profile</p>
                                        <button
                                            onClick={handleReAnalyze}
                                            className="px-10 py-4 bg-blue-600 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-blue-500 hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] transition-all flex items-center gap-4 group"
                                        >
                                            <span>Initiate Verification Sequence</span>
                                            <span className="w-6 h-px bg-white/30 group-hover:w-10 transition-all" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {localAiAnalysis && (
                                <div className="bg-black/50 px-8 py-3 border-t border-white/5 flex justify-between items-center">
                                    <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em]">
                                        Telemetry Stamp: {new Date(localAiAnalysis.lastUpdated).toLocaleString()}
                                    </p>
                                    <div className="flex gap-1.5">
                                        {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 bg-blue-600/30 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />)}
                                    </div>
                                </div>
                            )}
                        </motion.div>

                        {/* Performance Charts Section - Vertical Stack */}
                        <div className="flex flex-col gap-8 mb-10">
                            {/* Filing Volume Chart */}
                            <motion.div variants={itemFade} className="card-panel p-10 bg-black/40">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="w-10 h-10 rounded-xl bg-red-600/10 flex items-center justify-center border border-red-500/20">
                                        <BarChart size={18} className="text-red-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-[11px] font-black uppercase tracking-widest text-white">Pressure Timeline Index</h3>
                                        <p className="text-[9px] text-slate-500 font-mono tracking-widest uppercase mt-1">Aggregated litigation velocity over 24 months</p>
                                    </div>
                                </div>
                                <div className="h-[220px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={volumeData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff03" vertical={false} />
                                            <XAxis dataKey="year" stroke="#4b5563" fontSize={10} axisLine={false} tickLine={false} />
                                            <YAxis hide />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#0c0c0c', border: '1px solid #1e1e1e', fontSize: '11px', borderRadius: '12px' }}
                                                itemStyle={{ color: '#ef4444' }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="count"
                                                stroke="#ef4444"
                                                strokeWidth={6}
                                                dot={{ r: 0 }}
                                                activeDot={{ r: 7, fill: '#ef4444', stroke: '#fff', strokeWidth: 3 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </motion.div>

                            {/* Target Distribution - Full Width */}
                            <motion.div variants={itemFade} className="card-panel p-10 bg-black/40">
                                <div className="flex items-center justify-between mb-10">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center border border-blue-500/20">
                                            <Target size={18} className="text-blue-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-[11px] font-black uppercase tracking-widest text-white">Respondent Surface Distribution</h3>
                                            <p className="text-[9px] text-slate-500 font-mono tracking-widest uppercase mt-1">Active entity nodes within legal reach</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 bg-blue-600/5 px-4 py-1.5 rounded-full border border-blue-500/10">
                                        <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{targetDistribution.length} NODES IDENTIFIED</span>
                                    </div>
                                </div>

                                <div className="flex flex-col lg:flex-row gap-12 items-start">
                                    {/* Chart Container */}
                                    <div className="w-full lg:w-1/3 h-[200px] relative shrink-0">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={targetDistribution}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={55}
                                                    outerRadius={75}
                                                    paddingAngle={8}
                                                    dataKey="count"
                                                    stroke="none"
                                                >
                                                    {targetDistribution.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                            </PieChart>
                                        </ResponsiveContainer>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                            <div className="text-[11px] font-black text-slate-600 uppercase tracking-widest">SIGNAL</div>
                                            <div className="text-[14px] font-black text-white leading-none mt-1">MAP</div>
                                        </div>
                                    </div>

                                    {/* Entity List Container - Multi Column if needed */}
                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                        {targetDistribution.slice(0, 10).map((entry, index) => (
                                            <motion.div
                                                key={index}
                                                whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.04)' }}
                                                className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all group"
                                            >
                                                <div className="flex items-center gap-4 flex-1 pr-4">
                                                    <div className="w-2.5 h-2.5 rounded-full shadow-[0_0_12px_currentColor] shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length], color: COLORS[index % COLORS.length] }} />
                                                    <span className="text-[13px] text-slate-200 font-bold group-hover:text-white transition-colors uppercase tracking-tight leading-tight">
                                                        {entry.name}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-4 shrink-0">
                                                    <div className="h-6 w-px bg-white/10" />
                                                    <span className="text-[12px] font-mono font-black text-blue-400 opacity-80 tabular-nums">{entry.count}</span>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Detailed Intelligence Feed */}
                        <motion.div variants={itemFade} className="card-panel p-10 bg-black/40 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-12 opacity-[0.01] pointer-events-none">
                                <Database size={200} />
                            </div>

                            <h3 className="text-[11px] uppercase tracking-[0.4em] text-dim font-black mb-10 flex items-center gap-6">
                                Chronological Judicial Stream
                                <div className="h-px flex-1 bg-white/5" />
                            </h3>

                            <div className="space-y-8">
                                {data.cases.map((c, idx) => (
                                    <motion.div
                                        key={idx}
                                        variants={itemFade}
                                        className="group relative pl-8 transition-all hover:bg-white/[0.01] -mx-6 px-6 py-6 rounded-2xl"
                                    >
                                        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/5 group-hover:bg-red-600/40 transition-colors" />
                                        <div className="absolute left-[-3.5px] top-8 w-2 h-2 rounded-full bg-white/10 group-hover:bg-red-500 shadow-lg group-hover:shadow-red-600/50 transition-all border-2 border-black" />

                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex flex-col gap-1">
                                                <h5 className="text-[15px] font-black text-white hover:text-red-400 transition-colors cursor-default uppercase tracking-tight">
                                                    {c.respondent}
                                                </h5>
                                                <div className="flex gap-3 items-center">
                                                    <span className="text-[10px] font-mono text-dim tracking-wider uppercase opacity-60">REF: {new Date(c.filingDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                                                    <span className="w-1 h-1 bg-white/10 rounded-full" />
                                                    <span className="text-[10px] font-mono text-dim tracking-wider uppercase opacity-60">ID: LN-{1000 + idx}</span>
                                                </div>
                                            </div>
                                            <div className={`px-3 py-1 rounded-lg border text-[9px] font-black uppercase tracking-widest ${c.status === 'Ongoing' ? 'border-amber-500/20 text-amber-500 bg-amber-500/5' : (['Dismissed', 'Frivolous', 'Withdrawn'].includes(c.status) ? 'border-red-500/20 text-red-500 bg-red-500/5' : 'border-emerald-500/20 text-emerald-500 bg-emerald-500/5')}`}>
                                                {c.status}
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute -left-2 top-0 bottom-0 w-[2px] bg-white/5 rounded-full" />
                                            <p className="text-[11px] text-slate-400 font-medium leading-[1.8] bg-black/40 p-5 rounded-xl border border-white/5 opacity-90 group-hover:opacity-100 transition-opacity italic">
                                                "{c.remarks}"
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </div>

            {/* Disclaimer Footer */}
            <div className="sticky bottom-0 bg-[#050505] p-8 border-t border-white/10 mt-auto shadow-[0_-20px_40px_rgba(0,0,0,0.5)] z-[60]">
                <div className="flex gap-6 items-center max-w-3xl">
                    <div className="w-12 h-12 rounded-2xl bg-red-600/10 border border-red-500/20 flex items-center justify-center shrink-0 shadow-lg shadow-red-950/20">
                        <ShieldAlert className="text-red-500" size={20} />
                    </div>
                    <p className="text-[10px] text-red-400/70 leading-relaxed font-bold uppercase tracking-[0.2em]">
                        RESTRICTED ACCESS // INTELLIGENCE VISUALIZATION ONLY. ALL FINDINGS REPRESENT STATISTICAL PATTERNS ACROSS JUDICIAL DATA SETS. PROFESSIONAL LEGAL REVIEW MANDATED FOR STRATEGIC DECISIONING.
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default PetitionerAnalysis;
