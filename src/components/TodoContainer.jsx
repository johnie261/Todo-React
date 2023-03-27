import { useState } from "react";
import InputTask from "./Input";
import { v4 as uuidv4 } from "uuid";

const TodoContainer = () => {
    const [todos, setTodos] = useState([
        {
          id: uuidv4(),
          title: 'Setup development environment',
          completed: false,
        },
        {
          id: uuidv4(),
          title: 'Develop website and add content',
          completed: false,
        },
        {
          id: uuidv4(),
          title: 'Deploy to live server',
          completed: false,
        },
      ]);

    const handleChange = (id) => {
        setTodos((prev)=> 
            prev.map((todo)=>{
                if(todo.id === id){
                    return {
                        ...todo,
                        completed: !todo.completed,
                    };
                }
                return todo
            })
        )
    }

    const deleteTodo = (id) => {
        setTodos([
            ...todos.filter((todo) => {
                return todo.id !== id
            })
        ])
    }
    const addTodoItem = (title) => {
        // update state with user's input\\
        const newTodo ={
            id:uuidv4(),
            title:title,
            completed:false,
        };
        setTodos([...todos, newTodo])
      };
    return (
        <>
         <InputTask addTodoItem={addTodoItem} />
        <ul>
            {todos.map((todo) => (
                <li key={todo.id} className="task">
                    <input type='checkbox' checked={todo.completed} onChange={() => handleChange(todo.id)} className="checkbox"/>
                    {todo.title}
                    <button onClick={() => deleteTodo(todo.id)} type="button" className="btn">delete</button>
                </li>
            ))}
        </ul>
        </>
    )
}

export default TodoContainer