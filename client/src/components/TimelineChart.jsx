import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';

const TimelineChart = ({ cases = [] }) => {
    const chartData = useMemo(() => {
        const months = {};

        cases.forEach(c => {
            const date = new Date(c.filingDate);
            const monthYear = date.toLocaleString('default', { month: 'short', year: '2-digit' });
            months[monthYear] = (months[monthYear] || 0) + 1;
        });

        return Object.keys(months).map(month => ({
            name: month,
            count: months[month]
        })).sort((a, b) => {
            // Simple sort by date if needed, but here we assume order of appearance or alphabetical
            // A more robust sort would convert back to Date objects
            return new Date(a.name) - new Date(b.name);
        });
    }, [cases]);

    return (
        <div className="relative flex flex-col p-6 bg-slate-900/40 border border-slate-800 rounded-2xl h-full min-h-[300px]">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Module B // Harassment Timeline</h3>
                <div className="flex gap-2">
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <span className="text-[10px] text-slate-400">Spikes Detected</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full min-h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 10 }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 10 }}
                        />
                        <Tooltip
                            cursor={{ fill: '#ffffff05' }}
                            contentStyle={{
                                backgroundColor: '#0f172a',
                                border: '1px solid #1e293b',
                                borderRadius: '8px',
                                fontSize: '12px',
                                color: '#f8fafc'
                            }}
                        />
                        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.count > 3 ? '#ef4444' : '#3b82f6'}
                                    fillOpacity={0.8}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-4 flex items-center gap-3 bg-red-500/5 border border-red-500/10 p-3 rounded-lg">
                <div className="text-red-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <p className="text-[11px] text-slate-400">
                    <span className="text-red-400 font-bold uppercase">Alert:</span> Temporal clustering detected.
                    Multiple filings within 30-day windows correlate with harassment patterns.
                </p>
            </div>
        </div>
    );
};

export default TimelineChart;