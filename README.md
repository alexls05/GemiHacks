# Gemini Chatbot

This project is a simple chatbot application that utilizes the Gemini AI to generate responses based on user input. It is built using Node.js and Express.

## Project Structure

```
gemini-chatbot
├── src
│   ├── index.js          # Entry point of the application
│   ├── chatbot.js        # Chatbot logic and AI interaction
│   └── config
│       └── settings.js   # Configuration settings
├── package.json          # NPM configuration file
└── README.md             # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd gemini-chatbot
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Configure settings:**
   Update the `src/config/settings.js` file with your API keys and desired port number.

4. **Run the application:**
   ```
   npm start
   ```

## Usage

Once the server is running, you can interact with the chatbot by sending requests to the specified endpoint. The chatbot will generate responses using the Gemini AI based on the input provided.

## Chatbot Functionality

The chatbot is designed to handle various user inputs and provide relevant responses. It leverages the capabilities of the Gemini AI to ensure accurate and context-aware replies.