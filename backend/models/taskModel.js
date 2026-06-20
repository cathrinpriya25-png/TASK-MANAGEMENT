import db from '../config/db.js';

export const create = async ({ title, description, status, user_id }) => {
  const [result] = await db.query(
    'INSERT INTO tasks (title, description, status, user_id) VALUES (?, ?, ?, ?)',
    [title, description, status, user_id]
  );
  return result.insertId;
};

export const findById = async (id, userId) => {
  const [rows] = await db.query(
    'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
    [id, userId]
  );
  return rows[0];
};

export const update = async (id, userId, { title, description, status }) => {
  await db.query(
    'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ? AND user_id = ?',
    [title, description, status, id, userId]
  );
  return findById(id, userId);
};

export const remove = async (id, userId) => {
  const [result] = await db.query(
    'DELETE FROM tasks WHERE id = ? AND user_id = ?',
    [id, userId]
  );
  return result.affectedRows > 0;
};

export const getAll = async (userId, { search = '', status = '', sort = 'desc', page = 1, limit = 5 }) => {
  let query = 'SELECT * FROM tasks WHERE user_id = ?';
  let countQuery = 'SELECT COUNT(*) as total FROM tasks WHERE user_id = ?';
  const params = [userId];
  const countParams = [userId];

  if (search) {
    const searchPattern = `%${search}%`;
    query += ' AND (title LIKE ? OR description LIKE ?)';
    countQuery += ' AND (title LIKE ? OR description LIKE ?)';
    params.push(searchPattern, searchPattern);
    countParams.push(searchPattern, searchPattern);
  }

  if (status) {
    query += ' AND status = ?';
    countQuery += ' AND status = ?';
    params.push(status);
    countParams.push(status);
  }

  // Sort
  const sortDirection = sort.toLowerCase() === 'asc' ? 'ASC' : 'DESC';
  query += ` ORDER BY created_at ${sortDirection}`;

  // Pagination (limit and offset must be numbers, mysql2 queries with positional parameters handle them if passed as numbers)
  const limitVal = parseInt(limit, 10);
  const pageVal = parseInt(page, 10);
  const offsetVal = (pageVal - 1) * limitVal;
  
  query += ' LIMIT ? OFFSET ?';
  params.push(limitVal, offsetVal);

  const [countRows] = await db.query(countQuery, countParams);
  const total = countRows[0].total;

  const [rows] = await db.query(query, params);

  return {
    tasks: rows,
    total,
    page: pageVal,
    limit: limitVal,
    totalPages: Math.ceil(total / limitVal)
  };
};

export const getStatistics = async (userId) => {
  const [rows] = await db.query(
    `SELECT 
      COUNT(*) as total,
      SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) as pending,
      SUM(CASE WHEN status = 'In Progress' THEN 1 ELSE 0 END) as inProgress,
      SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) as completed
     FROM tasks WHERE user_id = ?`,
    [userId]
  );
  
  const stats = rows[0];
  return {
    total: parseInt(stats.total || 0, 10),
    pending: parseInt(stats.pending || 0, 10),
    inProgress: parseInt(stats.inProgress || 0, 10),
    completed: parseInt(stats.completed || 0, 10)
  };
};
