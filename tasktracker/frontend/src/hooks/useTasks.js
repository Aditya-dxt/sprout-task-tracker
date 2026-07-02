import { useState, useEffect, useCallback } from 'react';
import * as api from '../api/tasks.js';
import { getSocket } from '../api/socket.js';

export default function useTasks(enabled) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!enabled) return;
    setLoading(true);
    try {
      const data = await api.fetchTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Could not reach the server. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!enabled) return;
    const socket = getSocket();
    if (!socket) return;

    const onCreated = (task) =>
      setTasks((prev) => (prev.some((t) => t._id === task._id) ? prev : [task, ...prev]));
    const onUpdated = (task) => setTasks((prev) => prev.map((t) => (t._id === task._id ? task : t)));
    const onDeleted = ({ id }) => setTasks((prev) => prev.filter((t) => t._id !== id));

    socket.on('task:created', onCreated);
    socket.on('task:updated', onUpdated);
    socket.on('task:deleted', onDeleted);

    return () => {
      socket.off('task:created', onCreated);
      socket.off('task:updated', onUpdated);
      socket.off('task:deleted', onDeleted);
    };
  }, [enabled]);

  const addTask = async (task) => {
    const created = await api.createTask(task);
    setTasks((prev) => [created, ...prev]);
    return created;
  };

  const editTask = async (id, updates) => {
    const updated = await api.updateTask(id, updates);
    setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    return updated;
  };

  const removeTask = async (id) => {
    await api.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  const moveTask = async (id, status) => {
    setTasks((prev) => prev.map((t) => (t._id === id ? { ...t, status } : t)));
    try {
      await api.updateTask(id, { status });
    } catch (err) {
      load();
    }
  };

  return { tasks, loading, error, addTask, editTask, removeTask, moveTask, reload: load };
}