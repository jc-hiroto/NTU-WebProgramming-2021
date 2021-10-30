import './App.css';
import React, {useState} from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import Footer from './components/Footer';


function TodoApp() {
  const todos_default = [];
  const [todos, setTodos] = useState(todos_default);
  const [filterMode, setFilterMode] = useState("all");
  const addTodo = (title) => {
    const newTodo = {
      id: todos.length,
      title,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };
  const toggleTodo = (id) => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed
        };
      }
      return todo;
    });
    setTodos(newTodos);
  };
  const removeTodo = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  };
  const filter_actions = {
    all: () => {
      setFilterMode("all");
    },
    active: () => {
      setFilterMode("active");
    },
    completed: () => {
      setFilterMode("completed");
    }
  };
  const clearCompleted = () => {
    const newTodos = todos.filter(todo => !todo.completed);
    setTodos(newTodos);
  };
  return (
    <div className="todo-app__root" id="root">
      <header className="todo-app__header">
        <h1 className="todo-app__title">todos</h1>
      </header>
      <section className="todo-app__main">
        <TodoInput addTodo={addTodo} />
        <TodoList todos={todos} toggleTodo={toggleTodo} removeTodo={removeTodo} filter={filterMode}/>
      </section>
      <Footer todos={todos} filterMode={filterMode} filterAction={filter_actions} clearComplete={clearCompleted}/>
    </div>
  );
}

export default TodoApp;
