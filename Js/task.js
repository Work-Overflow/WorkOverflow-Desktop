const taskInput = document.querySelector(".task-input input"),
taskAdd = document.querySelector(".task-input #task_add_icon"),
filters = document.querySelectorAll(".filters span"),
clearAll = document.querySelector(".clear-btn"),
taskBox = document.querySelector(".task-box");

let editId,
isEditTask = false,
WorkOverflow_Task = JSON.parse(localStorage.getItem("WorkOverflow_Task"));

filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});

function showTodo(filter) {
    let liTag = "";
    if(WorkOverflow_Task) {
        WorkOverflow_Task.forEach((todo, id) => {
            let completed = todo.status == "completed" ? "checked" : "";
            if(filter == todo.status || filter == "all") {
                liTag += `<li class="task">
                            <label for="${id}">
                                <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                                <p class="${completed}">${todo.name}</p>
                            </label>
                            <div class="settings">
                                <i onclick="showTASKMenu(this)" class="ri-more-2-fill"></i>
                                <ul class="task-menu">
                                    <li onclick='editTask(${id}, "${todo.name}")'><i class="ri-pen-nib-line"></i>Edit</li>
                                    <li onclick='deleteTask(${id}, "${filter}")'><i class="ri-delete-bin-6-line"></i>Delete</li>
                                </ul>
                            </div>
                        </li>`;
            }
        });
    }
    taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;
    let checkTask = taskBox.querySelectorAll(".task");
    !checkTask.length ? clearAll.classList.remove("active") : clearAll.classList.add("active");
    taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow");
}
showTodo("all");

function showTASKMenu(selectedTask) {
    let menuDiv = selectedTask.parentElement.lastElementChild;
    menuDiv.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != selectedTask) {
            menuDiv.classList.remove("show");
        }
    });
}

function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked) {
        taskName.classList.add("checked");
        WorkOverflow_Task[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        WorkOverflow_Task[selectedTask.id].status = "pending";
    }
    localStorage.setItem("WorkOverflow_Task", JSON.stringify(WorkOverflow_Task))
}

function editTask(taskId, textName) {
    editId = taskId;
    isEditTask = true;
    taskInput.value = textName;
    taskInput.focus();
    taskInput.classList.add("active");
}

function deleteTask(deleteId, filter) {
    isEditTask = false;
    WorkOverflow_Task.splice(deleteId, 1);
    localStorage.setItem("WorkOverflow_Task", JSON.stringify(WorkOverflow_Task));
    showTodo(filter);
}

clearAll.addEventListener("click", () => {
    isEditTask = false;
    WorkOverflow_Task.splice(0, WorkOverflow_Task.length);
    localStorage.setItem("WorkOverflow_Task", JSON.stringify(WorkOverflow_Task));
    showTodo()
});

taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if(e.key == "Enter" && userTask) {
        if(!isEditTask) {
            WorkOverflow_Task = !WorkOverflow_Task ? [] : WorkOverflow_Task;
            let taskInfo = {name: userTask, status: "pending"};
            WorkOverflow_Task.push(taskInfo);
        } else {
            isEditTask = false;
            WorkOverflow_Task[editId].name = userTask;
        }
        taskInput.value = "";
        localStorage.setItem("WorkOverflow_Task", JSON.stringify(WorkOverflow_Task));
        showTodo(document.querySelector("span.active").id);
    }
});

taskAdd.addEventListener("click", function () { 
    let userTask = taskInput.value.trim();
    if(userTask) {
        if(!isEditTask) {
            WorkOverflow_Task = !WorkOverflow_Task ? [] : WorkOverflow_Task;
            let taskInfo = {name: userTask, status: "pending"};
            WorkOverflow_Task.push(taskInfo);
        } else {
            isEditTask = false;
            WorkOverflow_Task[editId].name = userTask;
        }
        taskInput.value = "";
        localStorage.setItem("WorkOverflow_Task", JSON.stringify(WorkOverflow_Task));
        showTodo(document.querySelector("span.active").id);
    }
});

setInterval(() => {
    if(taskInput.value.trim() == null || taskInput.value.trim() == ""){
        taskAdd.classList.remove("active");
    }
    else{
        taskAdd.classList.add("active");
    }
}, 1);