import React, { useState } from 'react';
import './styles.css';

function App() {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);

  // For tracking which task is currently deleting (for animation)
  const [deletingIndex, setDeletingIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTask = newTask.trim();
    if (trimmedTask) {
      setTasks([...tasks, trimmedTask]);
      setNewTask('');
    }
  };

  const handleDelete = (index) => {
    setDeletingIndex(index);
    // Wait for animation duration before removing task
    setTimeout(() => {
      setTasks(tasks.filter((_, i) => i !== index));
      setDeletingIndex(null);
    }, 300); // animation duration in ms
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
          onChange={(e) => setNewTask(e.target.value)}
        />
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
            <span>{task}</span>
            <button
              className="delete-button"
              onClick={() => handleDelete(index)}
              aria-label={`Delete task: ${task}`}
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
