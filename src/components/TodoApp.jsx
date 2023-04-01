import React, { useState, useRef, useEffect } from "react";
import "./todoApp.css";

const todosFromLS = () => {
  return localStorage.getItem("todolist")
    ? JSON.parse(localStorage.getItem("todolist"))
    : [];
};

const TodoApp = () => {
  const [inpVal, setInpVal] = useState("");
  const [todos, setTodos] = useState([]);

  const useref = useRef();
  const todoListRef = useRef();

  const handleOnchange = (e) => {
    let value = e.target.value;
    setInpVal(value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    let todo = {
      todo: inpVal,
      id: Math.floor(Math.random() * 10000000),
    };
    setTodos((oldTodos) => {
      return [...oldTodos, todo];
    });

    let todos = todosFromLS();
    todos.push(todo);
    localStorage.setItem("todolist", JSON.stringify(todos));
    useref.current.value = "";
  };

  const handleDeleting = (e) => {
    let todo = e.target.parentElement;

    let todos = todosFromLS();
    todos = Array.from(todos).filter((Todo) => {
      return Todo.id != todo.id;
    });
    localStorage.setItem("todolist", JSON.stringify(todos));
    todoListRef.current.removeChild(todo);
  };

  useEffect(() => {
    let newTodos = todosFromLS();
    setTodos(todosFromLS());
  }, []);

  return (
    <div className="todo-app-container">
      <h1>Todo app</h1>
      <div className="todo-app">
        <div className="todo-app-top">
          <form onSubmit={handleSubmit}>
            <input
              id="input"
              type="text"
              placeholder="Write your todo here..."
              onChange={handleOnchange}
              ref={useref}
            />
            <button id="add-btn" type="submit">
              Add
            </button>
          </form>
        </div>
        <div className="todo-app-bottom">
          <ul id="todo-list" ref={todoListRef}>
            {Array.from(todos).map((todo, i) => {
              return (
                <li className="todo" key={i} id={todo.id}>
                  <span>{todo.todo}</span>
                  <button id="delete-btn" onClick={handleDeleting}>
                    delete
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
