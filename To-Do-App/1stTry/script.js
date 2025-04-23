// Wait for the entire DOM to load before executing anything
document.addEventListener('DOMContentLoaded', () => {
    
    // Get references to DOM elements
    const todoInput = document.getElementById('todo-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const todoList = document.getElementById('todo-list');

    // Load tasks from localStorage or initialize with an empty array
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render each saved task from localStorage when the page loads
    tasks.forEach(task => renderTask(task));

    // Add a new task when the button is clicked
    addTaskBtn.addEventListener('click', () => {
        const taskText = todoInput.value.trim(); // Get input text and trim whitespace
        if (taskText === "") return; // Do nothing if input is empty

        // Create a new task object
        const newTask = {
            id: Date.now(),      // Unique ID using current timestamp
            text: taskText,      // Task content
            completed: false     // Task is not completed initially
        };

        tasks.push(newTask);      // Add to tasks array
        saveTask();               // Save updated tasks to localStorage
        renderTask(newTask);      // Display it in the DOM
        todoInput.value = "";     // Clear input field
        console.log(tasks);       // Log current tasks array for debugging
    });

    // Function to render a single task in the UI
    function renderTask(task) {
        const li = document.createElement('li');             // Create a <li> element
        li.setAttribute('data-id', task.id);                 // Store task id in a custom attribute

        // Add a class if the task is already completed
        if (task.completed) li.classList.add("completed");

        // Set the inner HTML of the <li>
        li.innerHTML = `
            <span>${task.text}</span>
            <button>Delete</button>
        `;

        // Toggle "completed" state when clicking the list item (excluding the delete button)
        li.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') return;        // Ignore if the clicked target is the delete button
            task.completed = !task.completed;                 // Toggle completed status
            li.classList.toggle('completed');                 // Toggle CSS class
            saveTask();                                       // Save updated status
        });

        // Delete task when delete button is clicked
        li.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation();                              // Prevent triggering the parent click handler
            tasks = tasks.filter(t => t.id !== task.id);      // Remove task from array
            li.remove();                                      // Remove element from DOM
            saveTask();                                       // Save updated tasks list
        });

        todoList.appendChild(li);                             // Append the new <li> to the task list
    }

    // Save the current state of tasks to localStorage
    function saveTask() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

});
