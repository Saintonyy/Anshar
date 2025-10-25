import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center space-x-3 self-start animate-fade-in-up">
      <div className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-[#222222] rounded-full shadow-md border border-gray-200 dark:border-[#3A3A3A]">
        <div 
          className="w-3 h-3 bg-transparent rounded-full animate-slow-pulse"
        >
          <div className="w-full h-full bg-[#C8A2C8] rounded-full" style={{
               boxShadow: '0 0 8px 2px #C8A2C8'
          }}></div>
        </div>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">Anshar está meditando...</p>
    </div>
  );
};

// Add keyframes for animation in a style tag.
// The fade-in-up animation is already added by MessageBubble and is available globally.
const style = document.createElement('style');
style.innerHTML = `
  @keyframes slow-pulse {
    0%, 100% {
      transform: scale(0.95);
      opacity: 0.8;
    }
    50% {
      transform: scale(1.1);
      opacity: 1;
    }
  }
  .animate-slow-pulse {
    animation: slow-pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
`;
document.head.appendChild(style);


export default TypingIndicator;