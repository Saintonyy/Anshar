// Fix: Define the types used throughout the application.
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'anshar';
}

export type Day = 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo';

export type TaskCategory = 'study' | 'personal' | 'work' | 'reflection';

export interface Task {
  id: string;
  text: string;
  day: Day;
  completed: boolean;
  category: TaskCategory;
}
