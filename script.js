const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", addTask);

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    const li = document.createElement("li");
    
    const leftDiv = document.createElement("div");
    leftDiv.className = "task-left";

    const checkboxIcon = document.createElement("span");
    checkboxIcon.className = "material-icons";
    checkboxIcon.textContent = "check_box_outline_blank";

    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;

    checkboxIcon.addEventListener("click", () => {
        taskSpan.classList.toggle("completed-task");

        checkboxIcon.textContent =
            checkboxIcon.textContent === "check_box_outline_blank"
                ? "check_box"
                : "check_box_outline_blank";
    });

    leftDiv.appendChild(checkboxIcon);
    leftDiv.appendChild(taskSpan);
    const completedText = document.createElement("span");
    completedText.textContent = "Completed";
    completedText.className = "completed-text";

    completedText.addEventListener("click", () => {
        li.remove();
    });

    li.appendChild(leftDiv);
    li.appendChild(completedText);
    taskList.appendChild(li);

    taskInput.value = "";
}
