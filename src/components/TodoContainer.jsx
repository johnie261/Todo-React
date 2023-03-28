import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaTrash } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';
import InputTask from './Input';

const TodoContainer = () => {
  const initialTodos = () => {
    const getTodos = JSON.parse(localStorage.getItem('todos'));
    return getTodos || [];
  };

  const [todos, setTodos] = useState(initialTodos());
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  // a function for marking a task done or unmarking a task

  const handleChange = (id) => {
    setTodos((prev) => prev.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    }));
  };

  const handleEditing = () => {
    setEditing(todos);
    /*   todos.map((todo) => {
   console.log(todo.id)
  })
  console.log(editing)
  for(let i=0;i<todos.length;i++){
    console.log(todos[0].id)
    if(todos[i].id === id){
        return setEditing(todos[i])
    }
    return setEditing(null)
  }
  console.log(editing)
  */
  };
  // function to delete an item
  const deleteTodo = (id) => {
    setTodos([
      ...todos.filter((todo) => todo.id !== id),
    ]);
  };
  // Add a new item
  const addTodoItem = (title) => {
    const newTodo = {
      id: uuidv4(),
      title,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const setUpdate = (updatedTitle, id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.title = updatedTitle;
        }
        return todo;
      }),
    );
  };

  const handleUpdate = (e) => {
    if (e.key === 'Enter') {
      setEditing(false);
    }
  };

  const completedStyle = {
    fontStyle: 'italic',
    color: '#595959',
    opacity: 0.4,
    textDecoration: 'line-through',
  };

  const viewTask = {};
  const editTask = {};

  if (editing) {
    viewTask.display = 'none';
  } else {
    editTask.display = 'none';
  }

  return (
    <>
      <InputTask addTodoItem={addTodoItem} />
      <ul>

        {todos.map((todo) => (
          <li key={todo.id} className="task">
            <div style={viewTask}>
              <input type="checkbox" checked={todo.completed} onChange={() => handleChange(todo.id)} className="checkbox" />
              <span style={todo.completed ? completedStyle : null}>{todo.title}</span>
              <button onClick={() => deleteTodo(todo.id)} type="button" className="btn">
                {' '}
                <FaTrash />
                {' '}
              </button>
              <button type="button" className="btn" onClick={() => handleEditing(todo.id)}>
                {' '}
                <AiFillEdit />
                {' '}
              </button>
            </div>
            <input type="text" value={todo.title} className="textInput" style={editTask} onChange={(e) => setUpdate(e.target.value, todo.id)} onKeyDown={handleUpdate} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoContainer;
