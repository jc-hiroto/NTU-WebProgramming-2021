import "../App.css"

function FilterBtn(props) {
    const btn_properties = [
        {
            name: "All",
            trigger: props.filterAction.all
        },
        {
            name: "Active",
            trigger: props.filterAction.active
        },
        {
            name: "Completed",
            trigger: props.filterAction.completed
        }
    ]
    return (
        <ul className="todo-app__view-buttons">
            {btn_properties.map(btn => {
                return (
                    <button onClick={btn.trigger} className="todo-app__view-button">
                        {btn.name}
                    </button>
                )
            })}
        </ul>
    )
}

export default FilterBtn

