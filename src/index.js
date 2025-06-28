import express from 'express';
import bodyParser from 'body-parser';
import Chatbot from './chatbot.js';
import settings from './config/settings.js';
import { GoogleGenAI } from '@google/genai'; // Import GoogleGenAI

const app = express();
const port = settings.PORT;

// Initialize GoogleGenAI instance
const aiInstance = new GoogleGenAI({
  apiKey: settings.AI_API_KEY, // Use the API key from settings.js
});

app.use(bodyParser.json());

// Pass the AI instance to the Chatbot class
const chatbot = new Chatbot(aiInstance);

app.post('/chat', async (req, res) => {
  const userInput = req.body.message;
  try {
    const response = await chatbot.generateResponse(userInput);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: 'Error generating response' });
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to the Gemini Chatbot API! Use POST /chat to interact with the chatbot.');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});