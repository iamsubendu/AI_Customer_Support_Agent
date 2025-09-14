const axios = require("axios");

class AIService {
  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY;
    this.baseURL = "https://openrouter.ai/api/v1";
  }

  async generateResponse(messages) {
    try {
      if (!this.apiKey) {
        throw new Error("OpenRouter API key not configured");
      }

      const response = await axios.post(
        `${this.baseURL}/chat/completions`,
        {
          model: "microsoft/dialoGPT-medium",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful customer support assistant. Be friendly, professional, and helpful. Keep responses concise but informative.",
            },
            ...messages,
          ],
          max_tokens: 500,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:3000",
            "X-Title": "AI Customer Support",
          },
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error("AI Service Error:", error.response?.data || error.message);

      return "I apologize, but I'm having trouble connecting to my AI service right now. Please try again in a moment, or contact our support team directly.";
    }
  }

  async generateResponseHuggingFace(messages) {
    try {
      const lastMessage = messages[messages.length - 1];
      const userMessage = lastMessage.content;

      const response = await axios.post(
        "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
        {
          inputs: userMessage,
          parameters: {
            max_length: 200,
            temperature: 0.7,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      return (
        response.data.generated_text ||
        "I'm here to help! How can I assist you today?"
      );
    } catch (error) {
      console.error(
        "Hugging Face Error:",
        error.response?.data || error.message
      );
      return "I'm here to help! How can I assist you today?";
    }
  }
}

module.exports = new AIService();
