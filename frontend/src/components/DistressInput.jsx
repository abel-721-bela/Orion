import { motion } from 'framer-motion';
import { useState } from 'react';

export default function DistressInput({ onAnalyze, isLoading }) {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            onAnalyze(message);
        }
    };

    const exampleMessages = [
        "No food for 2 days near temple road. 5 people. Baby sick.",
        "Stranded on rooftop. Water rising fast. 3 elderly people.",
        "Need medical help urgently. Chest pain. Cannot reach hospital."
    ];

    const fillExample = (example) => {
        setMessage(example);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-strong rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl"
        >
            <div className="mb-4">
                <h2 className="text-xl sm:text-2xl font-bold gradient-text mb-2">
                    Distress Message Input
                </h2>
                <p className="text-gray-400 text-sm">
                    Paste or type emergency message for AI analysis
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Example: No food for 2 days near temple road. 5 people. Baby sick."
                        rows={5}
                        className="w-full bg-black/30 border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:border-orion-accent focus:ring-2 focus:ring-orion-accent/20 resize-none transition-all"
                        disabled={isLoading}
                    />
                    <div className="mt-2 flex items-center justify-between text-sm">
                        <span className="text-gray-500">
                            {message.length} characters
                        </span>
                    </div>
                </div>

                <div className="space-y-2">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Quick Examples:
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {exampleMessages.map((example, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => fillExample(example)}
                                className="text-xs px-3 py-1.5 glass rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-all"
                                disabled={isLoading}
                            >
                                Example {idx + 1}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.button
                    type="submit"
                    disabled={isLoading || !message.trim()}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-white text-base sm:text-lg relative overflow-hidden
            ${isLoading || !message.trim()
                            ? 'bg-gray-600 cursor-not-allowed'
                            : 'bg-gradient-to-r from-orion-accent to-purple-600 hover:shadow-glow-lg'
                        }`}
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center gap-3">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                            Analyzing...
                        </span>
                    ) : (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Analyze Message
                        </span>
                    )}
                </motion.button>
            </form>
        </motion.div>
    );
}
