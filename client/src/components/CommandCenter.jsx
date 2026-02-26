import React from 'react';
import { motion } from 'framer-motion';
import { Search, Shield, Cpu, Database, Activity, Globe, Zap, Target } from 'lucide-react';

const CommandCenter = ({ onSearch }) => {
    const targets = [
        { name: "SafeStreet Infra Ltd", sector: "Infrastructure" },
        { name: "Nexus Real Estate", sector: "Real Estate" },
        { name: "Global Logistics", sector: "Transportation" }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-12 py-10 relative"
        >
            {/* Immersive Background Elements */}
            <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.05)_0%,transparent_70%)]" />
                <div className="absolute inset-0 opacity-[0.05]"
                    style={{ backgroundImage: `linear-gradient(#4b5563 0.5px, transparent 0.5px), linear-gradient(90deg, #4b5563 0.5px, transparent 0.5px)`, backgroundSize: '40px 40px' }} />

                {/* Random Data Streams */}
                {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ top: '-10%', left: `${20 * i}%`, opacity: 0 }}
                        animate={{ top: '110%', opacity: [0, 0.5, 0] }}
                        transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[1px] h-32 bg-gradient-to-b from-red-600 to-transparent"
                    />
                ))}
            </div>

            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center text-center relative">
                {/* Central Orb Visual */}
                <div className="relative mb-12">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-x-[-20px] inset-y-[-20px] bg-red-600/20 blur-[60px] rounded-full"
                    />
                    <div className="relative w-28 h-28 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-2xl overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent" />
                        <Shield className="text-red-500 w-12 h-12 relative z-10 group-hover:scale-110 transition-transform duration-500" />
                        <div className="scan-line select-none opacity-50" />
                    </div>
                </div>

                <motion.div variants={itemVariants} className="max-w-2xl px-6">
                    <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                        <span className="text-slate-500">Neural</span> Command Center
                    </h2>
                    <div className="flex items-center justify-center gap-4 mb-12">
                        <span className="h-[1px] w-12 bg-red-600/30" />
                        <p className="text-red-500 font-mono text-[10px] uppercase tracking-[0.4em] font-black animate-pulse">
                            Secure Intelligence Core // Analysis Ready
                        </p>
                        <span className="h-[1px] w-12 bg-red-600/30" />
                    </div>
                </motion.div>
            </div>

            {/* Target Selection and Stats Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Active Intelligence Targets */}
                <div className="lg:col-span-8 flex flex-col gap-4">
                    <motion.div variants={itemVariants} className="flex items-center justify-between mb-2 px-2">
                        <div className="flex items-center gap-3">
                            <Target size={14} className="text-red-500" />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Target Profiles</h3>
                        </div>
                        <span className="text-[8px] font-mono text-dim animate-pulse">SCANNING NODES...</span>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {targets.map((target, i) => (
                            <motion.button
                                key={target.name}
                                variants={itemVariants}
                                whileHover={{ y: -8, borderColor: 'rgba(239, 68, 68, 0.4)', boxShadow: '0 20px 40px -20px rgba(0,0,0,0.5)' }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => onSearch(target.name)}
                                className="card-panel p-6 bg-[#0a0a0a] text-left group transition-all relative overflow-hidden flex flex-col justify-center min-h-[160px]"
                            >
                                <div className="absolute -right-4 -top-4 p-8 opacity-0 group-hover:opacity-[0.03] transition-opacity rotate-12">
                                    <Globe size={80} />
                                </div>
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1 group-hover:text-red-500 transition-colors">
                                    {target.sector}
                                </p>
                                <h4 className="text-base font-black text-white group-hover:text-red-100 transition-colors leading-tight">
                                    {target.name}
                                </h4>
                                <div className="mt-8 flex items-center justify-between">
                                    <span className="text-[8px] font-mono text-dim uppercase tracking-widest">Initialization Ready</span>
                                    <Activity size={10} className="text-red-500/30 group-hover:text-red-500 transition-colors" />
                                </div>
                                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Right: System Overview */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                    <motion.div variants={itemVariants} className="flex items-center gap-3 mb-2 px-2">
                        <Activity size={14} className="text-red-500" />
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Neural Telemetry</h3>
                    </motion.div>

                    <motion.div variants={itemVariants} className="card-panel p-6 bg-slate-900/40 backdrop-blur-xl flex-1 relative overflow-hidden group">
                        <div className="space-y-6">
                            {[
                                { label: "Database Records", value: "4.21M", icon: Database, color: "text-red-500" },
                                { label: "Nodes Indexed", value: "135,012", icon: Globe, color: "text-blue-500" },
                                { label: "Neural Load", value: "14.2%", icon: Cpu, color: "text-emerald-500" }
                            ].map((stat, i) => (
                                <div key={i} className="flex items-center gap-4 relative z-10">
                                    <div className={`w-10 h-10 rounded-lg bg-black border border-white/5 flex items-center justify-center ${stat.color} shadow-lg shadow-black/50`}>
                                        <stat.icon size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] uppercase tracking-widest text-[#555] font-black mb-0.5">{stat.label}</p>
                                        <p className="text-xl font-black text-white tracking-tighter leading-none">{stat.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/5 relative z-10">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-[9px] text-dim font-black uppercase tracking-[0.2em]">Processing Latency</span>
                                <span className="text-[9px] text-emerald-500 font-mono font-bold tracking-tighter">18ms</span>
                            </div>
                            <div className="flex gap-1 h-1">
                                {Array.from({ length: 20 }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0.1 }}
                                        animate={{ opacity: [0.1, 1, 0.1] }}
                                        transition={{ duration: 0.5, delay: i * 0.05, repeat: Infinity }}
                                        className="flex-1 bg-emerald-500 rounded-full"
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="absolute -right-10 -bottom-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity group-hover:scale-110 duration-1000">
                            <Zap size={240} />
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default CommandCenter;
