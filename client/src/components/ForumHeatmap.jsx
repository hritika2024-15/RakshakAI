import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import { Target } from 'lucide-react';

const ForumHeatmap = ({ cases = [] }) => {
    const stateData = useMemo(() => {
        const counts = {};
        cases.forEach(c => {
            const state = courtToState[c.courtName] || "Unknown";
            if (state !== "Unknown") {
                counts[state] = (counts[state] || 0) + 1;
            }
        });
        return counts;
    }, [cases]);

    const colorScale = scaleQuantile()
        .domain(Object.values(stateData).length > 0 ? Object.values(stateData) : [0, 1])
        .range([
            "#0a0a0a", // Empty state
            "#450a0a", // Trace
            "#7f1d1d", // Low
            "#991b1b", // Medium
            "#b91c1c", // High
            "#ef4444", // Extreme
        ]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="card-panel p-4 h-[220px] flex flex-col relative overflow-hidden group"
        >
            <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-20 transition-opacity">
                <Target size={20} className="text-red-500" />
            </div>
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-dim font-black mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse-soft" />
                Strategic Jurisdiction Analysis
            </h3>

            <div className="flex-1 w-full flex items-center justify-center overflow-hidden grayscale-[0.2] hover:grayscale-0 transition-all duration-500">
                <ComposableMap
                    projection="geoMercator"
                    projectionConfig={{
                        scale: 450,
                        center: [82, 22]
                    }}
                    style={{ width: "100%", height: "100%" }}
                >
                    <Geographies geography={INDIA_TOPO_JSON}>
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                const stateName = geo.properties.ST_NM;
                                const count = stateData[stateName] || 0;
                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill={count > 0 ? colorScale(count) : "#121212"}
                                        stroke="rgba(255,255,255,0.05)"
                                        strokeWidth={0.5}
                                        style={{
                                            default: { outline: "none", transition: "all 250ms" },
                                            hover: { fill: "#f43f5e", outline: "none", strokeWidth: 1, stroke: "white" },
                                            pressed: { outline: "none" }
                                        }}
                                    />
                                );
                            })
                        }
                    </Geographies>
                </ComposableMap>
            </div>

            <div className="mt-1 flex justify-between items-center text-[8px] text-dim font-black tracking-widest uppercase px-2">
                <span>Low Intensity</span>
                <div className="flex gap-1 h-1.5">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="w-3 rounded-full" style={{ backgroundColor: colorScale.range()[i] }} />
                    ))}
                </div>
                <span>High Intensity</span>
            </div>
        </motion.div>
    );
};

export default ForumHeatmap;
