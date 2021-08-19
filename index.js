// var _ = require('lodash');

local_todos = getLocalTodos()
console.log(local_todos);
create_todo_button = document.getElementById("createTodoButton")
todo_input = document.getElementById("todoInput")
displayArea = document.getElementById("displayArea")
todoListArea = document.getElementById("todoListArea")
sortBtn = document.getElementById("sortBtn")
// class todo{
//     desc: ,

// }

function getLocalTodos() {
    if (!localStorage.getItem('todos')) {
        localStorage.setItem('todos', JSON.stringify([]))
    }
    return JSON.parse(localStorage.getItem('todos'))
}

function setLocalTodos() {
    localStorage.setItem('todos', JSON.stringify(local_todos))
}

function createTodo(todo) {
    local_todos.push({
        id: local_todos.length,
        desc: todo,
        status: false
    })
    // console.log("input should be", todo, todo_input.value);
    // console.log("posted", local_todos);
    setLocalTodos()
    render()
}

create_todo_button.addEventListener('click', (e) => { createTodo(todo_input.value) })

sortBtn.addEventListener('click', (e) => { sortTodosByStatus() })

function sortTodosByStatus() {
    sorted_local_todos = []
    local_todos.forEach((element, index) => {
        if (!element.status) {
            sorted_local_todos.unshift(element)
        } else {
            sorted_local_todos.push(element)
        }
    });
    // console.log(local_todos, sorted_local_todos);
    local_todos = sorted_local_todos
    render()
}

let render = () => {
    todoListArea.innerHTML = ""

    local_todos.forEach(element => {
        console.log(element, "elements to be rendered");
        newListItem = document.createElement("li");
        text = document.createTextNode(element.desc);
        newListItem.appendChild(text);
        newListItem.dataset.type = "todoEle";
        newListItem.dataset.todoId = element.id;
        if (element.status) {
            newListItem.style = "text-decoration: line-through"
            // newListItem.style = "color: green"
        }
        //  else {
        //     newListItem.style = "color: red"
        // }
        // newListItem.style = "cursor: default"
        todoListArea.appendChild(newListItem);
    });

}

todoListArea.addEventListener('click', (e) => {
    if (e.target.dataset.type == 'todoEle') {
        console.log(e, "event recieved on click of li")
        toggleTodoStatus(e.target.dataset.todoId)
    }
})

function toggleTodoStatus(todoId) {
    console.log("id recived = ", todoId);
    local_todos.forEach(element => {
        if (element.id == todoId) {
            console.log("element found!", element)
            element.status = !element.status
        }
    });
    setLocalTodos()
    render()
}

render()