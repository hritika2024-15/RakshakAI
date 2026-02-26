import React, { useState } from 'react';
import { Search } from 'lucide-react';

const AuditTrailTable = ({ cases }) => {
    const [activeTab, setActiveTab] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    if (!cases || cases.length === 0) return null;

    const filteredCases = cases.filter(c => {
        const matchesTab = activeTab === 'All' || c.status === activeTab;
        const matchesSearch =
            c.cnrNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.petitioner.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.courtName.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Dismissed': return 'text-red-500';
            case 'Pending': return 'text-yellow-500';
            case 'Allowed': return 'text-emerald-500';
            default: return 'text-slate-400';
        }
    };

    return (
        <div className="card-panel mt-6">
            <div className="p-4 border-b border-[#1e1e1e] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h3 className="text-[10px] uppercase tracking-wider text-dim font-bold">Case Records</h3>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 text-dim" size={12} />
                        <input
                            type="text"
                            placeholder="Search case no., petitioner, court, remarks..."
                            className="bg-[#1a1a1a] border border-[#262626] rounded pl-8 pr-3 py-1.5 text-[10px] text-white w-[300px] focus:outline-none focus:border-[#404040]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex bg-[#1a1a1a] p-0.5 rounded border border-[#262626]">
                        {['All', 'Dismissed', 'Pending', 'Allowed'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-3 py-1 text-[10px] rounded transition-all ${activeTab === tab ? 'bg-[#262626] text-white font-bold' : 'text-dim hover:text-white'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <span className="text-[10px] text-dim">{filteredCases.length} of {cases.length} records</span>
                </div>
            </div>

            <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                <table className="w-full text-left text-[10px]">
                    <thead className="sticky top-0 bg-[#121212] text-dim border-b border-[#1e1e1e] uppercase tracking-wider">
                        <tr>
                            <th className="px-4 py-3 font-bold">Case No.</th>
                            <th className="px-4 py-3 font-bold">Petitioner</th>
                            <th className="px-4 py-3 font-bold">Court</th>
                            <th className="px-4 py-3 font-bold">Filing Date ↓</th>
                            <th className="px-4 py-3 font-bold">Outcome</th>
                            <th className="px-4 py-3 font-bold">Costs (₹)</th>
                            <th className="px-4 py-3 font-bold">Remarks</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1a1a1a]">
                        {filteredCases.map((c, idx) => (
                            <tr key={idx} className="hover:bg-[#161616] transition-colors group">
                                <td className="px-4 py-3 text-white font-medium">{c.cnrNumber}</td>
                                <td className="px-4 py-3 text-white">{c.petitioner}</td>
                                <td className="px-4 py-3 text-dim">{c.courtName}</td>
                                <td className="px-4 py-3 text-dim">{c.filingDate}</td>
                                <td className={`px-4 py-3 font-bold ${getStatusStyle(c.status)}`}>{c.status}</td>
                                <td className="px-4 py-3 text-dim">{c.costs}</td>
                                <td className="px-4 py-3 text-dim max-w-[200px] truncate group-hover:whitespace-normal group-hover:max-w-none transition-all">
                                    {c.remarks}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AuditTrailTable;
