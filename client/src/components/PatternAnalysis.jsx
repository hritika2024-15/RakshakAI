import React from 'react';
import { motion } from 'framer-motion';

const PatternAnalysis = ({ summary }) => {
    if (!summary) return null;

    // Split summary into points if it's long, otherwise show as block
    const points = summary.split('. ').filter(p => p.trim());

    return (
        <div className="card-panel p-4 h-[220px] overflow-y-auto">
            <h3 className="text-[10px] uppercase tracking-wider text-dim font-bold mb-4">Pattern Analysis</h3>

            <div className="space-y-3">
                {points.map((point, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-2"
                    >
                        <span className="text-[10px] font-bold text-[#3b82f6] shrink-0">0{index + 1}</span>
                        <p className="text-[11px] text-white leading-relaxed">
                            {point}{point.endsWith('.') ? '' : '.'}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PatternAnalysis;
