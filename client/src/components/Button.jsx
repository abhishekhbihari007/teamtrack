import React from 'react';

// Simple button component
export const Button = ({ children, className = '', type = 'button', onClick, disabled }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 disabled:bg-gray-500 ${className}`}
    >
      {children}
    </button>
  );
};
