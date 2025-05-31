import React, { useState } from 'react';
import './styles.css';

function App() {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');  // <-- new state for error

  const [deletingIndex, setDeletingIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTask = newTask.trim();
    if (!trimmedTask) {
      setError('Bitch type please 😭😭😭');
      return;
    }
    setTasks([...tasks, trimmedTask]);
    setNewTask('');
    setError(''); // clear error on successful add
  };

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
    if (error) setError(''); // clear error when user types
  };

  // ... other handlers (delete, edit) remain unchanged ...

  const handleDelete = (index) => {
    setDeletingIndex(index);
    setTimeout(() => {
      setTasks(tasks.filter((_, i) => i !== index));
      setDeletingIndex(null);
      if (editingIndex === index) {
        setEditingIndex(null);
        setEditingText('');
      }
    }, 300);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingText(tasks[index]);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditingText('');
  };

  const saveEdit = (index) => {
    const trimmedText = editingText.trim();
    if (trimmedText) {
      const updatedTasks = [...tasks];
      updatedTasks[index] = trimmedText;
      setTasks(updatedTasks);
      setEditingIndex(null);
      setEditingText('');
    }
  };

  return (
    <div className="container">
      <h1>My To-Do List</h1>

      <form onSubmit={handleSubmit} className="form-vertical">
        <input
          type="text"
          placeholder="Add a new task"
          className="input"
          value={newTask}
          onChange={handleInputChange}
        />
        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="button">
          Add
        </button>
      </form>

      <ul className="task-list">
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`task-item ${deletingIndex === index ? 'fade-out' : ''}`}
          >
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  className="edit-input"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') saveEdit(index);
                    if (e.key === 'Escape') cancelEdit();
                  }}
                  autoFocus
                />
                <div className="edit-buttons">
                  <button
                    className="button save-btn"
                    onClick={() => saveEdit(index)}
                    type="button"
                  >
                    Save
                  </button>
                  <button
                    className="button cancel-btn"
                    onClick={cancelEdit}
                    type="button"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <span>{task}</span>
                <div className="task-actions">
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(index)}
                    aria-label={`Edit task: ${task}`}
                    type="button"
                  >
                    ✏️
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(index)}
                    aria-label={`Delete task: ${task}`}
                    type="button"
                  >
                    &times;
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
