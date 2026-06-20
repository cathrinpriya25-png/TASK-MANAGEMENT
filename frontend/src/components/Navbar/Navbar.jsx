import React, { useContext } from 'react';
import { Menu, Sun, Moon } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';

const Navbar = ({ setSidebarOpen }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6 lg:px-8 bg-white/80 dark:bg-darkCard/80 border-b border-slate-200 dark:border-darkBorder backdrop-blur-md">
      {/* Mobile Sidebar Trigger */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 -ml-2 rounded-lg lg:hidden hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold md:text-xl text-slate-900 dark:text-white">
          Workspace
        </h1>
      </div>

      {/* Right Side Options */}
      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl border border-slate-200 dark:border-darkBorder bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Quick User Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-darkBorder bg-slate-50 dark:bg-slate-800">
          <div className="w-6 h-6 rounded-full bg-primary-500 text-white font-bold text-xs flex items-center justify-center">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {user?.name?.split(' ')[0]}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
