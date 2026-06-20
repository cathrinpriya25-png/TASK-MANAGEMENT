import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Trash2, Edit3, CheckCircle, RefreshCw, AlertCircle } from 'lucide-react';

const TaskCard = ({ task, onStatusChange, onDelete }) => {
  const statusConfig = {
    'Pending': {
      bg: 'bg-amber-50 dark:bg-amber-950/20',
      text: 'text-amber-700 dark:text-amber-450',
      border: 'border-amber-200/50 dark:border-amber-900/30',
      bullet: 'bg-amber-500',
      icon: AlertCircle
    },
    'In Progress': {
      bg: 'bg-purple-50 dark:bg-purple-950/20',
      text: 'text-purple-700 dark:text-purple-400',
      border: 'border-purple-200/50 dark:border-purple-900/30',
      bullet: 'bg-purple-500',
      icon: RefreshCw
    },
    'Completed': {
      bg: 'bg-emerald-50 dark:bg-emerald-950/20',
      text: 'text-emerald-700 dark:text-emerald-450',
      border: 'border-emerald-200/50 dark:border-emerald-900/30',
      bullet: 'bg-emerald-500',
      icon: CheckCircle
    }
  };

  const config = statusConfig[task.status] || statusConfig['Pending'];
  const StatusIcon = config.icon;

  const formattedDate = new Date(task.created_at).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="flex flex-col h-full bg-white dark:bg-darkCard border border-slate-200 dark:border-darkBorder rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300">
      {/* Header with status and actions */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${config.bullet}`} />
          <StatusIcon className="w-3.5 h-3.5" />
          {task.status}
        </span>
        <div className="flex items-center gap-1">
          <Link
            to={`/edit-task/${task.id}`}
            className="p-1.5 text-slate-400 hover:text-primary-500 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200"
            title="Edit Task"
          >
            <Edit3 className="w-4 h-4" />
          </Link>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-200"
            title="Delete Task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Title & Description */}
      <div className="flex-grow">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">
          {task.title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3 whitespace-pre-line">
          {task.description}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 mt-auto border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <Calendar className="w-3.5 h-3.5" />
          <span>{formattedDate}</span>
        </div>
        {task.status !== 'Completed' && (
          <button
            onClick={() => onStatusChange(task.id, 'Completed')}
            className="text-xs font-bold text-primary-500 hover:text-primary-600 hover:underline flex items-center gap-1"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            Complete
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
