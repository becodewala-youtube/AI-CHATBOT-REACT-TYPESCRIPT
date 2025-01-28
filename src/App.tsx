// Importing necessary React hooks and components used in the application.
import { useEffect, useRef } from 'react';
import { Header } from './components/Header'; // Header component, likely displaying the app's title or logo.
import { ChatMessage } from './components/ChatMessage'; // Component to render individual chat messages.
import { ChatInput } from './components/ChatInput'; // Component for the user to input messages.
import { TypingIndicator } from './components/TypingIndicator'; // Component to show when the assistant is typing.
import { useChatStore } from './store/chatStore'; // Zustand store to manage the chat state.
import { initializeAI, generateResponse } from './services/ai'; // Functions to initialize and interact with the AI service.

// Initializing the AI model using an API key.
// The API key is retrieved from the environment variables.
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // Replace with your actual API key.
initializeAI(GEMINI_API_KEY); // Initializes the AI service with the API key.

function App() {
  // Destructuring state and actions from the Zustand chat store.
  const { messages, isTyping, addMessage, setIsTyping, isDarkMode } =
    useChatStore();

  // Creating a reference to the end of the messages list for auto-scrolling.
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to scroll to the bottom of the chat messages.
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // useEffect runs whenever the 'messages' state changes to ensure auto-scrolling.
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to handle sending a message and generating a response from the AI.
  const handleSendMessage = async (message: string) => {
    // Adds the user's message to the chat store.
    addMessage(message, 'user');
    setIsTyping(true); // Sets the 'isTyping' state to true to indicate the assistant is generating a response.

    try {
      // Generates a response from the AI service using the user's message.
      const response = await generateResponse(message);
      addMessage(response, 'assistant'); // Adds the AI's response to the chat store.
    } catch (error) {
      // Adds an error message to the chat store if something goes wrong.
      addMessage(
        'Sorry, I encountered an error. Please try again.',
        'assistant'
      );
    } finally {
      // Ensures the 'isTyping' state is set back to false regardless of success or failure.
      setIsTyping(false);
    }
  };

  return (
    // Conditionally applying the 'dark' class based on the dark mode state.
    <div className={isDarkMode ? 'dark' : ''}>
      {/* Main container for the app layout */}
      <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
        <Header /> {/* Renders the app's header */}
        <main className="flex-1 overflow-y-auto">
          {/* Container for chat messages */}
          <div className="max-w-4xl mx-auto divide-y dark:divide-gray-700">
            {/* Renders each chat message from the messages state */}
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {/* Shows a typing indicator if the assistant is typing */}
            {isTyping && <TypingIndicator />}
            {/* Empty div to mark the end of messages for scrolling */}
            <div ref={messagesEndRef} />
          </div>
        </main>
        {/* Input component for the user to send messages */}
        <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
      </div>
    </div>
  );
}

export default App; // Exports the App component as the default export.
