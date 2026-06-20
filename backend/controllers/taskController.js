import * as TaskModel from '../models/taskModel.js';

export const createTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    const userId = req.user.id;

    const taskId = await TaskModel.create({
      title,
      description,
      status: status || 'Pending',
      user_id: userId
    });

    res.status(201).json({
      message: 'Task created successfully',
      taskId
    });
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { search = '', status = '', sort = 'desc', page = 1, limit = 5 } = req.query;

    const result = await TaskModel.getAll(userId, {
      search,
      status,
      sort,
      page,
      limit
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const task = await TaskModel.findById(id, userId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { title, description, status } = req.body;

    const existingTask = await TaskModel.findById(id, userId);
    if (!existingTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const updatedTask = await TaskModel.update(id, userId, {
      title,
      description,
      status
    });

    res.json({
      message: 'Task updated successfully',
      task: updatedTask
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const existingTask = await TaskModel.findById(id, userId);
    if (!existingTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await TaskModel.remove(id, userId);

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const getStats = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const stats = await TaskModel.getStatistics(userId);
    res.json(stats);
  } catch (error) {
    next(error);
  }
};
