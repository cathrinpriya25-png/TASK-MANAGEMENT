import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { Search, Filter, SortAsc, SortDesc, Calendar, PlusCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import taskService from '../../services/taskService.js';
import StatisticsCards from '../../components/StatisticsCards/StatisticsCards.jsx';
import TaskCard from '../../components/TaskCard/TaskCard.jsx';
import Pagination from '../../components/Pagination/Pagination.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import EmptyState from '../../components/EmptyState/EmptyState.jsx';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, inProgress: 0, completed: 0 });
  const [loading, setLoading] = useState(true);
  
  // Filters, search, pagination
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modal deletion state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const fetchStats = useCallback(async () => {
    try {
      const data = await taskService.getStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  }, []);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await taskService.getTasks({
        search,
        status: statusFilter,
        sort: sortOrder,
        page: currentPage,
        limit: 6 // Show 6 tasks per page for a beautiful 3-column grid
      });
      setTasks(data.tasks);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, sortOrder, currentPage]);

  // Trigger fetch when parameters change
  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, [fetchTasks, fetchStats]);

  // Handle status update to Completed
  const handleStatusChange = async (id, newStatus) => {
    try {
      const taskToUpdate = tasks.find((t) => t.id === id);
      if (!taskToUpdate) return;

      await taskService.updateTask(id, {
        title: taskToUpdate.title,
        description: taskToUpdate.description,
        status: newStatus
      });

      toast.success(`Task marked as ${newStatus}`);
      fetchTasks();
      fetchStats();
    } catch (error) {
      toast.error('Failed to update task status');
      console.error(error);
    }
  };

  // Open delete confirm modal
  const handleDeleteClick = (id) => {
    setTaskToDelete(id);
    setDeleteModalOpen(true);
  };

  // Execute delete operation
  const handleConfirmDelete = async () => {
    if (!taskToDelete) return;
    try {
      await taskService.deleteTask(taskToDelete);
      toast.success('Task deleted successfully');
      setDeleteModalOpen(false);
      setTaskToDelete(null);
      // Adjust current page if we deleted the last item on the page
      if (tasks.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        fetchTasks();
      }
      fetchStats();
    } catch (error) {
      toast.error('Failed to delete task');
      console.error(error);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Dashboard Stats */}
      <section>
        <StatisticsCards stats={stats} />
      </section>

      {/* Controls: Search, Filter, Sort, Add Button */}
      <section className="bg-white dark:bg-darkCard p-4 md:p-6 rounded-3xl border border-slate-200/60 dark:border-darkBorder shadow-sm space-y-4 md:space-y-0 md:flex md:items-center md:justify-between md:gap-4">
        {/* Left Side: Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 flex-grow max-w-4xl">
          {/* Search bar */}
          <div className="relative flex-grow">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1); // Reset page to 1
              }}
              placeholder="Search tasks by title or description..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-darkBorder bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-450 focus:outline-none focus:ring-2 focus:border-primary-500 focus:ring-primary-500/20 transition-all"
            />
          </div>

          {/* Status filter */}
          <div className="relative min-w-[160px]">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none">
              <Filter className="w-4 h-4" />
            </span>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-darkBorder bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:border-primary-500 focus:ring-primary-500/20 transition-all appearance-none cursor-pointer"
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Sort order */}
          <div className="relative min-w-[160px]">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none">
              {sortOrder === 'desc' ? <SortDesc className="w-4 h-4" /> : <SortAsc className="w-4 h-4" />}
            </span>
            <select
              value={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-darkBorder bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:border-primary-500 focus:ring-primary-500/20 transition-all appearance-none cursor-pointer"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Right Side: Add Task CTA */}
        <div className="flex-shrink-0">
          <Link
            to="/add-task"
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl shadow-lg shadow-primary-500/20 hover:shadow-xl transition-all duration-200 w-full"
          >
            <PlusCircle className="w-5 h-5" />
            Add Task
          </Link>
        </div>
      </section>

      {/* Task List Grid */}
      <section>
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader size="large" />
          </div>
        ) : tasks.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div key={task.id} className="h-full">
                <TaskCard
                  task={task}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDeleteClick}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Pagination Controls */}
      <section>
        {!loading && tasks.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </section>

      {/* Custom Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-darkCard border border-slate-200 dark:border-darkBorder rounded-3xl p-6 max-w-sm w-full shadow-2xl animate-scale-up">
            <div className="flex items-center gap-3 text-red-600 dark:text-red-400 mb-3">
              <div className="p-2 bg-red-50 dark:bg-red-950/20 rounded-xl">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">Delete Task</h3>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              Are you sure you want to delete this task? This action cannot be undone and will permanently remove it from your record.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setDeleteModalOpen(false);
                  setTaskToDelete(null);
                }}
                className="px-4 py-2.5 text-sm font-semibold border border-slate-200 dark:border-darkBorder bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2.5 text-sm font-semibold bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all duration-200 shadow-md shadow-red-650/10"
              >
                Delete Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
