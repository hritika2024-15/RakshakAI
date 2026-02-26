import React from 'react';
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    ZAxis,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';
import { motion } from 'framer-motion';

const FilingTimeline = ({ data, mainPetitioner }) => {
    if (!data || data.length === 0) return null;

    // Transform data for the scatter plot
    const plotData = data.map(c => {
        const date = new Date(c.filingDate);
        return {
            x: date.getTime(),
            y: c.petitioner === mainPetitioner ? 1 : 0,
            name: c.petitioner,
            date: c.filingDate,
            status: c.status,
            cnr: c.cnrNumber
        };
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'Dismissed': return '#ef4444';
            case 'Pending': return '#fbbf24';
            case 'Allowed': return '#10b981';
            default: return '#737373';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-panel p-4 mb-4 relative overflow-hidden"
        >
            <div className="flex justify-between items-center mb-6 relative z-10">
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-dim font-black flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse-soft" />
                    Temporal Filing Dispersion
                </h3>
                <div className="flex gap-4">
                    {['Dismissed', 'Pending', 'Allowed'].map((status) => (
                        <div key={status} className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: getStatusColor(status) }} />
                            <span className="text-[9px] text-dim uppercase tracking-wider font-bold">{status}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="h-[120px] w-full relative">
                {/* Horizontal Guide Lines with Animation */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute top-[30px] left-0 h-[1px] bg-white/5 border-dashed border-b border-white/10"
                />
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="absolute top-[90px] left-0 h-[1px] bg-white/5 border-dashed border-b border-white/10"
                />

                {/* Labels */}
                <div className="absolute top-[25px] left-[-60px] text-[9px] text-dim font-black uppercase tracking-tight w-max opacity-60">
                    {mainPetitioner ? `${mainPetitioner.split(' ')[0]}...` : 'Primary'}
                </div>
                <div className="absolute top-[85px] left-[-60px] text-[9px] text-dim font-black uppercase tracking-tight w-max opacity-60">
                    Others
                </div>

                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 10, right: 30, bottom: 0, left: 60 }}>
                        <XAxis
                            type="number"
                            dataKey="x"
                            domain={['auto', 'auto']}
                            hide
                        />
                        <YAxis
                            type="number"
                            dataKey="y"
                            domain={[-0.5, 1.5]}
                            hide
                        />
                        <ZAxis type="number" range={[60, 60]} />
                        <Tooltip
                            cursor={{ strokeDasharray: '3 3', stroke: 'rgba(255,255,255,0.1)' }}
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const d = payload[0].payload;
                                    return (
                                        <div className="bg-[#0a0a0a] border border-[#1e1e1e] p-3 rounded shadow-2xl backdrop-blur-md">
                                            <p className="text-[10px] font-black text-white uppercase tracking-tight mb-1">{d.name}</p>
                                            <p className="text-[9px] text-dim font-mono mb-1">{d.date} • {d.status}</p>
                                            <p className="text-[9px] text-blue-500 font-bold">{d.cnr}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Scatter
                            data={plotData}
                            shape="circle"
                            animationBegin={1000}
                            animationDuration={1500}
                        >
                            {plotData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={getStatusColor(entry.status)} style={{ filter: `drop-shadow(0 0 3px ${getStatusColor(entry.status)}80)` }} />
                            ))}
                        </Scatter>
                    </ScatterChart>
                </ResponsiveContainer>

                {/* Timeline Axis Labels */}
                <div className="flex justify-between mt-2 px-[60px] text-[8px] text-dim font-black uppercase tracking-[0.2em] opacity-40">
                    <span>JAN 2021</span>
                    <span>Q2 2022</span>
                    <span>Q4 2023</span>
                    <span>PRESENT</span>
                </div>
            </div>
        </motion.div>
    );
};

export default FilingTimeline;
