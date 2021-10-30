import "../App.css"

function TodoInput(props) {
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && e.target.value !== '') {
            console.log(e.target.value);
            props.addTodo(e.target.value);
            e.target.value = '';
        }
    }
    return (
        <input className="todo-app__input" type="text" placeholder="What needs to be done?" onKeyPress={handleKeyPress} />
    )
}

export default TodoInput;