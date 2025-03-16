//document.addEventListener("DOMContentLoaded", () => {
  // your code here
//});
// index.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#create-task-form");
  const taskList = document.querySelector("#tasks");
  const taskInput = document.querySelector("#new-task-description");

  // Fetch tasks from the server
  fetch("http://localhost:3000/tasks")
      .then(response => response.json())
      .then(tasks => {
          tasks.forEach(task => renderTask(task));
      });

  // Handle form submission
  form.addEventListener("submit", (e) => {
      e.preventDefault();
      const taskText = taskInput.value.trim();
      if (taskText === "") return;

      const task = { description: taskText };

      // Save task to server
      fetch("http://localhost:3000/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(task)
      })
      .then(response => response.json())
      .then(newTask => {
          renderTask(newTask);
      });

      taskInput.value = "";
  });

  // Function to render task with delete functionality
  function renderTask(task) {
      const li = document.createElement("li");
      li.textContent = task.description;

      // Add a delete button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "❌";
      deleteButton.addEventListener("click", () => {
          // Delete from server
          fetch(`http://localhost:3000/tasks/${task.id}`, {
              method: "DELETE"
          })
          .then(() => {
              li.remove(); // Remove from UI
          });
      });

      li.appendChild(deleteButton);
      taskList.appendChild(li);
  }
});
