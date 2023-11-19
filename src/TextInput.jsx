import React from 'react';

const TextInput = ({ value, onChange, placeholder }) => (
  <input
    type="text"
    className="border-white px-4 py-2 border-2 bg-transparent text-white rounded"
    placeholder={placeholder}
    onChange={(e) => onChange(e.target.value)}
    value={value}
  />
);

export default TextInput;
