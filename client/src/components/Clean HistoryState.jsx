import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Shield, CheckCircle2, Search, Cpu } from 'lucide-react';

const CleanHistoryState = ({ respondentName, foundAsPetitioner, onInvestigate }) => {
    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            initial="hidden"
            animate="show"
            variants={{
                show: {
                    transition: {
                        staggerChildren: 0.1
                    }
                }
            }}
            className={`card-panel p-12 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[400px] border-2 ${foundAsPetitioner ? 'border-blue-500/30 bg-blue-500/5' : 'border-emerald-500/30'}`}
        >
            {/* Background Decorative Elements */}
            <div className={`absolute inset-0 pointer-events-none opacity-20`}>
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] ${foundAsPetitioner ? 'bg-blue-500/5' : 'bg-emerald-500/5'} rounded-full blur-[100px]`} />
                <div className="grid grid-cols-8 gap-4 opacity-5">
                    {Array.from({ length: 64 }).map((_, i) => (
                        <div key={i} className={`w-1 h-1 ${foundAsPetitioner ? 'bg-blue-500' : 'bg-emerald-500'} rounded-full`} />
                    ))}
                </div>
            </div>

            <motion.div variants={itemVariants} className="relative mb-8">
                <div className={`absolute inset-0 ${foundAsPetitioner ? 'bg-blue-500/20' : 'bg-emerald-500/20'} blur-[40px] rounded-full animate-pulse`} />
                <div className={`relative w-24 h-24 rounded-full bg-black border ${foundAsPetitioner ? 'border-blue-500/30' : 'border-emerald-500/30'} flex items-center justify-center shadow-2xl`}>
                    {foundAsPetitioner ? (
                        <Search size={48} className="text-blue-500" />
                    ) : (
                        <ShieldCheck size={48} className="text-emerald-500" />
                    )}
                </div>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className={`absolute -inset-2 border border-dashed ${foundAsPetitioner ? 'border-blue-500/20' : 'border-emerald-500/20'} rounded-full`}
                />
            </motion.div>

            <motion.div variants={itemVariants} className="max-w-md relative z-10">
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">
                    {foundAsPetitioner ? "Entity Profile Swap" : "Verified Clean Record"}
                </h2>
                <p className={`${foundAsPetitioner ? 'text-blue-500' : 'text-emerald-500'} text-[10px] font-black uppercase tracking-[0.4em] mb-6 flex items-center justify-center gap-2`}>
                    <span className={`w-1.5 h-1.5 ${foundAsPetitioner ? 'bg-blue-500' : 'bg-emerald-500'} rounded-full animate-ping`} />
                    {foundAsPetitioner ? "Cross-Reference Alert" : "Intelligence Scan Complete"}
                </p>

                <p className="text-slate-400 text-[11px] leading-relaxed mb-8 uppercase tracking-widest font-medium">
                    {foundAsPetitioner ? (
                        <>
                            Neural indexing indicates <span className="text-white">{respondentName}</span> is identified as a <br />
                            <span className="text-blue-400">Petitioner</span> in our judicial stream.
                        </>
                    ) : (
                        <>
                            Our neural analysis engine has indexed the judicial databases and found <br />
                            <span className="text-white">ZERO litigation pressure</span> patterns
                            against <span className="text-white">{respondentName}</span>.
                        </>
                    )}
                </p>

                {foundAsPetitioner ? (
                    <motion.button
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onInvestigate(respondentName)}
                        className="px-8 py-4 bg-blue-600/10 border border-blue-500/30 rounded-xl text-blue-500 text-[11px] font-black uppercase tracking-[0.2em] mb-8 hover:text-white transition-all flex items-center gap-2 mx-auto"
                    >
                        Switch to Petitioner Investigation
                        <span>→</span>
                    </motion.button>
                ) : null}

                <div className="grid grid-cols-2 gap-4 text-left">
                    {[
                        { label: "Vexatiousness", value: "NEGATED", icon: Shield },
                        { label: "Abuse Pattern", value: "NOT DETECTED", icon: Search },
                        { label: "Judicial Flags", value: "ZERO RECORDS", icon: CheckCircle2 },
                        { label: "Data Integrity", value: "VERIFIED", icon: Cpu }
                    ].map((marker, i) => (
                        <div key={i} className="bg-white/[0.02] border border-white/5 p-3 rounded group hover:border-emerald-500/20 transition-all">
                            <div className="flex items-center gap-2 mb-1">
                                <marker.icon size={12} className="text-emerald-500/50 group-hover:text-emerald-500 transition-colors" />
                                <span className="text-[8px] text-dim uppercase tracking-widest">{marker.label}</span>
                            </div>
                            <p className="text-[10px] font-black text-white uppercase tracking-tight">{marker.value}</p>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Scanning Effect Overlay */}
            <div className="scan-line select-none opacity-30" />
        </motion.div>
    );
};

export default CleanHistoryState;
