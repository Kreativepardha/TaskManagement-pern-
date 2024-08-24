
import create from 'zustand';
import { Task } from '../types/task';
import axios from 'axios';
import {  TASK_URL } from '../config/api';

interface TaskState {
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  addTask: (task: Task) => void;
  updateTask: (updatedTask: Task) => void;
  deleteTask: (taskId: number) => void;
  setTasks: (tasks: Task[]) => void;
  getTaskById: (taskId: number) => Promise<Task | undefined>;
}

const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),

  fetchTasks: async () => {
    try {
      const res = await axios.get(`${TASK_URL}`, {
        headers: {
          Authorization: localStorage.getItem('token') || '',
        },
      });
      set({  tasks: res.data })
    } catch (err) {
      console.error(`failed to fetch tasks`, err)
    }
  },  

  addTask: async (task) =>{
    try {
        const res = await axios.post(`${TASK_URL}`, task ,{
            headers: {
              Authorization: localStorage.getItem("token") || "",
            },
        }
      );
      set((state) => ({
        tasks: [...state.tasks, res.data.task],
      }));
    } catch (err) {
      console.error('Failed to add task', err);
    }
  },
  
    updateTask: async (updatedTask) => {
      try {
        const res = await axios.put(
          `${TASK_URL}/${updatedTask.id}`,
          updatedTask,
          {
            headers: {
              Authorization: localStorage.getItem('token') || '',
            },
          }
        );
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === updatedTask.id ? res.data.task : task
          ),
        }));
      } catch (error) {
        console.error('Failed to update task', error);
      }
    },
  
    deleteTask: async (taskId) => {
      try {
        await axios.delete(`${TASK_URL}/${taskId}`, {
          headers: {
            Authorization: localStorage.getItem('token') || '',
          },
        });
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        }));
      } catch (error) {
        console.error('Failed to delete task', error);
      }
    },

  getTaskById: async (taskId) => {
    try {
      const res = await axios.get(`${TASK_URL}/${taskId}`, {
        headers: {
          Authorization: localStorage.getItem('token') || '',
        },
      });
      return res.data;  
    } catch (error) {
      console.error('Failed to fetch task by ID', error);
      return undefined;  
    }
  }
}));







export default useTaskStore;
