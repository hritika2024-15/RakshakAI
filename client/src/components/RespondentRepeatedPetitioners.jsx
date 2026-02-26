import { motion } from 'framer-motion';
import { AlertTriangle, Search } from 'lucide-react';

const RespondentRepeatedPetitioners = ({ petitioners, onInvestigate, isInvestigating }) => {
    if (!petitioners || petitioners.length === 0) return null;

    return (
        <div className="card-panel p-4 mb-4">
            <h3 className="text-[10px] uppercase tracking-wider text-dim font-bold mb-4">Repeated Petitioner Analysis</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px]">
                    <thead className="text-dim border-b border-[#1e1e1e] uppercase tracking-wider">
                        <tr>
                            <th className="pb-2 font-bold">Petitioner Name</th>
                            <th className="pb-2 font-bold text-center">Cases Against</th>
                            <th className="pb-2 font-bold text-center">% of Total</th>
                            <th className="pb-2 font-bold">Filing Pattern</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1a1a1a]">
                        {petitioners.map((p, idx) => (
                            <tr key={idx} className="hover:bg-[#161616] transition-colors group">
                                <td className="py-3 text-white font-medium flex items-center gap-2">
                                    {p.name}
                                    {p.count >= 10 && (
                                        <div className="flex items-center text-red-500 gap-1 text-[9px] font-black uppercase tracking-tighter animate-pulse">
                                            <AlertTriangle size={10} />
                                            Significant Volume
                                        </div>
                                    )}
                                </td>
                                <td className="py-3 text-white font-mono text-center">{p.count}</td>
                                <td className="py-3 text-white font-mono text-center">{p.percentage}%</td>
                                <td className="py-3">
                                    <div className="flex items-center justify-between">
                                        <span className={`text-[9px] uppercase tracking-wider ${p.count > 5 ? 'text-red-400' : (p.count > 1 ? 'text-dim' : 'text-slate-600')}`}>
                                            {p.count > 5 ? "Volume Cluster Detected" : (p.count > 1 ? "Consistent Activity" : "Initial Engagement")}
                                        </span>
                                        <button
                                            onClick={() => onInvestigate(p.name)}
                                            disabled={isInvestigating}
                                            className="flex items-center gap-1.5 px-2 py-1 bg-red-600/10 border border-red-500/20 rounded text-[9px] font-bold text-red-500 hover:bg-red-600 hover:text-white transition-all uppercase tracking-tighter"
                                        >
                                            <Search size={10} />
                                            Investigate
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RespondentRepeatedPetitioners;
