import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const DefenseStrategy = () => {
    return (
        <div className="card-panel p-4 h-[220px] flex flex-col justify-between">
            <div>
                <h3 className="text-[10px] uppercase tracking-wider text-dim font-bold mb-4">Defense Strategy</h3>
                <p className="text-[10px] text-dim leading-relaxed">
                    Generate a draft application under CPC Section 35 documenting the pattern of abuse of process, including case count, dismissal rate, timeline summary, and risk score.
                </p>
            </div>

            <motion.button
                whileHover={{ scale: 1.02, backgroundColor: '#1e1e1e' }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-[#1a1a1a] border border-[#262626] rounded text-[10px] uppercase tracking-widest text-[#737373] font-bold flex items-center justify-center gap-2"
            >
                <FileText size={14} />
                Generate Abuse of Process Draft
            </motion.button>
        </div>
    );
};

export default DefenseStrategy;
