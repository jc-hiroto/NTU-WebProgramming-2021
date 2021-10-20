var todos = [];
let root = document.getElementById("root");
let main_node = document.createElement("section");
main_node.className = "todo-app__main";
let input_node = document.createElement("input");
input_node.className = "todo-app__input";
input_node.placeholder = "What needs to be done?";
let todo_list = document.createElement("ul")
main_node.appendChild(input_node);
main_node.appendChild(todo_list);
root.appendChild(main_node);

refresh_todos();

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
    if (todos.length > 0) {
        console.log("refresh");
        todo_list.className = "todo-app__list";
        todo_list.id = "todo-list";
        todo_list.innerHTML = "";
        for (let i = 0; i < todos.length; i++) {
            let todo = todos[i];
            todo_list.appendChild(generate_todo_item(todo.name, i));
        }
    }
    else{
        console.log("no todos");
        main_node.removeChild(document.getElementById("todo-list"));
    }
}
function generate_todo_item(name, id) {
    let todo_item = document.createElement("li");
    todo_item.classList.add("todo-app__item");
    checkbox = document.createElement("div")
    checkbox.classList.add("todo-app__checkbox");
    title = document.createElement("h1");
    title.innerHTML = name;
    title.classList.add("todo-app__item-detail");
    clean_img = document.createElement("img");
    clean_img.src = "./img/x.png";
    clean_img.classList.add("todo-app__item-x");
    input = document.createElement("input");
    input.id = id;
    input.type = "checkbox";
    label = document.createElement("label");
    label.htmlFor = id;
    todo_item.appendChild(checkbox);
    todo_item.appendChild(title);
    todo_item.appendChild(clean_img);
    checkbox.appendChild(input);
    checkbox.appendChild(label);
    return todo_item;
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
