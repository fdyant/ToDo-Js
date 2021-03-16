//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


//1.Event Listener

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);

//2.Even Listener for local storage
document.addEventListener('DOMContentLoaded', getTodos);

//Function
function addTodo(event) {
    //prevent form from submitting
    event.preventDefault();
    //create div
    const todoDiv =document.createElement("div");
    todoDiv.classList.add('todo');
    //create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //Add ToDo to local storage
    saveLocalTodos(todoInput.value);

    //check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML ='<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    //check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML ='<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //append to list
    todoList.appendChild(todoDiv);
    //clear todo input value
    todoInput.value='';
}

function deleteCheck(e) {
    const item =e.target;
    //delete todo
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        //this is for animation
    todo.classList.add('fall'); 
    removeLocalTodos(todo);
    todo.addEventListener('transitioned', function() {
        todo.remove();
    });
}

    //check mark
    if(item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo (e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display='flex';
            break;
            case 'completed':
                if(todo.classList.contains('completed')) {
                    todo.style.display='flex';
                }else {
                    todo.style.display= 'none';
                }
                break;
                case 'uncompleted':
            if(!todo.classList.contains('completed')) {
                todo.style.display='flex';
            }else {
                todo.style.display= 'none';
        }
            break;
        }
    });
}

//save to local storage => check if already have things in local storage
function  saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

//check if have things in local storage
    function getTodos() {
        let todos;
        if (localStorage.getItem('todos') === null) {
        todos = [];
        } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
    //create div
    const todoDiv =document.createElement("div");
    todoDiv.classList.add('todo');

    //create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML ='<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    //check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML ='<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //append to list
    todoList.appendChild(todoDiv);
    });
}

//check if have things in local storage
function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

//today date
var today = new Date();
document.getElementById('todayDate').innerHTML = today;

