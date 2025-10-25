import React, { useState } from 'react';
import SendIcon from './icons/SendIcon';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onSendMessage(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2 md:space-x-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Habla con Anshar..."
        disabled={isLoading}
        className="flex-1 w-full px-4 py-3 bg-gray-200 dark:bg-black rounded-full text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C8A2C8]/50 transition-shadow duration-300"
        style={{
          boxShadow: 'inset 4px 4px 6px #d9d9d9, inset -4px -4px 6px #ffffff'
        }}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-800 dark:to-black disabled:opacity-50 disabled:cursor-not-allowed group transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C8A2C8]"
        style={{
          boxShadow: '4px 4px 8px #c1c1c1, -4px -4px 8px #ffffff, 4px 4px 8px rgba(0,0,0,0.2) dark:shadow-[4px_4px_8px_#050505,-4px_-4px_8px_#151515]',
        }}
      >
        <div className="flex items-center justify-center">
            <SendIcon />
        </div>
      </button>
    </form>
  );
};

export default ChatInput;