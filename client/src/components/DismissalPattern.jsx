import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';

const DismissalPattern = ({ data }) => {
    if (!data || data.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card-panel p-4 h-[220px] relative overflow-hidden group"
        >
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-dim font-black flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-soft" />
                    Outcome Distribution
                </h3>
                <div className="flex items-center gap-1 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                    <span className="text-[9px] text-red-500 font-black tracking-tighter">78% DISMISSAL</span>
                </div>
            </div>

            <div className="h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                        <CartesianGrid vertical={false} stroke="#1e1e1e" strokeDasharray="3 3" />
                        <XAxis
                            dataKey="year"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#737373', fontSize: 10, fontWeight: 'bold' }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#737373', fontSize: 10 }}
                        />
                        <Tooltip
                            cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                            contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #1e1e1e', borderRadius: '4px', fontSize: '10px' }}
                        />
                        <Bar
                            dataKey="Dismissed"
                            stackId="a"
                            fill="#ef4444"
                            animationBegin={0}
                            animationDuration={1500}
                        />
                        <Bar
                            dataKey="Pending"
                            stackId="a"
                            fill="#fbbf24"
                            animationBegin={200}
                            animationDuration={1500}
                        />
                        <Bar
                            dataKey="Allowed"
                            stackId="a"
                            fill="#10b981"
                            radius={[4, 4, 0, 0]}
                            animationBegin={400}
                            animationDuration={1500}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default DismissalPattern;
