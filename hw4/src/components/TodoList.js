import "../App.css"
import TodoItem from "./TodoItem"

function TodoList(props) {
    function displayTodos(){
        if (props.filter === "all") {
            return props.todos
        } else if (props.filter === "active") {
            return props.todos.filter(todo => !todo.completed)
        } else if (props.filter === "completed") {
            return props.todos.filter(todo => todo.completed)
        }
    }
    if (props.todos.length > 0) {
        return (
            <ul className="todo-app__list" id="todo-list">
                {displayTodos().map((todo) => {
                    return (
                        <TodoItem item={todo} toggleTodo={props.toggleTodo} removeTodo={props.removeTodo} />
                    )
                }
                )}
            </ul>
        )
    }else{
        return (
            <div />
        )
    }
}

export default TodoList    
