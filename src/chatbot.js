class Chatbot {
  constructor(aiInstance) {
    this.ai = aiInstance; // Store the AI instance
  }

  async generateResponse(userInput) {
    try {
      console.log("User Input:", userInput); // Debugging log
      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: userInput,
        config: {
          thinkingConfig: {
            thinkingBudget: 0,
          },
        },
      });
      console.log("AI Response:", response); // Debugging log
      return response.text;
    } catch (error) {
      console.error("Error generating response:", error); // Log error details
      return "Sorry, I couldn't process your request.";
    }
  }
}

export default Chatbot;