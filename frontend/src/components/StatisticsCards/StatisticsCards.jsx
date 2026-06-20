import React from 'react';
import { Layers, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react';

const StatisticsCards = ({ stats = { total: 0, pending: 0, inProgress: 0, completed: 0 } }) => {
  const cards = [
    {
      title: 'Total Tasks',
      value: stats.total,
      icon: Layers,
      colorClass: 'text-primary-500 dark:text-primary-400',
      bgClass: 'bg-primary-50 dark:bg-primary-950/20 border-primary-100 dark:border-primary-900/30'
    },
    {
      title: 'Pending Tasks',
      value: stats.pending,
      icon: AlertCircle,
      colorClass: 'text-amber-500 dark:text-amber-400',
      bgClass: 'bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/30'
    },
    {
      title: 'In Progress Tasks',
      value: stats.inProgress,
      icon: RefreshCw,
      colorClass: 'text-purple-500 dark:text-purple-400',
      bgClass: 'bg-purple-50 dark:bg-purple-950/20 border-purple-100 dark:border-purple-900/30'
    },
    {
      title: 'Completed Tasks',
      value: stats.completed,
      icon: CheckCircle2,
      colorClass: 'text-emerald-500 dark:text-emerald-400',
      bgClass: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/30'
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className={`flex items-center justify-between p-5 rounded-2xl border transition-all duration-350 hover:-translate-y-1 hover:shadow-md ${card.bgClass}`}
          >
            <div>
              <p className="text-sm font-semibold tracking-wide uppercase text-slate-500 dark:text-slate-400">
                {card.title}
              </p>
              <h4 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {card.value}
              </h4>
            </div>
            <div className={`p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 ${card.colorClass}`}>
              <Icon className="w-6 h-6" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatisticsCards;
