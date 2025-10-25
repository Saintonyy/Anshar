
import React from 'react';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';

type Theme = 'light' | 'dark';

interface ThemeToggleProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 focus:ring-[#C8A2C8] transition-all duration-300"
      style={{
        boxShadow: '3px 3px 6px #d0d0d0, -3px -3px 6px #ffffff, dark:shadow-[3px_3px_6px_#080808,_-3px_-3px_6px_#121212]'
      }}
    >
      <span className="sr-only">Toggle theme</span>
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};

export default ThemeToggle;
