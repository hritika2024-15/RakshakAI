import React from 'react';
import { Search, Gavel } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = ({ onSearch, isLoading, onBack, showBack }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  const handleBack = () => {
    setSearchTerm('');
    onBack();
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-6 py-4 flex items-center justify-between"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center shadow-lg shadow-red-900/20">
          <Gavel className="text-white w-6 h-6" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold tracking-tighter text-white">
            RAKSHAK <span className="text-red-500">AI</span>
          </h1>
          <div className="flex items-center gap-2">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-medium">
              Intelligence // Command Center
            </p>
            <span className="text-[10px] text-slate-700">|</span>
            {showBack ? (
              <button
                onClick={handleBack}
                className="text-[10px] uppercase tracking-[0.2em] text-red-500 hover:text-red-400 transition-colors font-bold flex items-center gap-1"
              >
                <motion.span initial={{ x: 0 }} animate={{ x: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 2 }}>←</motion.span>
                Back to Command Center
              </button>
            ) : (
              <a href="/" className="text-[10px] uppercase tracking-[0.2em] text-dim hover:text-white transition-colors">Home</a>
            )}
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative flex-1 max-w-2xl mx-12 group"
      >
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-500 group-focus-within:text-red-500 transition-colors" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter Respondent Name (e.g., SafeStreet Infra Ltd) to analyze litigation pressure..."
          className="block w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all backdrop-blur-sm"
        />
        {isLoading && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            <div className="w-5 h-5 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin"></div>
          </div>
        )}
      </form>

      <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
        <div className="flex flex-col items-end">
          <span className="text-slate-600 uppercase">System Status</span>
          <span className="text-emerald-500">● Operational</span>
        </div>
        <div className="w-[1px] h-8 bg-slate-800 mx-2" />
        <div className="flex flex-col items-end">
          <span className="text-slate-600 uppercase">Secure Link</span>
          <span>v2.4.0_STABLE</span>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
