import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const client = axios.create({ baseURL: API_URL });

export const register = (name, email, password) =>
  client.post('/auth/register', { name, email, password }).then((r) => r.data);

export const login = (email, password) =>
  client.post('/auth/login', { email, password }).then((r) => r.data);

export const getMe = (token) =>
  client.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.data);