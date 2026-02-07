import { motion } from 'framer-motion';

const resourceIcons = {
    medical: '🏥',
    food: '🍲',
    water: '💧',
    rescue: '🆘',
    shelter: '🏠',
    unknown: '📋'
};

const statusConfig = {
    available: {
        color: 'text-green-400',
        bg: 'bg-green-500/20',
        dot: 'bg-green-500',
    },
    limited: {
        color: 'text-yellow-400',
        bg: 'bg-yellow-500/20',
        dot: 'bg-yellow-500',
    },
    unavailable: {
        color: 'text-red-400',
        bg: 'bg-red-500/20',
        dot: 'bg-red-500',
    },
};

export default function ResourceCard({ resource }) {
    if (!resource) return null;

    const status = statusConfig[resource.availabilityStatus] || statusConfig.unavailable;
    const icon = resourceIcons[resource.type] || resourceIcons.unknown;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-strong rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl border-2 border-white/10 hover:border-orion-accent/30 transition-all"
        >
            <div className="mb-4 sm:mb-6">
                <h2 className="text-xl font-bold text-white mb-1">
                    Matched Resource
                </h2>
                <p className="text-gray-400 text-sm">
                    Best available option
                </p>
            </div>

            {/* Resource Header */}
            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="text-3xl sm:text-5xl">{icon}</div>
                <div className="flex-1">
                    <h3 className="text-lg sm:text-2xl font-bold text-white mb-1">
                        {resource.name}
                    </h3>
                    <p className="text-gray-400 capitalize text-xs sm:text-sm">
                        {resource.subtype?.replace('_', ' ') || resource.type}
                    </p>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="glass rounded-xl p-4">
                    <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                        Distance
                    </div>
                    <div className="text-2xl font-bold gradient-text">
                        {resource.distance}
                    </div>
                </div>

                <div className="glass rounded-xl p-4">
                    <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                        ETA
                    </div>
                    <div className="text-2xl font-bold gradient-text">
                        {resource.eta}
                    </div>
                </div>
            </div>

            {/* Status */}
            <div className={`${status.bg} rounded-xl p-4 mb-4`}>
                <div className="flex items-center gap-2 mb-2">
                    <div className={`w-2 h-2 rounded-full ${status.dot} animate-pulse`}></div>
                    <span className={`${status.color} font-semibold uppercase text-xs tracking-wide`}>
                        {resource.availabilityStatus}
                    </span>
                </div>
                {resource.currentAvailability !== undefined && resource.capacity && (
                    <div className="text-sm text-gray-300">
                        <span className="font-semibold">{resource.currentAvailability}</span>
                        {' / '}
                        <span>{resource.capacity}</span>
                        {' '}capacity
                    </div>
                )}
            </div>

            {/* Location */}
            <div className="glass rounded-xl p-4 mb-4">
                <div className="flex items-start gap-3">
                    <div className="text-xl">📍</div>
                    <div className="flex-1">
                        <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                            Location
                        </div>
                        <div className="text-sm text-white font-medium">
                            {resource.location}
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact */}
            {resource.contact && (
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-orion-accent to-purple-600 hover:shadow-glow py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Contact: {resource.contact}
                </motion.button>
            )}
        </motion.div>
    );
}
