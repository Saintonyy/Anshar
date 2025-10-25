// Fix: Implement the main application component, state management, and chat logic.
import React, { useState, useEffect, useRef } from 'react';
import { Message, Task, Day, TaskCategory } from './types';
import { getChat } from './services/ansharService';
import MessageBubble from './components/MessageBubble';
import ChatInput from './components/ChatInput';
import TypingIndicator from './components/TypingIndicator';
import ThemeToggle from './components/ThemeToggle';
import WeeklyPlanner from './components/WeeklyPlanner';
import PlannerIcon from './components/icons/PlannerIcon';

type Theme = 'light' | 'dark';

function App() {
  const [theme, setTheme] = useState<Theme>('light');
  const [messages, setMessages] = useState<Message[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [showPlannerGlow, setShowPlannerGlow] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Load state from localStorage
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      if (savedTheme) setTheme(savedTheme);

      const savedMessages = localStorage.getItem('messages');
      if (savedMessages) setMessages(JSON.parse(savedMessages));
      
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) setTasks(JSON.parse(savedTasks));
    } catch (error) {
      console.error("Failed to load from localStorage", error);
    }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);
  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Apply theme to body
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Scroll to bottom of chat
  useEffect(() => {
    chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isLoading]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = { id: Date.now().toString(), text, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    const chat = getChat();
    let ansharResponseText = '';
    const ansharMessageId = (Date.now() + 1).toString();
    let functionToCall: any = null;

    try {
      const stream = await chat.sendMessageStream({ message: text });
      
      let ansharMessageExists = false;

      for await (const chunk of stream) {
        if (chunk.text) {
          ansharResponseText += chunk.text;
          if (!ansharMessageExists) {
            setMessages(prev => [...prev, { id: ansharMessageId, text: ansharResponseText, sender: 'anshar' }]);
            ansharMessageExists = true;
          } else {
            setMessages(prev => prev.map(m => m.id === ansharMessageId ? { ...m, text: ansharResponseText } : m));
          }
        }
        if (chunk.functionCalls && chunk.functionCalls.length > 0) {
          functionToCall = chunk.functionCalls[0];
        }
      }

      if (functionToCall?.name === 'create_task') {
        const { day, task_description, category } = functionToCall.args;
        if (day && task_description && category) {
          const newTask: Task = {
            id: Date.now().toString(),
            text: task_description,
            day: day as Day,
            completed: false,
            category: category as TaskCategory,
          };
          setTasks(prev => [...prev, newTask]);
          setShowPlannerGlow(true);
          setTimeout(() => setShowPlannerGlow(false), 2000);

          const functionResponseStream = await chat.sendMessageStream({
            functionResponse: {
              name: 'create_task',
              response: { result: `Task "${task_description}" for ${day} created.` },
            },
          });

          for await (const chunk of functionResponseStream) {
            if (chunk.text) {
              ansharResponseText += chunk.text;
              setMessages(prev => prev.map(m => m.id === ansharMessageId ? { ...m, text: ansharResponseText } : m));
            }
          }
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: ansharMessageId,
        text: "Lo siento, ha ocurrido un error. Por favor, intenta de nuevo.",
        sender: 'anshar',
      };
      setMessages(prev => prev.some(m => m.id === ansharMessageId) 
        ? prev.map(m => m.id === ansharMessageId ? errorMessage : m) 
        : [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex flex-col h-screen font-sans bg-gray-100 dark:bg-black transition-colors duration-500`}>
      <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800/50">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-[#222222] rounded-full shadow-md border border-gray-200 dark:border-[#3A3A3A]">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#C8A2C8] to-[#A2C8C8]"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">Anshar</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Tu guía digital</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
            <button
                onClick={() => setIsPlannerOpen(true)}
                className="relative p-3 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
                <PlannerIcon glow={showPlannerGlow} />
            </button>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </header>

      <main ref={chatContainerRef} className="flex-1 p-4 md:p-6 space-y-6 overflow-y-auto">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isLoading && <TypingIndicator />}
      </main>

      <footer className="p-4 md:p-6 bg-gray-100 dark:bg-black border-t border-gray-200 dark:border-gray-800/50">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </footer>

      <WeeklyPlanner 
        isOpen={isPlannerOpen}
        onClose={() => setIsPlannerOpen(false)}
        tasks={tasks}
        setTasks={setTasks}
      />
    </div>
  );
}

export default App;
