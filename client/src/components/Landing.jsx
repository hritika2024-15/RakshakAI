import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, Zap, Search, ChevronRight, Gavel, BarChart3, Database, Activity, Cpu, Lock, Globe } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay, meta }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className="card-panel p-8 bg-black/40 backdrop-blur-xl border border-white/5 hover:border-red-500/40 transition-all group relative overflow-hidden"
    >
        <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
            <Icon size={80} />
        </div>
        <div className="w-12 h-12 bg-red-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-600/20 transition-colors border border-red-500/10">
            <Icon className="text-red-500 w-6 h-6" />
        </div>
        <div className="text-[10px] font-mono text-red-500/50 uppercase tracking-[0.2em] mb-2">{meta}</div>
        <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tight">{title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed font-medium">{description}</p>

        <div className="mt-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[9px] font-mono text-dim uppercase tracking-widest">System Ready</span>
        </div>
    </motion.div>
);

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-red-500/30 overflow-x-hidden font-sans">
            {/* Technical Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#ef444405,transparent_80%)]" />
                <div
                    className="absolute inset-0 opacity-[0.1]"
                    style={{
                        backgroundImage: `linear-gradient(#ffffff05 1px, transparent 1px), linear-gradient(90deg, #ffffff05 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />
                <motion.div
                    animate={{ y: [0, 1000] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none bg-gradient-to-b from-transparent via-red-500 to-transparent h-px shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                />
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 px-10 py-6 backdrop-blur-xl border-b border-white/5 bg-[#050505]/40">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4 group cursor-default"
                    >
                        <div className="w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/20 group-hover:scale-110 transition-transform">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-black tracking-tighter leading-none">RAKSHAK <span className="text-red-500">AI</span></span>
                            <span className="text-[7px] font-mono text-dim uppercase tracking-[0.5em] mt-1 opacity-70">Strategic Dossier Index</span>
                        </div>
                    </motion.div>

                    <div className="flex items-center gap-10">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="px-5 py-2 bg-red-600/10 border border-red-500/20 rounded-lg text-[9px] font-black uppercase tracking-widest text-red-500 hover:bg-red-600 hover:text-white transition-all"
                        >
                            Launch Core
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-44 pb-32 px-10 overflow-hidden z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-red-500/10 bg-red-500/5 text-[9px] uppercase tracking-[0.4em] text-red-500/80 font-black mb-12"
                    >
                        <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                        Command Core v4.28 // Operational
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 1 }}
                        className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] mb-12 uppercase"
                    >
                        Mitigate <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-900">Legal Friction</span> <br />
                        With Pattern Intelligence
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-base md:text-lg text-slate-400/80 max-w-2xl mx-auto mb-16 leading-relaxed font-medium"
                    >
                        Next-gen litigation intelligence for strategic risk reduction. Leverage advanced pattern detection to identify vexatious litigation and predatory filing behaviors across millions of records.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-5 justify-center items-center"
                    >
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="group px-10 py-5 bg-red-600 hover:bg-red-700 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:translate-y-[-2px] flex items-center gap-3 shadow-2xl shadow-red-950/40"
                        >
                            Intelligence Hub
                            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="px-10 py-5 border border-white/5 hover:bg-white/5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all backdrop-blur-sm text-slate-400 hover:text-white">
                            Tech Specs
                        </button>
                    </motion.div>

                    {/* Visual Anchor - High Fidelity Pattern Scanner */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 1.2 }}
                        className="mt-24 relative"
                    >
                        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent z-20" />
                        <div className="relative z-10 card-panel p-1 bg-white/5 border border-white/10 rounded-[2.5rem] mx-auto max-w-4xl shadow-2xl shadow-red-950/20">
                            <div className="rounded-[2.2rem] overflow-hidden aspect-[21/8] bg-[#050505] border border-white/5 relative group">
                                {/* Technical Grid Overlay */}
                                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                                {/* Scanner System */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    {/* Left Side Telemetry: Command Audit */}
                                    <div className="absolute left-10 top-1/2 -translate-y-1/2 w-48 text-left space-y-6 hidden lg:block border-l border-white/5 pl-4 py-4">
                                        <div className="space-y-1">
                                            <div className="text-[7px] font-mono text-dim uppercase tracking-widest opacity-40">Command_Audit</div>
                                            <div className="h-0.5 w-12 bg-red-600/20" />
                                        </div>
                                        <div className="space-y-3">
                                            {[
                                                { label: "INDEX_INIT", val: "0.2s", color: "text-red-500" },
                                                { label: "SYNC_NODE", val: "STABLE", color: "text-slate-400" },
                                                { label: "ENCRYPT", val: "ACTIVE", color: "text-slate-400" }
                                            ].map((log, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: -5 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 1 + i * 0.2 }}
                                                    className="flex flex-col gap-0.5"
                                                >
                                                    <span className="text-[6px] font-mono text-dim/60 uppercase">{log.label}</span>
                                                    <span className={`text-[8px] font-mono ${log.color} font-bold tracking-widest`}>{log.val}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Right Side Telemetry: Intelligence Metrics */}
                                    <div className="absolute right-10 top-1/2 -translate-y-1/2 w-48 text-right space-y-6 hidden lg:block border-r border-white/5 pr-4 py-4">
                                        <div className="space-y-1">
                                            <div className="text-[7px] font-mono text-dim uppercase tracking-widest opacity-40">System_Health</div>
                                            <div className="h-0.5 w-12 bg-red-600/20 ml-auto" />
                                        </div>
                                        <div className="space-y-3">
                                            {[
                                                { label: "CORE_LOAD", val: "24%", bar: 24 },
                                                { label: "THROUGHPUT", val: "4.2TB/s", bar: 80 },
                                                { label: "SIGNAL_STRENGTH", val: "OPTIMAL", bar: 100 }
                                            ].map((stat, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: 5 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 1.2 + i * 0.2 }}
                                                    className="flex flex-col gap-1 items-end"
                                                >
                                                    <div className="flex justify-between w-full">
                                                        <span className="text-[6px] font-mono text-dim/60 uppercase">__{stat.label}</span>
                                                        <span className="text-[8px] font-mono text-slate-400 font-bold">{stat.val}</span>
                                                    </div>
                                                    <div className="w-16 h-0.5 bg-white/5 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${stat.bar}%` }}
                                                            transition={{ duration: 1, delay: 1.5 + i * 0.2 }}
                                                            className="h-full bg-red-600/40"
                                                        />
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Rotating Outer Ring */}
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                        className="absolute w-[450px] h-[450px] border border-red-500/10 rounded-full border-dashed"
                                    />
                                    {/* Inner Pulse Ring */}
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                                        transition={{ duration: 4, repeat: Infinity }}
                                        className="absolute w-64 h-64 border border-red-500/20 rounded-full bg-red-500/5 backdrop-blur-3xl"
                                    />

                                    {/* Data Particles - Core Focus */}
                                    <div className="absolute inset-0">
                                        {[...Array(6)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                animate={{
                                                    x: [0, (i % 2 === 0 ? 100 : -100) * Math.cos(i)],
                                                    y: [0, (i % 2 === 0 ? 100 : -100) * Math.sin(i)],
                                                    opacity: [0, 0.5, 0],
                                                    scale: [0, 1, 0]
                                                }}
                                                transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
                                                className="absolute left-1/2 top-1/2 w-1.5 h-1.5 bg-red-500 rounded-full blur-[1px]"
                                            />
                                        ))}
                                    </div>

                                    {/* Core Shield */}
                                    <div className="relative z-10 flex flex-col items-center gap-6">
                                        <div className="relative">
                                            <motion.div
                                                animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                                className="absolute inset-0 bg-red-600/30 rounded-full blur-2xl"
                                            />
                                            <div className="w-16 h-16 rounded-full border border-red-500/40 flex items-center justify-center bg-black/40 backdrop-blur-md relative z-10">
                                                <Shield size={32} className="text-red-500" />
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <span className="text-[10px] font-mono text-dim uppercase tracking-[0.8em] animate-pulse block mb-2">Scanning Judicial Stream</span>
                                            <div className="flex gap-1 justify-center">
                                                {[...Array(3)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        animate={{ opacity: [0, 1, 0] }}
                                                        transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                                                        className="w-1.5 h-0.5 bg-red-500"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* HUD Content - Top Left */}
                                <div className="absolute top-8 left-10 text-left space-y-3 opacity-40 group-hover:opacity-100 transition-opacity">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                        <span className="text-[8px] font-mono text-red-500 tracking-widest">LIVE_SIGNAL_HUB</span>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[7px] font-mono text-dim">LATENCY: 12.4ms</div>
                                        <div className="text-[7px] font-mono text-dim">NODES: 0x4F_ACTIVE</div>
                                        <div className="w-32 h-0.5 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                animate={{ width: ["10%", "90%", "30%", "100%"] }}
                                                transition={{ duration: 6, repeat: Infinity }}
                                                className="h-full bg-red-600"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* HUD Content - Bottom Right */}
                                <div className="absolute bottom-8 right-10 text-right opacity-30 group-hover:opacity-100 transition-opacity">
                                    <div className="text-[7px] font-mono text-dim tracking-widest leading-relaxed">
                                        X_COORD: 45.2 <br />
                                        Y_COORD: 92.8 <br />
                                        Z_COORD: 18.4
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="px-8 py-32 bg-[#050505] relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col items-center mb-20 text-center">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-red-500 mb-6">Core Telemetry</h2>
                        <h3 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">Intelligence <span className="text-dim">Subsystems</span></h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={BarChart3}
                            meta="Pattern Analysis"
                            title="Litigation Pressure"
                            description="Multi-weighted algorithms analyzing filing density and disposal outcomes to quantify strategic pressure nodes."
                            delay={0.1}
                        />
                        <FeatureCard
                            icon={Zap}
                            meta="Burst Analytics"
                            title="Temporal Clusters"
                            description="AI-driven detection of non-random filing spikes that deviate from standard industrial litigation exposure."
                            delay={0.2}
                        />
                        <FeatureCard
                            icon={Database}
                            meta="Data Integrity"
                            title="Profile Sync"
                            description="Cross-jurisdictional matching to identify extensive filing histories and systematic process abuse across name variations."
                            delay={0.3}
                        />
                    </div>
                </div>
            </section>


            {/* CTA Final */}
            <section className="px-8 py-40 relative z-10 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-600/10 blur-[150px] -z-10" />
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-10 uppercase">Secure Your <span className="text-red-500">Judicial Surface</span></h2>
                    <p className="text-slate-400 text-lg mb-12 font-medium">Join leading industrial enterprises in utilizing proactive litigation intelligence.</p>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="px-12 py-6 bg-white text-black rounded-2xl text-[14px] font-black uppercase tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all hover:scale-105 shadow-2xl"
                    >
                        Access Intelligence Hub
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="px-8 py-16 border-t border-white/5 relative z-10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <Shield className="w-6 h-6 text-red-600" />
                            <span className="text-xl font-black tracking-tighter">RAKSHAK <span className="text-red-500">AI</span></span>
                        </div>
                        <p className="text-[10px] text-dim uppercase tracking-[0.2em] max-w-xs leading-loose">
                            Pattern Recognition Systems // Litigation Telemetry // High-Velocity Case Indexing
                        </p>
                    </div>
                    <div className="flex flex-col md:items-end gap-6 text-[10px] font-mono text-dim uppercase tracking-[0.4em]">
                        <div className="flex gap-8">
                            <a href="#" className="hover:text-red-500 transition-colors">Documentation</a>
                            <a href="#" className="hover:text-red-500 transition-colors">Privacy</a>
                            <a href="#" className="hover:text-red-500 transition-colors">Security</a>
                        </div>
                        <span>&copy; 2026 INTERNAL_INTEL_SYSTEM.8.2</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
