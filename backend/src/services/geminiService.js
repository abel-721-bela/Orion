import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Analyzes a distress message using Gemini AI
 * Extracts: need, quantity, location, urgency level, and reasoning
 */
export async function analyzeDistressMessage(message) {
    try {
        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-flash',
            generationConfig: {
                temperature: 0.3,
                topP: 0.95,
                topK: 40,
            }
        });

        const prompt = `You are an emergency response AI system analyzing distress/crisis messages. Your job is to extract critical information and calculate an accurate urgency score.

DISTRESS MESSAGE:
"${message}"

TASK: Analyze the message above and extract the following information with HIGH ACCURACY.

EXTRACTION RULES:

1. NEED TYPE - Identify the primary need:
   - "food" if they need food, meals, nutrition
   - "water" if they need drinking water, clean water
   - "medical" if medical help, injury, illness, doctor needed
   - "rescue" if trapped, stranded, need evacuation
   - "shelter" if homeless, need housing, accommodation
   - "other" if unclear or multiple needs

2. LOCATION - Extract ANY location mentions:
   - Look for: road names, landmarks, area names, village/town names, districts
   - Examples: "temple road", "beach road", "Alappuzha", "Kuttanad", "near hospital"
   - If NO location mentioned, use: "Location not specified"
   - BE SPECIFIC - extract the exact words used for location

3. QUANTITY - Number of people affected:
   - Count: babies, children, adults, elderly, families
   - If "family" mentioned, estimate 4-5 people
   - If unclear, use: 1

4. DURATION - How long they've been in crisis:
   - Look for: "2 days", "48 hours", "since morning", "24 hrs"
   - Extract the exact duration mentioned
   - If not mentioned, use: "Not specified"

5. VULNERABLE GROUPS - Identify if present:
   - "baby" or "infant" or "newborn"
   - "elderly" or "old person" or "aged"
   - "pregnant" or "expecting mother"
   - "disabled" or "handicapped"
   - "sick" or "ill"

6. MEDICAL CONCERNS - Any health issues:
   - "sick", "fever", "chest pain", "injury", "bleeding", "unconscious", etc.

7. ENVIRONMENTAL FACTORS - Natural disasters or dangers:
   - "flood", "water rising", "fire", "earthquake", "landslide", "storm"

URGENCY CALCULATION - BE STRICT AND ACCURATE:

START with base score: 30

ADD points for:
- Baby/infant mentioned: +25
- Elderly mentioned: +20  
- Pregnant woman: +20
- Disabled person: +15
- Medical emergency (chest pain, bleeding, unconscious): +30
- Sick/ill mentioned: +20
- Duration >24 hours: +15
- Duration >48 hours (2+ days): +25
- Flood/water rising: +25
- Fire: +30
- Stranded/trapped: +20
- Multiple people >5: +10
- Multiple people >10: +15

URGENCY LEVEL:
- 0-40: "low"
- 41-60: "medium"  
- 61-80: "high"
- 81-100: "critical"

REASONING: Provide 3-4 specific reasons WHY you gave this urgency score. Reference the actual words from the message.

OUTPUT FORMAT - Return ONLY this JSON structure, nothing else:
{
  "need": "food|water|medical|rescue|shelter|other",
  "quantity": <number>,
  "location": "<exact location from message>",
  "urgencyLevel": "low|medium|high|critical",
  "urgencyScore": <0-100>,
  "reasoning": [
    "Reason 1 with specific detail from message",
    "Reason 2 with specific detail from message", 
    "Reason 3 with specific detail from message"
  ],
  "extractedDetails": {
    "duration": "<exact duration or 'Not specified'>",
    "vulnerableGroups": ["array of vulnerable groups found"],
    "medicalConcerns": ["array of medical issues found"],
    "environmentalFactors": ["array of environmental dangers found"]
  }
}

IMPORTANT: Return ONLY the JSON object, no markdown, no code blocks, no additional text.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Extract JSON from response (handle markdown code blocks)
        let jsonText = text.trim();
        if (jsonText.startsWith('```json')) {
            jsonText = jsonText.replace(/```json\n?/, '').replace(/```\s*$/, '');
        } else if (jsonText.startsWith('```')) {
            jsonText = jsonText.replace(/```\n?/, '').replace(/```\s*$/, '');
        }

        const analysis = JSON.parse(jsonText);

        // Validate and ensure all required fields exist
        const validAnalysis = {
            need: analysis.need || 'other',
            quantity: analysis.quantity || 1,
            location: analysis.location || 'Unknown location',
            urgencyLevel: analysis.urgencyLevel || 'medium',
            urgencyScore: Math.min(100, analysis.urgencyScore || 50),
            reasoning: Array.isArray(analysis.reasoning) ? analysis.reasoning : ['Emergency assistance required'],
            extractedDetails: {
                duration: analysis.extractedDetails?.duration || 'Not specified',
                vulnerableGroups: Array.isArray(analysis.extractedDetails?.vulnerableGroups)
                    ? analysis.extractedDetails.vulnerableGroups
                    : [],
                medicalConcerns: Array.isArray(analysis.extractedDetails?.medicalConcerns)
                    ? analysis.extractedDetails.medicalConcerns
                    : [],
                environmentalFactors: Array.isArray(analysis.extractedDetails?.environmentalFactors)
                    ? analysis.extractedDetails.environmentalFactors
                    : []
            }
        };

        return validAnalysis;

    } catch (error) {
        console.error('Error analyzing message with Gemini:', error);

        // Return fallback analysis if Gemini fails
        return {
            need: 'other',
            quantity: 1,
            location: 'Unknown location',
            urgencyLevel: 'medium',
            urgencyScore: 50,
            reasoning: [
                'Unable to analyze message automatically',
                'Manual review required'
            ],
            extractedDetails: {
                duration: 'Not specified',
                vulnerableGroups: [],
                medicalConcerns: [],
                environmentalFactors: []
            },
            error: 'AI analysis failed. Please check API key and try again.'
        };
    }
}
