import React from 'react';

const Button = ({ onClick, disabled, children }) => (
  <button className={`bg-blue-500 px-6 py-3 hover:bg-blue-600 transition-all rounded-full text-white font-semibold disabled:opacity-50`} onClick={onClick} disabled={disabled}>
    {children}
  </button>
);

export default Button;
