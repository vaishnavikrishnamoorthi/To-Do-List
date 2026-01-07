const datePicker = document.getElementById("datePicker");
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const today = new Date().toISOString().split("T")[0];
datePicker.value = today;

datePicker.addEventListener("change", renderTasks);
addBtn.addEventListener("click", addTask);

let tasks = {}; // { date: [task1, task2] }

function getDateType(date) {
    if (date < today) return "past";
    if (date === today) return "today";
    return "future";
}

function renderTasks() {
    const selectedDate = datePicker.value;
    const dateType = getDateType(selectedDate);

    taskList.innerHTML = "";

    // Disable input for past dates
    if (dateType === "past") {
        taskInput.disabled = true;
        addBtn.disabled = true;
    } else {
        taskInput.disabled = false;
        addBtn.disabled = false;
    }

    (tasks[selectedDate] || []).forEach(task => {
        const li = document.createElement("li");
        li.textContent = task;
        li.className = dateType;
        taskList.appendChild(li);
    });
}

function addTask() {
    const selectedDate = datePicker.value;
    const taskText = taskInput.value.trim();

    if (taskText === "") return;

    if (!tasks[selectedDate]) {
        tasks[selectedDate] = [];
    }

    tasks[selectedDate].push(taskText);
    taskInput.value = "";
    renderTasks();
}

renderTasks();
