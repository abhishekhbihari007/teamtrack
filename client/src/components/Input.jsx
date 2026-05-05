import React from 'react';

// Basic Input component
export const Input = ({ label, type = 'text', value, onChange, placeholder, required, className = '' }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-gray-300 text-sm font-bold mb-2">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full p-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500 ${className}`}
      />
    </div>
  );
};

// Basic Textarea component
export const Textarea = ({ label, value, onChange, placeholder, className = '' }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-gray-300 text-sm font-bold mb-2">{label}</label>}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500 h-24 ${className}`}
      />
    </div>
  );
};

// Basic Select component
export const Select = ({ label, value, onChange, children, className = '' }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-gray-300 text-sm font-bold mb-2">{label}</label>}
      <select
        value={value}
        onChange={onChange}
        className={`w-full p-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500 ${className}`}
      >
        {children}
      </select>
    </div>
  );
};
