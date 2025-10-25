// Fix: Implement the DayColumn component for the weekly planner.
import React from 'react';
import { Day, Task } from '../types';
import TaskItem from './TaskItem';
import PlusIcon from './icons/PlusIcon';

interface DayColumnProps {
  day: Day;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const DayColumn: React.FC<DayColumnProps> = ({ day, tasks, setTasks }) => {
  const handleAddTask = () => {
    const text = prompt('Enter new task for ' + day);
    if (text && text.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        text,
        day,
        completed: false,
        category: 'personal', // Default category
      };
      setTasks(prev => [...prev, newTask]);
    }
  };

  return (
    <div className="bg-gray-100/50 dark:bg-gray-900/50 rounded-xl p-4 flex flex-col h-full">
      <h3 className="font-bold text-center text-gray-700 dark:text-gray-300 mb-4">{day}</h3>
      <div className="flex-1 space-y-3 overflow-y-auto pr-1">
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} setTasks={setTasks} />
        ))}
      </div>
      <button 
        onClick={handleAddTask}
        className="mt-4 w-full flex items-center justify-center gap-2 p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
      >
        <PlusIcon />
        <span className="text-sm">Añadir Tarea</span>
      </button>
    </div>
  );
};

export default DayColumn;
