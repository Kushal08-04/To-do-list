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
// ADD TASK BUTTON
// ===============================

addTaskBtn.addEventListener("click", addTask);

// ===============================
// ADD TASK FUNCTION
// ===============================

function addTask(){

    const taskText = taskInput.value.trim();

    if(taskText === ""){

        alert("Please enter a task.");

        return;
    }

    tasks.push(taskText);

    renderTasks();

    taskInput.value = "";

}
