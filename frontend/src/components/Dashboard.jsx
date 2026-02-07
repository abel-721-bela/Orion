import { useState } from 'react';
import { motion } from 'framer-motion';
import { analyzeMessage } from '../utils/api';
import DistressInput from './DistressInput';
import AnalysisResult from './AnalysisResult';
import UrgencyMeter from './UrgencyMeter';
import ResourceCard from './ResourceCard';
import ActivityTimeline from './ActivityTimeline';

export default function Dashboard() {
    const [isLoading, setIsLoading] = useState(false);
    const [analysis, setAnalysis] = useState(null);
    const [resource, setResource] = useState(null);
    const [timeline, setTimeline] = useState(null);
    const [error, setError] = useState(null);

    const handleAnalyze = async (message) => {
        setIsLoading(true);
        setError(null);
        setAnalysis(null);
        setResource(null);
        setTimeline(null);

        try {
            const result = await analyzeMessage(message);

            if (result.success) {
                setAnalysis(result.analysis);
                setResource(result.resource);
                setTimeline(result.timeline);
            } else {
                throw new Error('Analysis failed');
            }
        } catch (err) {
            setError(err.message || 'Failed to analyze message. Please check your API connection.');
            console.error('Analysis error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-orion-darker via-orion-dark to-purple-900/20"></div>
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-orion-accent/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
                />
            </div>

            {/* Header */}
            <motion.header
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-b border-white/10 backdrop-blur-xl bg-black/20"
            >
                <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-1 sm:mb-2">
                                    Orion
                                </h1>
                                <p className="text-gray-400 text-xs sm:text-sm hidden sm:block">
                                    Real-Time Crisis Intelligence & Resource Matching Engine
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="glass rounded-full px-4 py-2 flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-sm text-gray- 300">System Online</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Main Content */}
            <main className="container mx-auto px-4 sm:px-6 py-4 sm:py-8 max-w-7xl">
                {/* Error Display */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 bg-red-500/20 border border-red-500/30 rounded-xl p-4 flex items-start gap-3"
                    >
                        <svg className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <div>
                            <div className="font-semibold text-red-300 mb-1">Error</div>
                            <div className="text-sm text-red-200">{error}</div>
                        </div>
                    </motion.div>
                )}

                {/* Two-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
                    {/* Left Panel: Input + Analysis (60%) */}
                    <div className="lg:col-span-3 space-y-6">
                        <DistressInput onAnalyze={handleAnalyze} isLoading={isLoading} />

                        {analysis && (
                            <>
                                <AnalysisResult analysis={analysis} />
                                <ActivityTimeline timeline={timeline} />
                            </>
                        )}
                    </div>

                    {/* Right Panel: Urgency + Resources (40%) */}
                    <div className="lg:col-span-2 space-y-6">
                        {analysis && (
                            <>
                                <UrgencyMeter analysis={analysis} />
                                {resource && <ResourceCard resource={resource} />}
                            </>
                        )}

                        {!analysis && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="glass-strong rounded-2xl p-8 text-center"
                            >
                                <div className="text-6xl mb-4">🎯</div>
                                <h3 className="text-xl font-bold text-white mb-2">
                                    Ready to Analyze
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    Enter a distress message to begin AI-powered crisis analysis
                                </p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-white/10 backdrop-blur-xl bg-black/20 mt-12">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between text-sm text-gray-400">
                        <p>Powered by Google Gemini AI</p>
                        <p>Orion v1.0 - Crisis Intelligence Platform</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
