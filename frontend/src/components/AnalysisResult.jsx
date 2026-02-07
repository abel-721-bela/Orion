import { motion } from 'framer-motion';

const needIcons = {
    food: '🍲',
    water: '💧',
    medical: '🏥',
    rescue: '🆘',
    shelter: '🏠',
    other: '📋'
};

export default function AnalysisResult({ analysis }) {
    if (!analysis) return null;

    const { need, quantity, location, extractedDetails } = analysis;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-strong rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl mt-4 sm:mt-6"
        >
            <div className="mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-white mb-1">
                    AI Extraction Results
                </h2>
                <p className="text-gray-400 text-sm">
                    Structured data from Gemini AI
                </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
                <div className="glass rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <div className="text-3xl sm:text-4xl mb-2">{needIcons[need] || needIcons.other}</div>
                    <div className="text-xs text-gray-400 uppercase tracking-wide">Need Type</div>
                    <div className="text-base sm:text-lg font-semibold text-white capitalize mt-1">{need}</div>
                </div>

                <div className="glass rounded-xl p-4">
                    <div className="text-4xl mb-2">👥</div>
                    <div className="text-xs text-gray-400 uppercase tracking-wide">Affected</div>
                    <div className="text-lg font-semibold text-white mt-1">{quantity} {quantity === 1 ? 'person' : 'people'}</div>
                </div>

                <div className="glass rounded-xl p-4 col-span-2">
                    <div className="text-4xl mb-2">📍</div>
                    <div className="text-xs text-gray-400 uppercase tracking-wide">Location</div>
                    <div className="text-lg font-semibold text-white mt-1">{location}</div>
                </div>
            </div>

            {extractedDetails && (
                <div className="space-y-3 mt-4">
                    {extractedDetails.duration && extractedDetails.duration !== 'Not specified' && (
                        <div className="flex items-start gap-3 p-3 glass rounded-lg">
                            <div className="text-2xl">⏱️</div>
                            <div>
                                <div className="text-xs text-gray-400 uppercase">Duration</div>
                                <div className="text-sm text-white font-medium">{extractedDetails.duration}</div>
                            </div>
                        </div>
                    )}

                    {extractedDetails.vulnerableGroups?.length > 0 && (
                        <div className="flex items-start gap-3 p-3 glass rounded-lg">
                            <div className="text-2xl">⚠️</div>
                            <div>
                                <div className="text-xs text-gray-400 uppercase">Vulnerable Groups</div>
                                <div className="text-sm text-white font-medium">
                                    {extractedDetails.vulnerableGroups.join(', ')}
                                </div>
                            </div>
                        </div>
                    )}

                    {extractedDetails.medicalConcerns?.length > 0 && (
                        <div className="flex items-start gap-3 p-3 glass rounded-lg">
                            <div className="text-2xl">🏥</div>
                            <div>
                                <div className="text-xs text-gray-400 uppercase">Medical Concerns</div>
                                <div className="text-sm text-white font-medium">
                                    {extractedDetails.medicalConcerns.join(', ')}
                                </div>
                            </div>
                        </div>
                    )}

                    {extractedDetails.environmentalFactors?.length > 0 && (
                        <div className="flex items-start gap-3 p-3 glass rounded-lg">
                            <div className="text-2xl">🌊</div>
                            <div>
                                <div className="text-xs text-gray-400 uppercase">Environmental Factors</div>
                                <div className="text-sm text-white font-medium">
                                    {extractedDetails.environmentalFactors.join(', ')}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </motion.div>
    );
}
