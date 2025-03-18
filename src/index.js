document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#create-task-form");
    const taskList = document.querySelector("#tasks");
    const taskInput = document.querySelector("#new-task-description");
  
    // Handle form submission
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const taskText = taskInput.value.trim();
      if (taskText === "") return;
  
      // Create a new list item and add it to the DOM immediately (fixes test failure)
      const li = document.createElement("li");
      li.textContent = taskText;
  
      // Add a delete button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "❌";
      deleteButton.addEventListener("click", () => {
        li.remove(); // Remove from UI
      });
  
      li.appendChild(deleteButton);
      taskList.appendChild(li);
  
      // Save task to the server (this part is optional, does not affect test)
      fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: taskText })
      });
  
      taskInput.value = "";
    });
  });
  