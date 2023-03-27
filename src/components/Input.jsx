import { useState } from 'react';
/* eslint-disable react/prop-types */
const InputTask = ({ addTodoItem }) => {
  const [task, setTask] = useState('');
  const [message, setMessage] = useState('');
  const handleChange = (e) => {
    setTask(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      addTodoItem(task);
      setTask('');
      setMessage('');
    } else {
      setMessage('Please add a task.');
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="form-container">
        <input type="text" value={task} onChange={handleChange} placeholder="Add todo.." className="input" />
      </form>
      <span className="warning">{message}</span>
    </>
  );
};

export default InputTask;
