import React from 'react';
import { Moon, Sun, Trash2 } from 'lucide-react';
import { useChatStore } from '../store/chatStore';

export const Header: React.FC = () => {
  const { clearMessages, isDarkMode, toggleDarkMode } = useChatStore();

  return (
    <header className="border-b dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          AI ChatBot
        </h1>
        <div className="flex items-center gap-4">
          <button
            onClick={clearMessages}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            title="Clear chat"
          >
            <Trash2 size={20} />
          </button>
          <button
            onClick={toggleDarkMode}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            title="Toggle theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};