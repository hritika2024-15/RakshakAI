import React from 'react';
import { motion } from 'framer-motion';

const Counter = ({ value, duration = 2 }) => {
    const [displayValue, setDisplayValue] = React.useState(0);

    React.useEffect(() => {
        let start = 0;
        const end = parseInt(String(value).replace(/[^0-9]/g, '')) || 0;
        if (start === end) {
            setDisplayValue(value);
            return;
        }

        let totalMiliseconds = duration * 1000;
        let incrementTime = totalMiliseconds / end;
        if (incrementTime < 10) incrementTime = 10;
        let step = end / (totalMiliseconds / incrementTime);

        let timer = setInterval(() => {
            start += step;
            if (start >= end) {
                clearInterval(timer);
                setDisplayValue(value);
            } else {
                const prefix = String(value).startsWith('₹') ? '₹' : '';
                const suffix = String(value).endsWith('%') ? '%' : '';
                setDisplayValue(`${prefix}${Math.floor(start)}${suffix}`);
            }
        }, incrementTime);

        return () => clearInterval(timer);
    }, [value, duration]);

    return <span>{displayValue}</span>;
};

const StatCard = ({ label, value, subtext, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="card-panel p-4 flex flex-col justify-between min-h-[100px] relative overflow-hidden group"
    >
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-right from-transparent via-red-500/20 to-transparent" />
        <div className="relative z-10">
            <h3 className="text-2xl font-black text-white tracking-tight">
                <Counter value={value} />
            </h3>
            <p className="text-[10px] uppercase tracking-[0.2em] text-dim mt-1 font-bold group-hover:text-red-500/80 transition-colors">{label}</p>
        </div>
        {subtext && (
            <p className="text-[10px] text-dim mt-2 font-mono uppercase tracking-tighter opacity-60">{subtext}</p>
        )}
        <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-red-500/5 rounded-full blur-2xl group-hover:bg-red-500/10 transition-all" />
    </motion.div>
);

const KPICards = ({ stats }) => {
    if (!stats) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4">
            <StatCard
                label="Total Cases Against"
                value={stats.totalCases}
                delay={0.1}
            />
            <StatCard
                label="Unique Petitioners"
                value={stats.uniquePetitioners}
                delay={0.2}
            />
            <StatCard
                label="Repeat Petitioners"
                value={stats.repeatPetitioners}
                delay={0.3}
            />
            <StatCard
                label="Dismissal/Withdrawn"
                value={`${stats.dismissalRate}%`}
                delay={0.4}
            />
            <StatCard
                label="Total Defense Costs"
                value={stats.totalCosts}
                delay={0.5}
            />
        </div>
    );
};

export default KPICards;
