import React from 'react';
import { ClipboardList } from 'lucide-react';

const EmptyState = ({ 
  message = 'No tasks found', 
  submessage = 'Try adjusting your search/filter parameters or create a new task.' 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white dark:bg-darkCard rounded-3xl border border-slate-200/60 dark:border-darkBorder shadow-sm">
      <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-full text-slate-400 dark:text-slate-500 mb-4">
        <ClipboardList className="w-12 h-12" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
        {message}
      </h3>
      <p className="text-sm text-slate-555 dark:text-slate-400 max-w-md">
        {submessage}
      </p>
    </div>
  );
};

export default EmptyState;
