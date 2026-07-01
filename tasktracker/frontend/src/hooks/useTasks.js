import { useState, useEffect, useCallback } from 'react';
import * as api from '../api/tasks.js';

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    load();
  }, [load]);

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
