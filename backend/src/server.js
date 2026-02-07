import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { analyzeDistressMessage } from './services/geminiService.js';
import { findBestResource } from './services/resourceMatcher.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        service: 'Orion Crisis Intelligence API',
        timestamp: new Date().toISOString()
    });
});

// Main analysis endpoint
app.post('/api/analyze', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || message.trim().length === 0) {
            return res.status(400).json({
                error: 'Message is required',
                message: 'Please provide a distress message to analyze'
            });
        }

        console.log(`[${new Date().toISOString()}] Analyzing message:`, message);

        // Step 1: Analyze the distress message with Gemini AI
        const analysis = await analyzeDistressMessage(message);

        console.log(`[${new Date().toISOString()}] Analysis complete:`, analysis);

        // Step 2: Find the best matching resource
        const matchedResource = findBestResource(analysis);

        console.log(`[${new Date().toISOString()}] Matched resource:`, matchedResource.name);

        // Step 3: Create activity timeline
        const timeline = [
            {
                id: 1,
                timestamp: new Date().toISOString(),
                event: 'Distress message received',
                status: 'completed',
                icon: 'message'
            },
            {
                id: 2,
                timestamp: new Date(Date.now() + 1000).toISOString(),
                event: 'AI analysis completed',
                status: 'completed',
                icon: 'ai'
            },
            {
                id: 3,
                timestamp: new Date(Date.now() + 2000).toISOString(),
                event: `Matched with ${matchedResource.name}`,
                status: 'completed',
                icon: 'resource'
            },
            {
                id: 4,
                timestamp: new Date(Date.now() + 3000).toISOString(),
                event: 'Dispatching response team',
                status: 'in_progress',
                icon: 'dispatch'
            }
        ];

        // Step 4: Return comprehensive response
        res.json({
            success: true,
            analysis,
            resource: matchedResource,
            timeline,
            processedAt: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({
            error: 'Failed to process distress message',
            message: error.message,
            details: 'Please check your Gemini API key and try again'
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: err.message
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`\n🚀 Orion Crisis Intelligence API running on port ${PORT}`);
    console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🔍 Analysis endpoint: http://localhost:${PORT}/api/analyze\n`);

    if (!process.env.GEMINI_API_KEY) {
        console.warn('⚠️  WARNING: GEMINI_API_KEY not found in .env file');
        console.warn('   Please add your Gemini API key to continue\n');
    }
});
