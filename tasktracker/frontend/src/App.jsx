import { useState, useMemo, useEffect } from 'react';
import Header from './components/Header.jsx';
import Board from './components/Board.jsx';
import TaskModal from './components/TaskModal.jsx';
import Toast from './components/Toast.jsx';
import AuthScreen from './pages/AuthScreen.jsx';
import { useAuth } from './context/AuthContext.jsx';
import useTasks from './hooks/useTasks.js';

export default function App() {
  const { user, loading: authLoading, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('sprout_theme') === 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('sprout_theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  if (authLoading) {
    return (
      <div className="boot-screen">
        <div className="boot-screen__seed" />
      </div>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  return (
    <TaskBoard user={user} onLogout={logout} darkMode={darkMode} onToggleDark={() => setDarkMode((d) => !d)} />
  );
}

function TaskBoard({ user, onLogout, darkMode, onToggleDark }) {
  const { tasks, loading, error, addTask, editTask, removeTask, moveTask } = useTasks(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filterPriority, setFilterPriority] = useState('all');
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, key: Date.now() });
  };

  const openCreate = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const openEdit = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleSave = async (data) => {
    try {
      if (editingTask) {
        await editTask(editingTask._id, data);
        showToast('Task updated');
      } else {
        await addTask(data);
        showToast('Task planted 🌱');
      }
      setModalOpen(false);
    } catch (err) {
      showToast(err?.response?.data?.error || 'Something went wrong', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await removeTask(id);
      showToast('Task removed');
    } catch (err) {
      showToast('Could not delete task', 'error');
    }
  };

  const handleMove = async (id, status) => {
    await moveTask(id, status);
    if (status === 'done') showToast('Bloomed! 🌸');
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchesPriority = filterPriority === 'all' || t.priority === filterPriority;
      const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
      return matchesPriority && matchesSearch;
    });
  }, [tasks, filterPriority, search]);

  const doneCount = useMemo(() => tasks.filter((t) => t.status === 'done').length, [tasks]);

  return (
    <div className="app">
      <div className="app__bg" aria-hidden="true" />
      <Header
        onAdd={openCreate}
        filterPriority={filterPriority}
        setFilterPriority={setFilterPriority}
        search={search}
        setSearch={setSearch}
        taskCount={tasks.length}
        doneCount={doneCount}
        user={user}
        onLogout={onLogout}
        darkMode={darkMode}
        onToggleDark={onToggleDark}
      />
      <main className="main">
        {error && <div className="banner banner--error">{error}</div>}
        <Board
          tasks={filteredTasks}
          loading={loading}
          onEdit={openEdit}
          onDelete={handleDelete}
          onMove={handleMove}
          onAdd={openCreate}
        />
      </main>
      {modalOpen && (
        <TaskModal task={editingTask} onClose={() => setModalOpen(false)} onSave={handleSave} />
      )}
      {toast && (
        <Toast key={toast.key} message={toast.message} type={toast.type} onDone={() => setToast(null)} />
      )}
    </div>
  );
}