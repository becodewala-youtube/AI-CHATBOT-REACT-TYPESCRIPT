import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Bot, User } from 'lucide-react';
import { Message } from '../types/chat';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAI = message.role === 'assistant';

  return (
    <div
      className={`flex gap-4 p-6 ${
        isAI ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'
      }`}
    >
      <div className="flex-shrink-0">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isAI
              ? 'bg-green-500 text-white'
              : 'bg-blue-500 text-white'
          }`}
        >
          {isAI ? <Bot size={20} /> : <User size={20} />}
        </div>
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm text-gray-700 dark:text-gray-300">
            {isAI ? 'AI Assistant' : 'You'}
          </span>
          <span className="text-xs text-gray-500">
            {formatDistanceToNow(message.timestamp, { addSuffix: true })}
          </span>
        </div>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-800 dark:text-gray-200"><ReactMarkdown>{message.content}</ReactMarkdown></p>
        </div>
      </div>
    </div>
  );
};