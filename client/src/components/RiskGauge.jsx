import React from 'react';
import { motion } from 'framer-motion';

const RiskGauge = ({ score, level }) => {
    // Map score to needle rotation (-90 to 90 degrees)
    const rotation = (score / 100) * 180 - 90;

    const getColor = (s) => {
        if (s > 75) return '#ef4444'; // Red
        if (s > 45) return '#fbbf24'; // Amber
        return '#10b981'; // Green
    };

    const currentColor = getColor(score);

    const evidence = [
        { label: '>3 cases in 2 years', value: '+20', highlighted: score > 30 },
        { label: 'Dismissal rate >70%', value: '+20', highlighted: score > 70 },
        { label: 'Average interval <6 months', value: '+15', highlighted: score > 50 },
        { label: 'Judicial flags detected', value: '+15', highlighted: score > 60 },
        { label: 'Single petitioner >60%', value: '+15', highlighted: score > 40 },
    ];

    return (
        <div className="card-panel p-4 h-full min-h-[220px] relative overflow-hidden group">
            <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-[60px] opacity-10 transition-colors duration-1000`}
                style={{ backgroundColor: currentColor }} />

            <h3 className="text-[10px] uppercase tracking-[0.2em] text-dim font-black mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: currentColor }} />
                Litigation Pressure Index
            </h3>

            <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Gauge Section */}
                <div className="relative flex flex-col items-center">
                    <div className="relative w-[140px] h-[75px] flex justify-center items-end overflow-hidden">
                        {/* Background Arc */}
                        <svg className="absolute w-[140px] h-[140px] -bottom-[70px]">
                            <circle
                                cx="70"
                                cy="70"
                                r="60"
                                fill="none"
                                stroke="#1e1e1e"
                                strokeWidth="8"
                                strokeDasharray="188.5"
                                strokeDashoffset="0"
                                transform="rotate(180 70 70)"
                            />
                            {/* Value Arc */}
                            <motion.circle
                                cx="70"
                                cy="70"
                                r="60"
                                fill="none"
                                stroke={currentColor}
                                strokeWidth="8"
                                strokeDasharray="188.5"
                                initial={{ strokeDashoffset: 188.5 }}
                                animate={{ strokeDashoffset: 188.5 - (score / 100) * 188.5 }}
                                transition={{ duration: 2, ease: "circOut" }}
                                transform="rotate(180 70 70)"
                                style={{ filter: `drop-shadow(0 0 5px ${currentColor}40)` }}
                            />
                        </svg>

                        {/* Needle */}
                        <motion.div
                            initial={{ rotate: -90 }}
                            animate={{ rotate: rotation }}
                            transition={{ duration: 2, ease: "circOut" }}
                            className="absolute bottom-0 w-1 h-[60px] origin-bottom z-30"
                        >
                            <div className="w-full h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                        </motion.div>

                        {/* Center Hub */}
                        <div className="absolute bottom-[-10px] w-5 h-5 bg-[#0a0a0a] border-2 border-white rounded-full z-40" />

                        <div className="z-20 text-center mb-1">
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-3xl font-black text-white leading-none block"
                            >
                                {score}
                            </motion.span>
                        </div>
                    </div>
                    <motion.span
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="text-[10px] font-black mt-3 uppercase tracking-[0.2em]"
                        style={{ color: currentColor }}
                    >
                        {level} RISK LEVEL
                    </motion.span>
                </div>

                {/* Evidence Breakdown */}
                <div className="flex-1 w-full space-y-1.5 self-center">
                    {evidence.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + idx * 0.1 }}
                            className="flex justify-between items-center pb-1 border-b border-white/5"
                        >
                            <span className={`text-[9px] font-medium tracking-tight ${item.highlighted ? 'text-slate-300' : 'text-[#404040]'}`}>
                                {item.label}
                            </span>
                            <span className={`text-[9px] font-black font-mono ${item.highlighted ? '' : 'text-[#404040]'}`} style={{ color: item.highlighted ? currentColor : '#404040' }}>
                                {item.value}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RiskGauge;
