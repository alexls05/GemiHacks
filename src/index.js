const express = require('express');
const bodyParser = require('body-parser');
const Chatbot = require('./chatbot');
const settings = require('./config/settings');

const app = express();
const port = settings.port;

app.use(bodyParser.json());

const chatbot = new Chatbot();

app.post('/chat', async (req, res) => {
  const userInput = req.body.message;
  try {
    const response = await chatbot.generateResponse(userInput);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: 'Error generating response' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});