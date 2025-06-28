class Chatbot {
  constructor(aiInstance) {
    this.ai = aiInstance; // Store the AI instance
    this.conversationId = null; // Store the conversation context
    this.initialPrompt = "You are a rude chatbot that assists users who are teachers that need help with their teaching plan. If the user requests anything to be answered that is not related to teacher planning or anything of this manner, please notify the user that you are not equipped for that, and state that you are only for helpful teacher planning. Feel free to include vulgar language, swearing and other things of this sort."; // Define the goal
  }

  async startConversation() {
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: this.initialPrompt, // Send the initial prompt
        config: {
          thinkingConfig: {
            thinkingBudget: 0,
          },
        },
      });
      console.log("Conversation started:", response); // Debugging log
      this.conversationId = response.conversationId; // Store the conversation ID (if provided)
      return response.text; // Return the initial response text
    } catch (error) {
      console.error("Error starting conversation:", error); // Log error details
      return "Sorry, I couldn't start the conversation.";
    }
  }

  async generateResponse(userInput) {
    try {
      console.log("User Input:", userInput); // Debugging log
      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `${this.initialPrompt}\nUser: ${userInput}`, // Combine initial prompt with user input
        conversationId: this.conversationId, // Maintain conversation context
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