export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  isTyping: boolean;
  isDarkMode: boolean;
  addMessage: (content: string, role: 'user' | 'assistant') => void;
  setIsTyping: (typing: boolean) => void;
  clearMessages: () => void;
  toggleDarkMode: () => void;
}