const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function analyzeMessage(message) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/analyze`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to analyze message');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

export async function checkHealth() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/health`);
        return await response.json();
    } catch (error) {
        console.error('Health check failed:', error);
        return { status: 'error' };
    }
}
