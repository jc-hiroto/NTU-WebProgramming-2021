var todos = {};
var filter_mode = 2;
let root = document.getElementById("root");
let main_node = document.createElement("section");
let input_node = document.createElement("input");
let todo_list = document.createElement("ul");
let footer = generate_footer();
main_node.className = "todo-app__main";
input_node.className = "todo-app__input";
input_node.placeholder = "What needs to be done?";
todo_list.className = "todo-app__list";
todo_list.id = "todo-list";
main_node.appendChild(input_node);
main_node.appendChild(todo_list);
main_node.appendChild(footer);
root.appendChild(main_node);

refresh_todos();

function add_todo(name) {
    uid = Object.keys(todos).length
    let todo_item = {
        "id": uid,
        "name": name,
        "status": 0
    };
    todos[uid] = todo_item;
    console.log(todos);
    refresh_todos();
}
function get_item_count() {
    res = {
        "total": Object.keys(todos).length,
        "active": 0,
        "completed": 0
    }
    for (let key in todos) {
        if (todos[key].status == 0) {
            res.active += 1;
        }
    }
    res.completed = res.total - res.active;
    return res;
}
function update_footer() {
    let item_count_node = document.getElementById("todo-total");
    item_count_node.innerHTML = get_item_count().active + " left";
    switch (filter_mode) {
        case 0:
            document.getElementById("all").className = "";
            document.getElementById("active").className = "todo-app__view-button--active";
            document.getElementById("completed").className = "";
            break;
        case 1:
            document.getElementById("all").className = "";
            document.getElementById("active").className = "";
            document.getElementById("completed").className = "todo-app__view-button--active";
            break;
        case 2:
            document.getElementById("all").className = "todo-app__view-button--active";
            document.getElementById("active").className = "";
            document.getElementById("completed").className = "";
            break;
    }
    if (get_item_count().completed > 0) {
        document.getElementsByClassName("todo-app__clean")[0].style.visibility = "visible";
    } else {
        document.getElementsByClassName("todo-app__clean")[0].style.visibility = "hidden";
    }   
}

function update_todo(id) {
    item = document.getElementById("td_it_"+id);
    item_checkbox = item.childNodes[0].childNodes[0];
    item_title = item.childNodes[1];
    if(todos[id].status) {
        item_checkbox.checked = true;
        item_title.style.textDecoration = "line-through";
        item_title.style.opacity = "0.5";
    }else{
        item_checkbox.checked = false;
        item_title.style.textDecoration = "none";
        item_title.style.opacity = "1";
    }
    update_footer();
}

function refresh_todos() {
    if (Object.keys(todos).length > 0) {
        document.getElementById("todo-list").hidden = false;
        document.getElementById("todo-footer").style.visibility = "visible";
        console.log("refresh");
        todo_list.innerHTML = "";
        for (const [id, todo] of Object.entries(todos)) {
            if (todo.status == filter_mode) {
                todo_list.appendChild(generate_todo_item(todo));
                update_todo(id);
            }
            else if(filter_mode == 2){
                todo_list.appendChild(generate_todo_item(todo));
                update_todo(id);
            }
        }
        if (todo_list.childNodes.length == 0) {
            document.getElementById("todo-list").hidden = true;
        }
    }
    else{
        console.log("no todos");
        document.getElementById("todo-list").hidden = true;
        document.getElementById("todo-footer").style.visibility = "hidden";
    }
    update_footer();
}
function generate_todo_item(data) {
    let todo_item = document.createElement("li");
    todo_item.classList.add("todo-app__item");
    todo_item.id = "td_it_"+data.id;
    checkbox = document.createElement("div")
    checkbox.classList.add("todo-app__checkbox");
    title = document.createElement("h1");
    title.innerHTML = data.name;
    title.classList.add("todo-app__item-detail");
    clean_img = document.createElement("img");
    clean_img.src = "./img/x.png";
    clean_img.classList.add("todo-app__item-x");
    clean_img.style.cursor = "pointer";
    input = document.createElement("input");
    input.id = data.id;
    input.type = "checkbox";
    label = document.createElement("label");
    label.htmlFor = data.id;
    todo_item.appendChild(checkbox);
    todo_item.appendChild(title);
    todo_item.appendChild(clean_img);
    checkbox.appendChild(input);
    checkbox.appendChild(label);
    input.addEventListener("change", function () {
        if (this.checked) {
            todos[data.id].status = 1;
        }else{
            todos[data.id].status = 0;
        }
        refresh_todos();
    });

    clean_img.addEventListener("click", function () {
        delete todos[data.id];
        refresh_todos();
    });
    return todo_item;
}
function generate_footer() {
    let footer = document.createElement("footer");
    let total_cnt = document.createElement("div");
    let view_btns = document.createElement("ul");
    let clear_btn_container = document.createElement("div");
    let clear_btn = document.createElement("button");
    footer.className = "todo-app__footer";
    footer.id = "todo-footer";
    total_cnt.className = "todo-app__total";
    total_cnt.id = "todo-total";
    view_btns.className = "todo-app__view-buttons";
    clear_btn_container.className = "todo-app__clean";
    clear_btn.innerHTML = "Clear Completed";
    clear_btn.addEventListener("click", function () {
        var deleted_f = false;
        for (const [id, todo] of Object.entries(todos)) {
            if (todo.status) {
                delete todos[id];
                deleted_f = true;
            }
        }
        if (deleted_f) {
            refresh_todos();
        }
    });
    clear_btn_container.appendChild(clear_btn);
    view_btns.appendChild(generate_view_btn("all", "All"));
    view_btns.appendChild(generate_view_btn("active", "Active"));
    view_btns.appendChild(generate_view_btn("completed", "Completed"));
    footer.appendChild(total_cnt);
    footer.appendChild(view_btns);
    footer.appendChild(clear_btn_container);
    return footer;
}
function generate_view_btn(id, name) {
    let view_btn = document.createElement("button");
    view_btn.id = id;
    view_btn.innerHTML = name;
    view_btn.addEventListener("click", function () {
        switch (id) {
            case "all":
                filter_mode = 2;
                break;
            case "active":
                filter_mode = 0;
                break;
            case "completed":
                filter_mode = 1;
                break;
        }
        refresh_todos();
    });
    return view_btn;
}


input_node.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        let input_value = input_node.value;
        if (input_value.length > 0) {
            add_todo(input_value);
            input_node.value = "";
        }
    }
});
