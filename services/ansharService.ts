// Fix: Implement the Gemini service for chat and function calling.
import { GoogleGenAI, Chat, Type, FunctionDeclaration } from '@google/genai';
import { SYSTEM_INSTRUCTION } from '../constants';

// Per guidelines, the API key is in process.env.API_KEY and its existence is assumed.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const createTaskFunctionDeclaration: FunctionDeclaration = {
  name: 'create_task',
  description: 'Crea una nueva tarea y la añade al planificador semanal del usuario.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      day: {
        type: Type.STRING,
        description: 'El día de la semana para la tarea. Debe ser uno de: Lunes, Martes, Miércoles, Jueves, Viernes, Sábado, Domingo.',
        enum: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
      },
      task_description: {
        type: Type.STRING,
        description: 'Una descripción concisa de la tarea a realizar.',
      },
      category: {
        type: Type.STRING,
        description: 'La categoría de la tarea. Debe ser una de: study, personal, work, reflection.',
        enum: ['study', 'personal', 'work', 'reflection'],
      },
    },
    required: ['day', 'task_description', 'category'],
  },
};

let chat: Chat | null = null;

export const getChat = (): Chat => {
  if (!chat) {
    chat = ai.chats.create({
      model: 'gemini-2.5-pro',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ functionDeclarations: [createTaskFunctionDeclaration] }],
      },
      history: [],
    });
  }
  return chat;
};
