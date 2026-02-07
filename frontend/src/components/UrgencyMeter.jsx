import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const urgencyConfig = {
    critical: {
        color: 'from-red-500 to-pink-600',
        bg: 'bg-red-500/20',
        text: 'text-red-400',
        glow: 'shadow-glow-lg',
    },
    high: {
        color: 'from-orange-500 to-red-500',
        bg: 'bg-orange-500/20',
        text: 'text-orange-400',
        glow: 'shadow-glow',
    },
    medium: {
        color: 'from-yellow-500 to-orange-500',
        bg: 'bg-yellow-500/20',
        text: 'text-yellow-400',
        glow: '',
    },
    low: {
        color: 'from-green-500 to-emerald-500',
        bg: 'bg-green-500/20',
        text: 'text-green-400',
        glow: '',
    },
};

export default function UrgencyMeter({ analysis }) {
    const [displayScore, setDisplayScore] = useState(0);

    useEffect(() => {
        if (analysis) {
            let current = 0;
            const target = analysis.urgencyScore;
            const increment = target / 30;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    setDisplayScore(target);
                    clearInterval(timer);
                } else {
                    setDisplayScore(Math.floor(current));
                }
            }, 30);

            return () => clearInterval(timer);
        }
    }, [analysis]);

    if (!analysis) return null;

    const config = urgencyConfig[analysis.urgencyLevel] || urgencyConfig.medium;
    const percentage = (displayScore / 100) * 100;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`glass-strong rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl ${config.glow}`}
        >
            <div className="mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-white mb-1">
                    Urgency Assessment
                </h2>
                <p className="text-gray-400 text-sm">
                    AI-calculated priority level
                </p>
            </div>

            {/* Circular Progress */}
            <div className="flex flex-col items-center mb-4 sm:mb-6">
                <div className="relative w-36 h-36 sm:w-48 sm:h-48">
                    <svg className="w-full h-full transform -rotate-90">
                        {/* Background circle */}
                        <circle
                            cx="96"
                            cy="96"
                            r="88"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="12"
                            fill="none"
                        />
                        {/* Progress circle */}
                        <motion.circle
                            cx="96"
                            cy="96"
                            r="88"
                            stroke="url(#urgencyGradient)"
                            strokeWidth="12"
                            fill="none"
                            strokeLinecap="round"
                            initial={{ strokeDasharray: "0 552" }}
                            animate={{ strokeDasharray: `${(percentage / 100) * 552} 552` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        />
                        <defs>
                            <linearGradient id="urgencyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" className={`${config.text}`} stopOpacity="1" />
                                <stop offset="100%" className={`${config.text}`} stopOpacity="0.6" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Score in center */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.div
                            key={displayScore}
                            initial={{ scale: 1.2, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-4xl sm:text-6xl font-bold gradient-text"
                        >
                            {displayScore}
                        </motion.div>
                        <div className="text-gray-400 text-sm">out of 100</div>
                    </div>
                </div>

                {/* Urgency Badge */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className={`mt-4 px-6 py-2 rounded-full ${config.bg} border border-white/20`}
                >
                    <span className={`${config.text} font-semibold uppercase text-sm tracking-wide`}>
                        {analysis.urgencyLevel}
                    </span>
                </motion.div>
            </div>

            {/* Reasoning */}
            {analysis.reasoning && analysis.reasoning.length > 0 && (
                <div className="space-y-2">
                    <div className="text-sm font-semibold text-gray-300 mb-3">
                        Reasoning:
                    </div>
                    {analysis.reasoning.map((reason, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + idx * 0.1 }}
                            className="flex items-start gap-3 glass rounded-lg p-3"
                        >
                            <div className={`mt-0.5 w-1.5 h-1.5 rounded-full ${config.bg}`}></div>
                            <p className="text-sm text-gray-300 flex-1">{reason}</p>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );
}
