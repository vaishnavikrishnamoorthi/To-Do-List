const datePicker = document.getElementById("datePicker");
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const today = new Date().toISOString().split("T")[0];
datePicker.value = today;

let tasks = {}; // { date: [{ text, completed }] }

datePicker.addEventListener("change", renderTasks);
addBtn.addEventListener("click", addTask);

function getDateType(date) {
    if (date < today) return "past";
    if (date === today) return "today";
    return "future";
}

function renderTasks() {
    const selectedDate = datePicker.value;
    const dateType = getDateType(selectedDate);

    taskList.innerHTML = "";

    if (dateType === "past") {
        taskInput.disabled = true;
        addBtn.disabled = true;
    } else {
        taskInput.disabled = false;
        addBtn.disabled = false;
    }

    (tasks[selectedDate] || []).forEach((task, index) => {
        const li = document.createElement("li");
        li.className = dateType;

        const leftDiv = document.createElement("div");
        leftDiv.className = "task-left";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        const taskText = document.createElement("span");
        taskText.textContent = task.text;

        if (task.completed) {
            taskText.classList.add("task-completed");
        }

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            taskText.classList.toggle("task-completed");
        });

        leftDiv.appendChild(checkbox);
        leftDiv.appendChild(taskText);

        const deleteBtn = document.createElement("span");
        deleteBtn.textContent = "🗑";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", () => {
            tasks[selectedDate].splice(index, 1);
            renderTasks();
        });

        li.appendChild(leftDiv);
        li.appendChild(deleteBtn);
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

    tasks[selectedDate].push({
        text: taskText,
        completed: false
    });

    taskInput.value = "";
    renderTasks();
}

renderTasks();
