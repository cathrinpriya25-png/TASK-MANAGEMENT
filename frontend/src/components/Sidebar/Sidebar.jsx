import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, LogOut, CheckSquare, X } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext.jsx';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { logout, user } = useContext(AuthContext);

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Add Task', path: '/add-task', icon: PlusCircle },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-white dark:bg-darkCard border-r border-slate-200 dark:border-darkBorder transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200 dark:border-darkBorder">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-primary-500" />
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              TaskPortal
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg lg:hidden hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-slate-200 dark:border-darkBorder">
          <div className="flex items-center gap-3 px-3 py-2 mb-3">
            <div className="flex items-center justify-center w-10 h-10 font-semibold text-white rounded-full bg-primary-500 shrink-0">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate text-slate-900 dark:text-white">
                {user?.name || 'User'}
              </p>
              <p className="text-xs truncate text-slate-500 dark:text-slate-400">
                {user?.email || 'user@example.com'}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center justify-center w-full gap-2 px-4 py-2.5 text-sm font-medium text-red-600 hover:text-white border border-red-200 dark:border-red-900 hover:bg-red-600 rounded-xl transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
