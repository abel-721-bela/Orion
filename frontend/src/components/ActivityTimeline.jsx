import { motion } from 'framer-motion';

const iconMap = {
    message: '📨',
    ai: '🤖',
    resource: '🎯',
    dispatch: '🚀',
};

const statusConfig = {
    completed: {
        color: 'text-green-400',
        bg: 'bg-green-500/20',
        border: 'border-green-500/30',
    },
    in_progress: {
        color: 'text-blue-400',
        bg: 'bg-blue-500/20',
        border: 'border-blue-500/30',
    },
    pending: {
        color: 'text-gray-400',
        bg: 'bg-gray-500/20',
        border: 'border-gray-500/30',
    },
};

export default function ActivityTimeline({ timeline }) {
    if (!timeline || timeline.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-strong rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl mt-4 sm:mt-6"
        >
            <div className="mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-white mb-1">
                    Activity Timeline
                </h2>
                <p className="text-gray-400 text-sm">
                    Real-time processing updates
                </p>
            </div>

            <div className="space-y-4">
                {timeline.map((item, idx) => {
                    const config = statusConfig[item.status] || statusConfig.pending;
                    const icon = iconMap[item.icon] || '📋';

                    return (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + idx * 0.1 }}
                            className={`flex items-start gap-3 sm:gap-4 ${config.bg} rounded-lg sm:rounded-xl p-3 sm:p-4 border ${config.border}`}
                        >
                            <div className="text-xl sm:text-2xl">{icon}</div>
                            <div className="flex-1">
                                <div className="text-sm sm:text-base text-white font-medium mb-1">
                                    {item.event}
                                </div>
                                <div className="text-xs text-gray-400">
                                    {new Date(item.timestamp).toLocaleTimeString()}
                                </div>
                            </div>
                            <div>
                                {item.status === 'completed' && (
                                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                )}
                                {item.status === 'in_progress' && (
                                    <svg className="w-5 h-5 text-blue-400 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
