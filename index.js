// var _ = require('lodash');

local_todos = getLocalTodos()
console.log(local_todos);
create_todo_button = document.getElementById("createTodoButton")
todo_input = document.getElementById("todoInput")
displayArea = document.getElementById("displayArea")
todoListArea = document.getElementById("todoListArea")
sortBtn = document.getElementById("sortBtn")
toaster = document.getElementById("todoToaster")
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
    // console.log("create todo called");
    if (!todo) {
        console.log("todo not available");
        toaster.style = "display:block;opacity:1"
        // toaster.style = "visibility:block"
        setTimeout(() => {
            toaster.style = "opacity:0"
        }, 500);
        setTimeout(() => {
            toaster.style = "display:none"
        }, 550);
        return
    }

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
    // sorted_local_todos = []
    // local_todos.forEach((element, index) => {
    //     if (!element.status) {
    //         sorted_local_todos.unshift(element)
    //     } else {
    //         sorted_local_todos.push(element)
    //     }
    // });

    // // console.log(local_todos, sorted_local_todos);
    // local_todos = sorted_local_todos
    local_todos = _.orderBy(local_todos, ['status'])
    render()
}

let render = () => {
    todoListArea.innerHTML = ""

    local_todos.forEach(element => {
        console.log(element, "elements to be rendered");
        newListItem = document.createElement("li");
        newListItem.innerHTML = `${element.desc} <button id="toggleTodoButton" data-type="toggle-btn">${element.status ? "X" : "✓"}</button> <button data-type="del-btn" id="deleteTodoButton">Delete</button>`
        // text = document.createTextNode(element.desc);
        // newListItem.appendChild(text);
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
    if (e.target.dataset.type == 'toggle-btn') {
        // console.log(e.target.parentNode.dataset, "event recieved on click of li")
        toggleTodoStatus(e.target.parentNode.dataset.todoId)
    }

    if (e.target.dataset.type == 'del-btn') {
        // console.log(e.target.parentNode.dataset, "event recieved on click of li")
        deleteLocalTodo(e.target.parentNode.dataset.todoId)
    }
})

function deleteLocalTodo(todoId) {
    console.log("id recived = ", todoId);
    local_todos.forEach((element, index) => {
        if (element.id == todoId) {
            local_todos.splice(index, 1)
        }
    });
    setLocalTodos()
    render()
}

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