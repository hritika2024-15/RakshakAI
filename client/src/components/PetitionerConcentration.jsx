import React from 'react';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip
} from 'recharts';
import { motion } from 'framer-motion';

const COLORS = ['#ef4444', '#3b82f6', '#64748b', '#475569', '#334155'];

const PetitionerConcentration = ({ data }) => {
    if (!data || data.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card-panel p-4 h-[220px] relative overflow-hidden"
        >
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-dim font-black mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse-soft" />
                Target Concentration
            </h3>

            <div className="flex h-[150px] items-center">
                <ResponsiveContainer width="50%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={35}
                            outerRadius={50}
                            paddingAngle={8}
                            dataKey="count"
                            animationBegin={200}
                            animationDuration={1500}
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #1e1e1e', borderRadius: '4px', fontSize: '10px' }}
                        />
                    </PieChart>
                </ResponsiveContainer>

                <div className="w-[50%] flex flex-col justify-center pl-4 space-y-2">
                    {data.map((entry, index) => (
                        <motion.div
                            key={entry.name}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            className="flex items-center justify-between group cursor-default"
                        >
                            <div className="flex items-center gap-2 overflow-hidden">
                                <div
                                    className="w-1.5 h-1.5 rounded-full shrink-0 group-hover:scale-150 transition-transform"
                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                />
                                <span className="text-[10px] text-slate-300 font-medium truncate max-w-[80px] group-hover:text-white transition-colors">{entry.name}</span>
                            </div>
                            <span className="text-[10px] font-black text-white ml-2">{entry.percentage}%</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default PetitionerConcentration;
