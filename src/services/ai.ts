// Importing the necessary modules from the '@google/generative-ai' package.
import {
  GoogleGenerativeAI, // Class for initializing the Google Generative AI client.
  GenerativeModel,    // Interface representing a generative model.
  GenerationConfig,   // Interface for configuring generation options.
} from '@google/generative-ai';

// Declaring a variable to store the generative model. Initially, it is set to null.
let model: GenerativeModel | null = null;

// Function to initialize the AI with an API key.
// This sets up the Google Generative AI client and assigns a specific model to the 'model' variable.
export const initializeAI = (apiKey: string) => {
  // Creating an instance of GoogleGenerativeAI using the provided API key.
  const genAI = new GoogleGenerativeAI(apiKey);
  
  // Retrieving a specific generative model ('gemini-pro') and storing it in the 'model' variable.
  model = genAI.getGenerativeModel({ model: 'gemini-pro' });
};

// Function to generate a response from the AI model based on a given message.
export const generateResponse = async (message: string) => {
  // Check if the 'model' has been initialized; if not, throw an error.
  if (!model) throw new Error('AI model not initialized');

  // Defining configuration options for the content generation.
  const generationConfig: GenerationConfig = {
    temperature: 0.9,       // Controls randomness in the output; higher values make it more creative.
    topK: 1,                // Limits the sampling to the top K most probable choices.
    topP: 1,                // Ensures cumulative probability of sampled tokens does not exceed this value.
    maxOutputTokens: 2048,  // Maximum number of tokens in the output.
  };

  // Generating content using the AI model with the provided message and generation configuration.
  const result = await model.generateContent({
    contents: [{ 
      role: 'user',  // Specifies the role as 'user' in the conversation.
      parts: [{ text: message }]  // The user's input message.
    }],
    generationConfig,  // Passes the configuration settings to the generation request.
  });

  // Returning the generated text from the AI's response.
  return result.response.text();
};
