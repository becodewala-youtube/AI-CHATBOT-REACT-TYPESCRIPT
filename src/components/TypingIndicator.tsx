import React from 'react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex gap-4 p-6 bg-gray-50 dark:bg-gray-800">
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
      </div>
    </div>
  );
};