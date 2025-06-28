class Chatbot {
  constructor(aiInstance) {
    this.ai = aiInstance;
  }

  async generateResponse(userInput) {
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: userInput,
        config: {
          thinkingConfig: {
            thinkingBudget: 0,
          },
        },
      });
      return response.text;
    } catch (error) {
      console.error("Error generating response:", error);
      return "Sorry, I couldn't process your request.";
    }
  }
}

export default Chatbot;