// Combined Task Manager Application
document.addEventListener("DOMContentLoaded", function() {
    // Check which page we're on
    const isAddPage = document.getElementById('taskName') !== null;
    const isTaskPage = document.getElementById('taskList') !== null;

    // Shared variables and functions
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function formatDate(dateString) {
        if (!dateString) return "Not set";
        const date = new Date(dateString);
        return date.toLocaleString();
    }

    // ADD TASK PAGE FUNCTIONALITY
    if (isAddPage) {
        const taskName = document.getElementById("taskName");
        const taskDesc = document.getElementById("taskDesc");
        const taskDueDate = document.getElementById("taskDueDate");
        const addTask = document.getElementById("addTask");
        const viewTasks = document.getElementById("viewTasks");

        function addNewTask() {
            const name = taskName.value.trim();
            const description = taskDesc.value.trim();
            const dueDate = taskDueDate.value;

            if (!name) {
                alert("Task name cannot be empty!");
                return;
            }

            tasks.push({ 
                name, 
                description, 
                dueDate,
                completed: false,
                completedDate: null
            });
            saveTasks();
            taskName.value = "";
            taskDesc.value = "";
            taskDueDate.value = "";
            alert("Task added successfully!");
        }

        addTask.addEventListener("click", addNewTask);
        viewTasks.addEventListener("click", () => {
            window.location.href = "task.html";
        });
    }

    // TASK MANAGEMENT PAGE FUNCTIONALITY
    if (isTaskPage) {
        const taskList = document.getElementById("taskList");
        const showAll = document.getElementById("showAll");
        const showPending = document.getElementById("showPending");
        const showCompleted = document.getElementById("showCompleted");
        const addNewTaskBtn = document.getElementById("addNewTask");

        function renderTasks(filter = "all") {
            taskList.innerHTML = "";
            tasks.forEach((task, index) => {
                if (filter === "pending" && task.completed) return;
                if (filter === "completed" && !task.completed) return;

                const li = document.createElement("li");
                li.classList.toggle("completed", task.completed);
                
                const dueDateInfo = task.dueDate ? 
                    `Due: ${formatDate(task.dueDate)}` : "No due date";
                    
                const completedInfo = task.completed ? 
                    `Completed: ${formatDate(task.completedDate)}` : "";
                    
                li.innerHTML = `
                    <div class="task-info">
                        <span class="task-title">${task.name}</span>
                        <span class="task-desc">${task.description}</span>
                        <span class="task-dates">
                            <span class="due-date">${dueDateInfo}</span>
                            ${task.completed ? `<span class="completed-date">${completedInfo}</span>` : ''}
                        </span>
                    </div>
                    <div class="task-actions">
                        <button class="toggleStatus" data-index="${index}">
                            ${task.completed ? "Mark Pending" : "Mark Completed"}
                        </button>
                        <button class="edit" data-index="${index}">Edit</button>
                        <button class="delete" data-index="${index}">Delete</button>
                    </div>
                `;
                taskList.appendChild(li);
            });
        }

        function editTask(index) {
            const newName = prompt("Edit Task Name:", tasks[index].name);
            const newDesc = prompt("Edit Task Description:", tasks[index].description);
            const newDueDate = prompt("Edit Due Date (YYYY-MM-DDTHH:MM):", tasks[index].dueDate);

            if (newName && newDesc !== null) {
                tasks[index].name = newName.trim();
                tasks[index].description = newDesc.trim();
                if (newDueDate) tasks[index].dueDate = newDueDate;
                saveTasks();
                renderTasks();
            }
        }

        function deleteTask(index) {
            if (confirm("Are you sure you want to delete this task?")) {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            }
        }

        function toggleTask(index) {
            tasks[index].completed = !tasks[index].completed;
            tasks[index].completedDate = tasks[index].completed ? new Date().toISOString() : null;
            saveTasks();
            renderTasks();
        }

        // Event delegation for dynamic buttons
        taskList.addEventListener("click", (e) => {
            if (e.target.classList.contains("toggleStatus")) {
                const index = e.target.getAttribute("data-index");
                toggleTask(index);
            } else if (e.target.classList.contains("edit")) {
                const index = e.target.getAttribute("data-index");
                editTask(index);
            } else if (e.target.classList.contains("delete")) {
                const index = e.target.getAttribute("data-index");
                deleteTask(index);
            }
        });

        showAll.addEventListener("click", () => renderTasks("all"));
        showPending.addEventListener("click", () => renderTasks("pending"));
        showCompleted.addEventListener("click", () => renderTasks("completed"));
        addNewTaskBtn.addEventListener("click", () => {
            window.location.href = "index.html";
        });

        renderTasks();
    }
});