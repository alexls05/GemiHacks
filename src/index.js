import express from 'express';
import bodyParser from 'body-parser';
import Chatbot from './chatbot.js';
import settings from './config/settings.js';
import { GoogleGenAI } from '@google/genai'; // Import GoogleGenAI
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = settings.PORT;

// Initialize GoogleGenAI instance
const aiInstance = new GoogleGenAI({
  apiKey: settings.AI_API_KEY, // Use the API key from settings.js
});

app.use(bodyParser.json());

// Pass the AI instance to the Chatbot class
const chatbot = new Chatbot(aiInstance);

// Start the conversation when the server starts
chatbot.startConversation();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Chat endpoint
app.post('/chat', async (req, res) => {
  const userInput = req.body.message;
  try {
    const response = await chatbot.generateResponse(userInput);
    res.json({ response });
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).json({ error: 'Error generating response' });
  }
});

app.get('/start', async (req, res) => {
  try {
    const initialResponse = await chatbot.startConversation();
    res.json({ response: initialResponse });
  } catch (error) {
    console.error('Error starting conversation:', error);
    res.status(500).json({ error: 'Error starting conversation' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});