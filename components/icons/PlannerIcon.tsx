import React from 'react';

interface PlannerIconProps {
  glow?: boolean;
}

const PlannerIcon: React.FC<PlannerIconProps> = ({ glow }) => (
  <div className="relative">
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="h-6 w-6" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor" 
      strokeWidth={2}
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
      />
    </svg>
    {glow && (
       <div className="absolute -inset-2 rounded-full bg-[#C8A2C8]/50 animate-glow-pulse" />
    )}
  </div>
);

// Add keyframes for animation
const style = document.createElement('style');
style.innerHTML = `
  @keyframes glow-pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 0;
    }
    50% {
      transform: scale(1.5);
      opacity: 1;
    }
    75% {
        transform: scale(1.2);
        opacity: 0;
    }
  }
  .animate-glow-pulse {
    animation: glow-pulse 1.5s ease-out forwards;
  }
`;
document.head.appendChild(style);


export default PlannerIcon;
