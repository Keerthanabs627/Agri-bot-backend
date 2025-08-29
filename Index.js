import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable, not hardcoded!
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { message } = req.body;
            if (!message) {
                return res.status(400).json({ error: 'Message is required' });
            }

            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent(message);
            const response = await result.response;
            const text = response.text();

            res.status(200).json({ botResponse: text });
        } catch (error) {
            console.error('Error calling Gemini API:', error);
            res.status(500).json({ error: 'Failed to get response from AI.' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
