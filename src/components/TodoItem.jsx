import React from 'react';

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className={`todo-item ${todo.completed ? 'done' : ''}`}>
      <span onClick={onToggle}>{todo.text}</span>
      <button onClick={onDelete}>❌</button>
    </div>
  );
}

export default TodoItem;
