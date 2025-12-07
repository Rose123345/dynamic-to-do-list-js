// Wait until the DOM is fully loaded before running script code
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Local Storage key
    const STORAGE_KEY = 'tasks';

    // Helper: get tasks array from Local Storage
    function getStoredTasks() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    }

    // Helper: save tasks array to Local Storage
    function saveTasks(tasks) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }

    // Create and append a task element to the DOM
    // Stores the task text in a data attribute to avoid reading button text
    function createTaskElement(taskText) {
        const li = document.createElement('li');

        // Use a span for the task text so it's easy to read later
        const span = document.createElement('span');
        span.textContent = taskText;
        li.appendChild(span);

        // Save the task text on the element for removal lookup
        li.dataset.task = taskText;

        // Create remove button for this task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // When remove button is clicked, remove the associated li and update storage
        removeBtn.addEventListener('click', () => {
            // Remove from DOM
            li.remove();

            // Remove from stored tasks (remove first matching occurrence)
            const stored = getStoredTasks();
            const idx = stored.indexOf(taskText);
            if (idx > -1) {
                stored.splice(idx, 1);
                saveTasks(stored);
            }
        });

        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    // Add a new task. If `taskText` is omitted, read from the input field.
    // `save` controls whether to persist the task to Local Storage.
    function addTask(taskText = null, save = true) {
        // If no text passed, read from input
        if (taskText === null) {
            taskText = taskInput.value.trim();
            if (taskText === '') {
                alert('Please enter a task.');
                return;
            }
        }

        // Create DOM element for the task
        createTaskElement(taskText);

        // Persist to Local Storage if requested
        if (save) {
            const stored = getStoredTasks();
            stored.push(taskText);
            saveTasks(stored);

            // Clear the input field and refocus for convenience
            taskInput.value = '';
            taskInput.focus();
        }
    }

    // Load tasks from Local Storage and render them
    function loadTasks() {
        const stored = getStoredTasks();
        stored.forEach(taskText => addTask(taskText, false));
    }

    // Attach event listeners
    addButton.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Initial load from Local Storage
    loadTasks();
});
