const axios = require("axios");

class AIService {
  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY;
    this.baseURL = "https://openrouter.ai/api/v1";
    this.isConnected = false;
  }

  async checkConnection() {
    try {
      if (!this.apiKey) {
        throw new Error("OpenRouter API key not configured");
      }

      console.log(
        `   🔑 API Key configured: ${this.apiKey.substring(0, 8)}...`
      );
      console.log(`   🌐 Testing connection to: ${this.baseURL}`);

      // First, let's try to get available models
      console.log(`   📋 Fetching available models...`);
      const modelsResponse = await axios.get(`${this.baseURL}/models`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "AI Customer Support",
        },
        timeout: 10000,
      });

      console.log(
        `   ✅ Models API accessible. Found ${
          modelsResponse.data.data?.length || 0
        } models.`
      );

      // Try a simple test with a common model
      const testModel = "openai/gpt-3.5-turbo"; // Use a more standard model
      console.log(`   🧪 Testing with model: ${testModel}`);

      const response = await axios.post(
        `${this.baseURL}/chat/completions`,
        {
          model: testModel,
          messages: [
            {
              role: "user",
              content: "Hello",
            },
          ],
          max_tokens: 10,
          temperature: 0.1,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:3000",
            "X-Title": "AI Customer Support",
          },
          timeout: 10000, // 10 second timeout
        }
      );

      this.isConnected = true;
      return {
        connected: true,
        service: "OpenRouter AI",
        model: testModel,
      };
    } catch (error) {
      this.isConnected = false;

      // Enhanced error logging
      let errorMessage = error.message;
      if (error.response) {
        console.log(`   📡 Response Status: ${error.response.status}`);
        console.log(`   📄 Response Data:`, error.response.data);
        errorMessage = `${error.message} - Status: ${error.response.status}`;
        if (error.response.data && error.response.data.error) {
          errorMessage += ` - ${
            error.response.data.error.message || error.response.data.error
          }`;
        }
      } else if (error.request) {
        console.log(`   🔌 Network Error: No response received`);
        errorMessage = "Network error - No response from OpenRouter API";
      }

      return {
        connected: false,
        service: "OpenRouter AI",
        error: errorMessage,
      };
    }
  }

  async generateResponse(messages) {
    try {
      if (!this.apiKey) {
        throw new Error("OpenRouter API key not configured");
      }

      const response = await axios.post(
        `${this.baseURL}/chat/completions`,
        {
          model: "openai/gpt-3.5-turbo",
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
      return "I'm here to help! How can I assist you today?";
    }
  }
}

module.exports = new AIService();
