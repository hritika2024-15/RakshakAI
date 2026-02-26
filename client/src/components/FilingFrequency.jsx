import React from 'react';
import {
    ComposedChart,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';
import { BarChart2 as BarIcon } from 'lucide-react';

const FilingFrequency = ({ data }) => {
    if (!data || data.length === 0) return null;

    // Transform data for frequency logic
    const chartData = data.map(d => ({
        ...d,
        total: (d.Dismissed || 0) + (d.Ongoing || 0) + (d.Allowed || 0),
        trend: ((d.Dismissed || 0) + (d.Ongoing || 0) + (d.Allowed || 0)) * 1.5 // Mock trend line
    }));

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="card-panel p-4 h-[220px] relative overflow-hidden group"
        >
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity">
                <BarIcon size={16} className="text-red-500" />
            </div>
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-dim font-black mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse-soft" />
                Filing Intensity
            </h3>

            <div className="h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                        <CartesianGrid vertical={false} stroke="#1e1e1e" strokeDasharray="3 3" />
                        <XAxis
                            dataKey="year"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#737373', fontSize: 10, fontWeight: 'bold' }}
                        />
                        <YAxis
                            hide
                        />
                        <Tooltip
                            cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                            contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #1e1e1e', borderRadius: '4px', fontSize: '10px' }}
                        />
                        <Bar
                            dataKey="total"
                            fill="#334155"
                            radius={[4, 4, 0, 0]}
                            barSize={30}
                            animationBegin={0}
                            animationDuration={1500}
                        />
                        <Area
                            type="monotone"
                            dataKey="trend"
                            stroke="#ef4444"
                            fill="url(#trendGradient)"
                            strokeWidth={3}
                            dot={false}
                            animationBegin={500}
                            animationDuration={2000}
                        />
                        <defs>
                            <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default FilingFrequency;
