// Wait until the DOM is fully loaded before running script code
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task to the list
    function addTask() {
        // Get and trim the input value
        const taskText = taskInput.value.trim();

        // If input is empty, prompt user and exit
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create new list item and set its text
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button for this task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // When remove button is clicked, remove the associated li
        removeBtn.addEventListener('click', () => {
            li.remove();
        });

        // Append the remove button to the list item and add it to the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear the input field and refocus for convenience
        taskInput.value = '';
        taskInput.focus();
    }

    // Add click listener to the Add Task button
    addButton.addEventListener('click', addTask);

    // Allow adding tasks by pressing Enter inside the input
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Invoke addTask on load only if the input already contains text
    // (prevents unwanted alert when the page loads empty)
    if (taskInput.value.trim() !== '') {
        addTask();
    }
});
