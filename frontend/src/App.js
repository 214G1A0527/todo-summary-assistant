import React, { useEffect, useState } from 'react';
import './App.css';

const backendURL = "https://todo-summary-assistant-backend.onrender.com";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [message, setMessage] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await fetch(`${backendURL}/todos`);
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    await fetch(`${backendURL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newTodo })
    });
    setNewTodo('');
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await fetch(`${backendURL}/todos/${id}`, { method: 'DELETE' });
    fetchTodos();
  };

  const toggleComplete = async (id) => {
    await fetch(`${backendURL}/todos/${id}/toggle`, { method: 'PATCH' });
    fetchTodos();
  };

  const saveEdit = async (id) => {
    if (!editText.trim()) return;
    await fetch(`${backendURL}/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: editText })
    });
    setEditingTodoId(null);
    setEditText('');
    fetchTodos();
  };

  const summarizeTodos = async () => {
    const res = await fetch(`${backendURL}/summarize`, { method: 'POST' });
    const data = await res.json();
    setMessage(data.message || 'Summary sent!');
  };

  return (
    <div className="app-container">
      <h1>Todo Summary Assistant</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Add new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <div className="todos-section">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`todo-card ${todo.completed ? 'completed' : ''}`}
          >
            {editingTodoId === todo.id ? (
              <>
                <input
                  className="edit-input"
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <div className="todo-controls">
                  <button onClick={() => saveEdit(todo.id)}>Save</button>
                  <button onClick={() => setEditingTodoId(null)}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <h4>{todo.text}</h4>
                <div className="todo-controls">
                  <label>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo.id)}
                    /> Completed
                  </label>
                  <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                  <button onClick={() => {
                    setEditingTodoId(todo.id);
                    setEditText(todo.text);
                  }}>Edit</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <button onClick={summarizeTodos} className="summary-button">
        Generate & Send Summary
      </button>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default App;
