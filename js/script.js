// ===============================
// DOM ELEMENTS
// ===============================

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const allBtn = document.getElementById("allBtn");
const activeBtn = document.getElementById("activeBtn");
const completedBtn = document.getElementById("completedBtn");

const taskCount = document.getElementById("taskCount");

const clearCompleted = document.getElementById("clearCompleted");


// ===============================
// APPLICATION STATE
// ===============================

let tasks = [];
// Current Filter
let currentFilter = "all";

// ===============================
// EVENT LISTENERS
// ===============================

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(event){

    if(event.key === "Enter"){
        addTask();    
    }

});

allBtn.addEventListener("click", () => {

    currentFilter = "all";

    renderTasks();

});

activeBtn.addEventListener("click", () => {

    currentFilter = "active";

    renderTasks();

});

completedBtn.addEventListener("click", () => {

    currentFilter = "completed";

    renderTasks();

});

clearCompleted.addEventListener("click", clearCompletedTasks);

// Event Delegation
taskList.addEventListener("click", handleTaskActions);

// ===============================
// ADD TASK
// ===============================

function addTask(){

    const text = taskInput.value.trim();

    if(text === ""){

        showToast("Please enter a task.");

        return;

    }

    const task = {

        id: Date.now(),

        text: text,

        completed: false,

        created:new Date().toLocaleString()

    };

    tasks.push(task);

    taskInput.value = "";

    saveTasks();

    renderTasks();

}

// ===============================
// DISPLAY TASKS
// ===============================

function renderTasks(){

    taskList.innerHTML = "";
    let filteredTasks = tasks;

    if(currentFilter === "active"){

        filteredTasks = tasks.filter(task => !task.completed);

    }
    else if(currentFilter === "completed"){

        filteredTasks = tasks.filter(task => task.completed);

    }

    if(filteredTasks.length===0){

taskList.innerHTML=`

<div class="empty">

Empty

<h3>No Tasks Yet</h3>

<p>Add your first task above.</p>

</div>

`;

taskCount.textContent=0;

updateFilterButtons();

return;

}



filteredTasks.forEach(task => {

        const li = document.createElement("li");

        li.className = "task";

        if(task.completed){

            li.classList.add("completed");

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

            <br>

                <small>

                Created:

                    ${task.created}

                </small>

            </span>

        </div>

        <div>

            <button class="edit-btn"
            data-id="${task.id}">

            Edit

            </button>

            <button class="delete-btn"
            data-id="${task.id}">

            Delete

            </button>

        </div>

        `;

        taskList.appendChild(li);

    });
    const remainingTasks = tasks.filter(task => !task.completed);

taskCount.textContent = remainingTasks.length;
updateFilterButtons();
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

    saveTasks();

    renderTasks();

}

// ===============================
// EDIT TASK
// ===============================

function editTask(id){

    const task = tasks.find(task => task.id === id);

    if(!task){

        return;

    }

    const newText = prompt("Edit Task", task.text);

    if(newText === null){

        return;

    }

    const updatedText = newText.trim();

if(updatedText === ""){

    alert("Task cannot be empty.");
    return;

}

task.text = updatedText;

    saveTasks();

    renderTasks();

}

// ===============================
// COMPLETE TASK
// ===============================

function toggleTask(id){

    const task = tasks.find(task => task.id === id);

if(!task){

    return;

}

    task.completed = !task.completed;

    saveTasks();

    renderTasks();

}

// ===============================
// CLEAR COMPLETED TASKS
// ===============================

function clearCompletedTasks(){

    tasks = tasks.filter(task => !task.completed);

    saveTasks();

    renderTasks();

}

// ===============================
// SAVE TASKS
// ===============================

function saveTasks(){

    localStorage.setItem(

        "tasks",

        JSON.stringify(tasks)

    );

}

function updateFilterButtons(){

    allBtn.classList.remove("active");
    activeBtn.classList.remove("active");
    completedBtn.classList.remove("active");

    if(currentFilter === "all"){

        allBtn.classList.add("active");

    }

    if(currentFilter === "active"){

        activeBtn.classList.add("active");

    }

    if(currentFilter === "completed"){

        completedBtn.classList.add("active");

    }

}

function showToast(message){

const toast = document.getElementById("toast");

toast.textContent = message;

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},2500);

}


// ===============================
// LOAD TASKS
// ===============================

function loadTasks(){

    const storedTasks = localStorage.getItem("tasks");

    if(storedTasks){

        tasks = JSON.parse(storedTasks);

    }

    renderTasks();

}

// ===============================
// INITIALIZE APPLICATION
// ===============================

loadTasks();
document.addEventListener("keydown",(event)=>{

if(event.key==="Escape"){

taskInput.value="";

taskInput.focus();

}

});