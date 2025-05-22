import React, { useState } from 'react';

const TodoForm = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Enter a task"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ padding: '0.5rem', width: '70%' }}
      />
      <button type="submit" style={{ padding: '0.5rem', marginLeft: '0.5rem' }}>
        Add
      </button>
    </form>
  );
};

export default TodoForm;