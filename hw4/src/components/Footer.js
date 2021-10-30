import "../App.css"
import FilterBtn from "./FilterBtn"

function Footer(props) {
    const active_todos = props.todos.filter(todo => !todo.completed).length
    const completed_todos = props.todos.filter(todo => todo.completed).length
    const clear_completed_style = () => {
        if(completed_todos > 0) {
            return {
                visibility: "visible"
            }
        }
        return {
            visibility: "hidden"
        }
    }
    if(props.todos.length > 0) {
        return (
            <footer className="todo-app__footer" id="todo-footer">
                <div className="todo-app__total">{active_todos} left</div>
                <FilterBtn filterMode={props.filterMode} filterAction={props.filterAction} />
                <div className="todo-app__clean" style={clear_completed_style()}>
                    <button onClick={props.clearComplete}>Clear completed</button>
                </div>
            </footer>
        )
    }else{
        return (<div />);
    }
}

export default Footer
