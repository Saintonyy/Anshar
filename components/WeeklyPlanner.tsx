import React from 'react';
import { Task, Day } from '../types';
import DayColumn from './DayColumn';
import CloseIcon from './icons/CloseIcon';

interface WeeklyPlannerProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>; // Pass full setter
}

const daysOfWeek: Day[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const WeeklyPlanner: React.FC<WeeklyPlannerProps> = ({ isOpen, onClose, tasks, setTasks }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in">
      <div className="bg-white dark:bg-black rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col p-6 border border-gray-200 dark:border-gray-800">
        <header className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Planificador Semanal</h2>
          <button onClick={onClose} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <CloseIcon />
          </button>
        </header>
        <main className="flex-1 grid grid-cols-1 md:grid-cols-7 gap-4 overflow-y-auto">
          {daysOfWeek.map(day => (
            <DayColumn 
              key={day} 
              day={day} 
              tasks={tasks.filter(t => t.day === day)} 
              setTasks={setTasks} 
            />
          ))}
        </main>
      </div>
    </div>
  );
};

// Add keyframe for animation
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fade-in {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  .animate-fade-in {
    animation: fade-in 0.3s ease-out forwards;
  }
`;
document.head.appendChild(style);

export default WeeklyPlanner;
