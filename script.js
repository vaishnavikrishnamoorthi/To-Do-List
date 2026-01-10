const datePicker = document.getElementById("datePicker");
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const today = new Date().toISOString().split("T")[0];
datePicker.value = today;

let tasks = JSON.parse(localStorage.getItem("tasks")) || {};

datePicker.addEventListener("change", renderTasks);
addBtn.addEventListener("click", addTask);

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getDateType(date) {
    if (date < today) return "past";
    if (date === today) return "today";
    return "future";
}

function renderTasks() {
    taskList.innerHTML = "";

    const selectedDate = datePicker.value;
    const selectedDateType = getDateType(selectedDate);

    if (selectedDateType === "past") {
        taskInput.disabled = true;
        addBtn.disabled = true;
    } else {
        taskInput.disabled = false;
        addBtn.disabled = false;
    }

    const allDates = Object.keys(tasks).sort();

    allDates.forEach(date => {
        const dateType = getDateType(date);

        tasks[date].forEach((task, index) => {
            const li = document.createElement("li");
            li.className = dateType;

            const leftDiv = document.createElement("div");
            leftDiv.className = "task-left";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;
            checkbox.disabled = dateType === "past";

            checkbox.addEventListener("change", () => {
                task.completed = checkbox.checked;
                saveTasks();
                renderTasks();
            });

            const span = document.createElement("span");
            span.className = "task-text";
            span.textContent = `${task.text} (${date})`;

            if (task.completed) {
                span.classList.add("completed");
            }

            leftDiv.appendChild(checkbox);
            leftDiv.appendChild(span);

            const deleteBtn = document.createElement("span");
            deleteBtn.className = "material-icons delete-btn";
            deleteBtn.textContent = "delete";

            deleteBtn.addEventListener("click", () => {
                tasks[date].splice(index, 1);

                if (tasks[date].length === 0) {
                    delete tasks[date];
                }

                saveTasks();
                renderTasks();
            });

            li.appendChild(leftDiv);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
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
    saveTasks();
    renderTasks();
}

renderTasks();
