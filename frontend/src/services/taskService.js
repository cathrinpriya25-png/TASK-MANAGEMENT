import api from './api.js';

const getTasks = async ({ search = '', status = '', sort = 'desc', page = 1, limit = 5 }) => {
  const response = await api.get('/tasks', {
    params: { search, status, sort, page, limit }
  });
  return response.data;
};

const getTaskById = async (id) => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};

const createTask = async (taskData) => {
  const response = await api.post('/tasks', taskData);
  return response.data;
};

const updateTask = async (id, taskData) => {
  const response = await api.put(`/tasks/${id}`, taskData);
  return response.data;
};

const deleteTask = async (id) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};

const getStats = async () => {
  const response = await api.get('/tasks/stats');
  return response.data;
};

export default {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getStats
};
