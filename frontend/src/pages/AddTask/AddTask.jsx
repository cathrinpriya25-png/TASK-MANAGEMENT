import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import taskService from '../../services/taskService.js';
import TaskForm from '../../components/TaskForm/TaskForm.jsx';

const AddTask = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    await taskService.createTask(values);
    toast.success('Task created successfully');
    navigate('/');
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="p-2 rounded-xl border border-slate-200 dark:border-darkBorder bg-white dark:bg-darkCard text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200"
          title="Back to Dashboard"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            Create New Task
          </h2>
          <p className="text-xs md:text-sm text-slate-555 dark:text-slate-400">
            Add a new task to your personal workspace board
          </p>
        </div>
      </div>

      {/* Form Container */}
      <TaskForm onSubmit={handleSubmit} submitLabel="Create Task" />
    </div>
  );
};

export default AddTask;
