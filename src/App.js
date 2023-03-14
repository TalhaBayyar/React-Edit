import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  const handleAddTodo = (text) => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
  };
  const handleToggleCompleted = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleFilter = (filter) => {
    setFilter(filter);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') {
      return todo.completed;
    }
    if (filter === 'active') {
      return !todo.completed;
    }
    return true;
  });

  const handleClick = (event) => {
    handleFilter(event.target.name);
  };
  return (
    <div>
      <TodoForm onAddTodo={handleAddTodo} />
      
      <button name="all" onClick={handleClick} disabled={filter === 'all'}> All </button>
      <button name="active" onClick={handleClick} disabled={filter === 'active'}> Active </button>
      <button name="completed" onClick={handleClick} disabled={filter === 'completed'}> Completed </button>
      <TodoItems todos={filteredTodos} onToggleCompleted={handleToggleCompleted} />
    </div>
  );
}




function TodoItems({ todos, onToggleCompleted }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <input type="checkbox" checked={todo.completed} onChange={() => onToggleCompleted(todo.id)} />
          <span>
            {todo.text}..
          </span>
         
        </li>
      ))}
    </ul>
  );
}















function TodoForm({ onAddTodo }) {
  const [text, setText] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    if (text.trim()) {
      onAddTodo(text);
      setText('');
    }
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={text} onChange={handleChange} />
      <button type="submit">Add</button>
    </form>
  );
}

export default TodoList;