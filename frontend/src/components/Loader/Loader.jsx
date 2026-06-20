import React from 'react';

const Loader = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-5 h-5 border-2',
    medium: 'w-10 h-10 border-4',
    large: 'w-16 h-16 border-4',
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeClasses[size]} border-primary-200 border-t-primary-500 rounded-full animate-spin`}
        role="status"
        aria-label="loading"
      />
    </div>
  );
};

export default Loader;
