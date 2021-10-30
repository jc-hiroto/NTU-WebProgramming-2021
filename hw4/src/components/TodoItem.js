import "../App.css"
import x from "../img/x.png"

function TodoItem(props) {
    const todo_title_style = () => {
        if (props.item.completed) {
            return {
                textDecoration: "line-through",
                opacity: "0.5"
            }
        } else {
            return {
                textDecoration: "none",
                opacity: "1"
            }
        }
    }
return (
    <li className="todo-app__item">
        <div className="todo-app__checkbox">
            <input id={props.item.id} type="checkbox" checked={props.item.completed} onChange={() => props.toggleTodo(props.item.id)}/>
            <label for={props.item.id} />
        </div>
        <h1 className="todo-app__item-detail" style={todo_title_style()}>{props.item.title}</h1>
        <img src={x} className="todo-app__item-x" alt="Click to remove this todo." onClick={() => props.removeTodo(props.item.id)}/>
    </li>
);
}

export default TodoItem;