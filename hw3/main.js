var todos = [];
let root = document.getElementById("root");
let main_node = document.createElement("section");
main_node.className = "todo-app__main";
let input_node = document.createElement("input");
input_node.className = "todo-app__input";
input_node.placeholder = "What needs to be done?";
main_node.appendChild(input_node);
root.appendChild(main_node);


function add_todo(name) {
    let todo_item = {
        name: name,
        status: 0
    };
    todos.push(todo_item);
    console.log(todos);
    refresh_todos();
}

function refresh_todos() {
    console.log(todos.length);
    if (todos.length > 0) {
        console.log("refresh");
        let todo_list = document.createElement("ul")
        main_node.appendChild(todo_list);
        todo_list.className = "todo-app__list";
        todo_list.id = "todo-list";
        todo_list.innerHTML = "";
        for (let i = 0; i < todos.length; i++) {
            let todo = todos[i];
            let todo_item = document.createElement("li");
            todo_item.classList.add("todo-app__item");
            todo_item.innerHTML = todo.name;
            todo_list.appendChild(todo_item);
        }
    }
}
input_node.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        let input_value = input_node.value;
        if (input_value.length > 0) {
            console.log(input_value);
            add_todo(input_value);
            input_node.value = "";
        }
    }
});
