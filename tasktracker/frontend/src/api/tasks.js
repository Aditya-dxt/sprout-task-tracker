import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const client = axios.create({ baseURL: API_URL });

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('sprout_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchTasks = () => client.get('/tasks').then((res) => res.data);
export const createTask = (task) => client.post('/tasks', task).then((res) => res.data);
export const updateTask = (id, updates) =>
  client.put(`/tasks/${id}`, updates).then((res) => res.data);
export const deleteTask = (id) => client.delete(`/tasks/${id}`).then((res) => res.data);