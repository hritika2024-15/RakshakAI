import React, { useMemo, useRef, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { motion } from 'framer-motion';

const CollusionGraph = ({ petitionerName, cases = [] }) => {
    const containerRef = useRef();
    const fgRef = useRef();

    useEffect(() => {
        if (fgRef.current) {
            // Add custom forces or initial zoom
            fgRef.current.d3Force('charge').strength(-150);
            fgRef.current.zoom(2, 1000);
        }
    }, []);

    const graphData = useMemo(() => {
        const nodes = [{ id: petitionerName, group: 1, val: 20 }];
        const links = [];
        const advocates = {};

        cases.forEach(c => {
            const adv = c.advocateName || 'Unknown Advocate';
            advocates[adv] = (advocates[adv] || 0) + 1;
        });

        Object.entries(advocates).forEach(([name, count]) => {
            nodes.push({ id: name, group: 2, val: 10 + count * 2 });
            links.push({
                source: petitionerName,
                target: name,
                value: count
            });
        });

        return { nodes, links };
    }, [petitionerName, cases]);

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative flex flex-col p-6 bg-[#0c0c0c]/95 border border-white/5 rounded-2xl h-full min-h-[400px] overflow-hidden backdrop-blur-xl shadow-2xl"
        >
            <div className="absolute top-4 left-6 z-10">
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-red-500 font-black flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                    Neural Collusion Network
                </h3>
            </div>

            <div className="flex-1 w-full mt-8 border border-white/5 rounded-xl bg-black/50 overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent pointer-events-none" />
                <ForceGraph2D
                    ref={fgRef}
                    graphData={graphData}
                    nodeLabel="id"
                    nodeColor={n => n.group === 1 ? '#ef4444' : '#3b82f6'}
                    nodeRelSize={6}
                    linkWidth={l => l.value * 2}
                    linkColor={() => 'rgba(255,255,255,0.05)'}
                    backgroundColor="transparent"
                    height={300}
                    width={containerRef.current ? containerRef.current.clientWidth - 48 : 500}
                    cooldownTicks={100}
                    onEngineStop={() => {
                        if (fgRef.current) fgRef.current.zoomToFit(400, 50);
                    }}
                />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-6 relative z-10">
                <div className="flex items-start gap-3 p-3 bg-white/[0.02] rounded-lg border border-white/5 hover:bg-white/[0.04] transition-colors group">
                    <div className="w-2 h-2 mt-1 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                    <div className="flex flex-col">
                        <span className="text-[9px] text-dim uppercase tracking-[0.1em] font-black group-hover:text-red-500/50 transition-colors">Target Specimen</span>
                        <span className="text-xs text-white font-bold truncate max-w-[150px]">{petitionerName}</span>
                    </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white/[0.02] rounded-lg border border-white/5 hover:bg-white/[0.04] transition-colors group">
                    <div className="w-2 h-2 mt-1 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                    <div className="flex flex-col">
                        <span className="text-[9px] text-dim uppercase tracking-[0.1em] font-black group-hover:text-blue-500/50 transition-colors">Legal Nodes</span>
                        <span className="text-xs text-white font-bold">{graphData.links.length} Connected Entities</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CollusionGraph;
