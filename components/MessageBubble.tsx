import React from 'react';
import { Message } from '../types';
import Markdown from 'react-markdown';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex items-start gap-4 animate-fade-in-up ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-gray-100 dark:bg-[#222222] rounded-full shadow-md border border-gray-200 dark:border-[#3A3A3A]">
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#C8A2C8] to-[#A2C8C8]"></div>
        </div>
      )}
      <div
        className={`max-w-md lg:max-w-lg px-5 py-3 rounded-2xl ${
          isUser
            ? 'bg-gradient-to-br from-[#C8A2C8] to-[#A2C8C8] text-white shadow-lg'
            : 'bg-white dark:bg-[#222222] text-gray-800 dark:text-gray-200 shadow-md'
        }`}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-2">
            <Markdown>{message.text}</Markdown>
        </div>
      </div>
    </div>
  );
};


// Add keyframes for animation in a style tag.
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fade-in-up {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-in-up {
    animation: fade-in-up 0.5s ease-out forwards;
  }
`;
document.head.appendChild(style);


export default MessageBubble;
