class Chatbot {
  constructor(aiInstance) {
    this.ai = aiInstance; // Store the AI instance
    this.conversationId = null; // Store the conversation context
    this.initialPrompt = "You are a helpful chatbot that assists users who are teachers that need help with their teaching plan. If the user requests anything to be answered that is not related to teacher planning or anything of this manner, please notify the user that you are not equipped for that, and state that you are only for helpful teacher planning."; // Define the goal
    this.history = []; // Store the conversation history
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
      this.history.push({ role: "system", content: this.initialPrompt }); // Add initial prompt to history
      this.history.push({ role: "assistant", content: response.text }); // Add AI's initial response to history
      return response.text; // Return the initial response text
    } catch (error) {
      console.error("Error starting conversation:", error); // Log error details
      return "Sorry, I couldn't start the conversation.";
    }
  }

  async generateResponse(userInput) {
    try {
      console.log("User Input:", userInput); // Debugging log
      this.history.push({ role: "user", content: userInput }); // Add user input to history

      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: this.history.map(entry => `${entry.role}: ${entry.content}`).join("\n"), // Include conversation history
        conversationId: this.conversationId, // Maintain conversation context
        config: {
          thinkingConfig: {
            thinkingBudget: 0,
          },
        },
      });

      console.log("AI Response:", response); // Debugging log
      this.history.push({ role: "assistant", content: response.text }); // Add AI response to history
      return response.text;
    } catch (error) {
      console.error("Error generating response:", error); // Log error details
      return "Sorry, I couldn't process your request.";
    }
  }
}

export default Chatbot;