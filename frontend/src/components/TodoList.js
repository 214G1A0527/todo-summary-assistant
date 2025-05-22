import React from 'react';

const TodoList = ({ todos, onDelete }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo._id} style={{ marginBottom: '0.5rem' }}>
          {todo.text}
          <button onClick={() => onDelete(todo._id)} style={{ marginLeft: '1rem' }}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;