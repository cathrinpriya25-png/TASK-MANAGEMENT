import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';
import taskService from '../../services/taskService.js';
import TaskForm from '../../components/TaskForm/TaskForm.jsx';
import Loader from '../../components/Loader/Loader.jsx';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await taskService.getTaskById(id);
        setTask(data);
      } catch (err) {
        toast.error('Task not found or access denied');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id, navigate]);

  const handleSubmit = async (values) => {
    await taskService.updateTask(id, values);
    toast.success('Task updated successfully');
    navigate('/');
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="p-2 rounded-xl border border-slate-200 dark:border-darkBorder bg-white dark:bg-darkCard text-slate-500 dark:text-slate-405 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200"
          title="Back to Dashboard"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            Edit Task Details
          </h2>
          <p className="text-xs md:text-sm text-slate-555 dark:text-slate-400">
            Update the title, description, or progress status of this task
          </p>
        </div>
      </div>

      {/* Form Container */}
      {loading ? (
        <div className="flex items-center justify-center py-20 bg-white dark:bg-darkCard rounded-3xl border border-slate-200 dark:border-darkBorder shadow-sm">
          <Loader size="large" />
        </div>
      ) : (
        <TaskForm
          initialValues={task}
          onSubmit={handleSubmit}
          submitLabel="Update Task"
          isEdit={true}
        />
      )}
    </div>
  );
};

export default EditTask;
