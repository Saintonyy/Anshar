// Fix: Implement the TaskItem component to display individual tasks.
import React from 'react';
import { Task, TaskCategory } from '../types';
import TrashIcon from './icons/TrashIcon';
import EditIcon from './icons/EditIcon';
import CheckIcon from './icons/CheckIcon';
import BookIcon from './icons/BookIcon';
import UsersIcon from './icons/UsersIcon';
import BrainIcon from './icons/BrainIcon';

interface TaskItemProps {
  task: Task;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const categoryIcons: Record<TaskCategory, React.ReactNode> = {
  study: <BookIcon />,
  personal: <UsersIcon />,
  work: <UsersIcon />,
  reflection: <BrainIcon />,
};

const categoryColors: Record<TaskCategory, string> = {
  study: 'bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
  personal: 'bg-green-200 dark:bg-green-900 text-green-800 dark:text-green-200',
  work: 'bg-purple-200 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
  reflection: 'bg-yellow-200 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
};


const TaskItem: React.FC<TaskItemProps> = ({ task, setTasks }) => {

  const toggleComplete = () => {
    setTasks(prev => prev.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t));
  };

  const handleDelete = () => {
    setTasks(prev => prev.filter(t => t.id !== task.id));
  };

  const handleEdit = () => {
    const newText = prompt('Edit task:', task.text);
    if (newText && newText.trim()) {
      setTasks(prev => prev.map(t => t.id === task.id ? { ...t, text: newText } : t));
    }
  };

  return (
    <div className={`flex items-start gap-3 p-3 rounded-lg transition-colors duration-200 ${task.completed ? 'bg-gray-100 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
      <button 
        onClick={toggleComplete}
        className={`w-6 h-6 flex-shrink-0 mt-0.5 rounded-md flex items-center justify-center border-2 transition-all duration-300 ${task.completed ? 'bg-[#A2C8C8] border-[#A2C8C8]' : 'border-gray-300 dark:border-gray-600'}`}
      >
        {task.completed && <CheckIcon />}
      </button>
      <div className="flex-1">
        <p className={`text-sm text-gray-800 dark:text-gray-200 ${task.completed ? 'line-through text-gray-500' : ''}`}>
          {task.text}
        </p>
        <div className={`mt-2 inline-flex items-center gap-2 px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[task.category]}`}>
          {categoryIcons[task.category]}
          <span>{task.category.charAt(0).toUpperCase() + task.category.slice(1)}</span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button onClick={handleEdit} className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
          <EditIcon />
        </button>
        <button onClick={handleDelete} className="p-1.5 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
