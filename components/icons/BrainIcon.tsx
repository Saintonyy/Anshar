
import React from 'react';

const BrainIcon: React.FC = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-4 w-4" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth={2}
    >
        <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M9.5 13a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM12 11.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" 
        />
        <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M4.5 12.5a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0z" 
        />
        <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M12 4.5a3 3 0 013 3m-3-3a3 3 0 00-3 3m3 12a3 3 0 01-3-3m3 3a3 3 0 003-3m-9 3a3 3 0 010-6"
        />
    </svg>
);

export default BrainIcon;
