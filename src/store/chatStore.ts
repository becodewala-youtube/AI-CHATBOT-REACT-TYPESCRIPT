// Importing the 'create' function from the Zustand library, which is used to create a global state store.
import { create } from 'zustand';

// Importing the 'ChatState' type, which is likely a TypeScript interface or type that defines the shape of the chat state.
import { ChatState } from '../types/chat';

// Creating a Zustand store using the `create` function. The store's state conforms to the 'ChatState' type.
export const useChatStore = create<ChatState>((set) => ({
  // Initial state: An empty array for storing chat messages.
  messages: [],

  // Initial state: A boolean to track if the assistant is currently typing.
  isTyping: false,

  // Initial state: A boolean to determine if dark mode is enabled.
  isDarkMode: false,

  // Method to add a new message to the chat. Accepts `content` (message text) and `role` (either 'user' or 'assistant') as parameters.
  addMessage: (content: string, role: 'user' | 'assistant') =>
    set((state) => ({
      // Updates the `messages` array by appending a new message object.
      messages: [
        ...state.messages, // Spreads the current messages into a new array.
        {
          id: crypto.randomUUID(), // Generates a unique ID for the message.
          content,                 // The message text.
          role,                    // Specifies the sender (user or assistant).
          timestamp: new Date(),   // Adds the current date and time as the message timestamp.
        },
      ],
    })),

  // Method to update the `isTyping` state. Accepts a boolean to set whether the assistant is typing.
  setIsTyping: (typing: boolean) => set({ isTyping: typing }),

  // Method to clear all messages in the chat by setting the `messages` array to an empty array.
  clearMessages: () => set({ messages: [] }),

  // Method to toggle the `isDarkMode` state. Flips its current value between true and false.
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));
