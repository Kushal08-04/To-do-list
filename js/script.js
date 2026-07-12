// ===============================
// DOM ELEMENTS
// ===============================

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// ===============================
// APPLICATION STATE
// ===============================

let tasks = [];

// ===============================
// EVENT LISTENERS
// ===============================

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(event){

    if(event.key === "Enter"){
        addTask();
    }

});

// Event Delegation
taskList.addEventListener("click", handleTaskActions);

// ===============================
// ADD TASK
// ===============================

function addTask(){

    const text = taskInput.value.trim();

    if(text === ""){

        alert("Please enter a task.");

        return;

    }

    const task = {

        id: Date.now(),

        text: text,

        completed: false

    };

    tasks.push(task);

    taskInput.value = "";

    renderTasks();

}

// ===============================
// DISPLAY TASKS
// ===============================

function renderTasks(){

    taskList.innerHTML = "";

    tasks.forEach(task => {

        const li = document.createElement("li");

        li.className = "task";

        if(task.completed){

            li.style.opacity = ".6";

        }

        li.innerHTML = `

        <div>

            <input
            type="checkbox"
            class="complete-btn"
            data-id="${task.id}"
            ${task.completed ? "checked" : ""}>

            <span style="margin-left:10px;
            text-decoration:${task.completed ? "line-through" : "none"}">

            ${task.text}

            </span>

        </div>

        <div>

            <button class="edit-btn"
            data-id="${task.id}">

            ✏️

            </button>

            <button class="delete-btn"
            data-id="${task.id}">

            🗑️

            </button>

        </div>

        `;

        taskList.appendChild(li);

    });

}

// ===============================
// HANDLE BUTTON CLICKS
// ===============================

function handleTaskActions(event){

    const id = Number(event.target.dataset.id);

    if(event.target.classList.contains("delete-btn")){

        deleteTask(id);

    }

    if(event.target.classList.contains("edit-btn")){

        editTask(id);

    }

    if(event.target.classList.contains("complete-btn")){

        toggleTask(id);

    }

}

// ===============================
// DELETE TASK
// ===============================

function deleteTask(id){

    tasks = tasks.filter(task => task.id !== id);

    renderTasks();

}

// ===============================
// EDIT TASK
// ===============================

function editTask(id){

    const task = tasks.find(task => task.id === id);

    const newText = prompt("Edit Task", task.text);

    if(newText === null){

        return;

    }

    task.text = newText.trim();

    renderTasks();

}

// ===============================
// COMPLETE TASK
// ===============================

function toggleTask(id){

    const task = tasks.find(task => task.id === id);

    task.completed = !task.completed;

    renderTasks();

}
