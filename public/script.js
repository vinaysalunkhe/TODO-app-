const createTask = document.getElementById("createTask");
const taskList = document.getElementById("taskList");
const taskDescription = document.getElementById("taskDescription");

document.addEventListener("DOMContentLoaded", function () {
  readAllTask();
});
createTask.addEventListener("click", function () {
  input = taskDescription.value;
  if (input == "") {
    alert("Please enter a task");
  }
  data = { task: input, isCompleted: false };
  try {
    fetch("/writeTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        readTask(data);
      }
    });
  } catch (err) {
    console.log(err);
  }
});
function readAllTask() {
  fetch("/readTask", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      res.json().then((data) => {
        data.forEach((task) => {
          list(task);
        });
      });
    }
  });
}
function readTask(data) {
  list(data);
}
function list(data) {
  const creatItem = document.createElement("li");
  const checkbox = document.createElement("input");
  const button = document.createElement("button");
  checkbox.type = "checkbox";
  checkbox.className = "task-status";
  creatItem.className = "list-group-item";
  creatItem.appendChild(checkbox);
  creatItem.innerHTML = data.task;
  taskList.appendChild(creatItem);
  creatItem.appendChild(checkbox);
  button.className = "delete-task";
  button.innerHTML = "❌";
  creatItem.appendChild(button);
  if (data.isCompleted) {
    checkbox.checked = true;
    creatItem.style.textDecoration = "line-through";
  } else {
    checkbox.checked = false;
    creatItem.style.textDecoration = "none";
  }
  checkbox.addEventListener("click", function () {
    if (this.checked) {
      creatItem.style.textDecoration = "line-through";
      data.isCompleted = !data.isCompleted;
      fetch("/updateTask", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (res.ok) {
          res.json().then((data) => {});
        } else {
          console.log("error");
        }
      });
    } else {
      data.isCompleted = false;
      creatItem.style.textDecoration = "none";
      fetch("/updateTask", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (res.ok) {
          res.json().then((data) => {});
        } else {
          console.log("error");
        }
      });
    }
  });
  button.addEventListener("click", function () {
    fetch("/deleteTask", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        creatItem.remove();
      }
    });
  });
}
