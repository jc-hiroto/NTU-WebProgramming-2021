import "../App.css"

function FilterBtn(props) {
    const btn_properties = [
        {
            name: "All",
            value: "all",
            trigger: props.filterAction.all
        },
        {
            name: "Active",
            value: "active",
            trigger: props.filterAction.active
        },
        {
            name: "Completed",
            value: "completed",
            trigger: props.filterAction.completed
        }
    ]
    return (
        <ul className="todo-app__view-buttons">
            {btn_properties.map(btn => {
                return (
                    <button onClick={btn.trigger} className={props.filterMode == btn.value ? "todo-app__view-button--active" : "todo-app__view-button"}>
                        {btn.name}
                    </button>
                )
            })}
        </ul>
    )
}

export default FilterBtn

