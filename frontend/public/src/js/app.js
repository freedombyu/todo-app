// Application State
let tasks = [];
let currentFilter = 'all';

// DOM Elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const filterBtns = document.querySelectorAll('.filter-btn');
const totalCount = document.getElementById('totalCount');
const activeCount = document.getElementById('activeCount');
const completedCount = document.getElementById('completedCount');
const footer = document.getElementById('footer');
const remainingTasks = document.getElementById('remainingTasks');

// Initialize App
async function init() {
  await loadTasks();
  attachEventListeners();
}

// Load tasks from API
async function loadTasks() {
  try {
    showLoading();
    tasks = await api.getTasks();
    renderTasks();
    updateStats();
    hideLoading();
  } catch (error) {
    hideLoading();
    console.error('Failed to load tasks:', error);
    alert('Failed to load tasks. Please check if the server is running.');
  }
}

// Render tasks to DOM
function renderTasks() {
  const filteredTasks = filterTasks(tasks, currentFilter);
  
  if (filteredTasks.length === 0) {
    taskList.innerHTML = '<div class="empty-state"><p>No tasks found</p><small>Add a task to get started!</small></div>';
    footer.style.display = 'none';
    return;
  }

  footer.style.display = 'block';
  taskList.innerHTML = filteredTasks.map(task => `
    <div class="task-item" data-id="${task._id}">
      <div class="task-checkbox ${task.completed ? 'completed' : ''}" onclick="toggleTask('${task._id}')"></div>
      <div class="task-text ${task.completed ? 'completed' : ''}">${task.text}</div>
      <button class="task-delete" onclick="deleteTask('${task._id}')">Delete</button>
    </div>
  `).join('');
}

// Update statistics
function updateStats() {
  const stats = calculateStats(tasks);
  totalCount.textContent = stats.total;
  activeCount.textContent = stats.active;
  completedCount.textContent = stats.completed;
  remainingTasks.textContent = `${stats.active} task${stats.active !== 1 ? 's' : ''} remaining`;
}

// Add new task
async function addTask() {
  const text = taskInput.value.trim();
  
  if (!text) {
    alert('Please enter a task');
    return;
  }

  try {
    showLoading();
    const newTask = await api.createTask(text);
    tasks.unshift(newTask);
    taskInput.value = '';
    renderTasks();
    updateStats();
    hideLoading();
  } catch (error) {
    hideLoading();
    alert('Failed to add task');
  }
}

// Toggle task completion
async function toggleTask(id) {
  try {
    const updatedTask = await api.toggleTask(id);
    const index = tasks.findIndex(t => t._id === id);
    if (index !== -1) {
      tasks[index] = updatedTask;
    }
    renderTasks();
    updateStats();
  } catch (error) {
    alert('Failed to update task');
  }
}

// Delete task
async function deleteTask(id) {
  if (!confirm('Are you sure you want to delete this task?')) return;

  try {
    await api.deleteTask(id);
    tasks = tasks.filter(t => t._id !== id);
    renderTasks();
    updateStats();
  } catch (error) {
    alert('Failed to delete task');
  }
}

// Change filter
function changeFilter(filter) {
  currentFilter = filter;
  
  filterBtns.forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.filter === filter) {
      btn.classList.add('active');
    }
  });
  
  renderTasks();
}

// Attach event listeners
function attachEventListeners() {
  addBtn.addEventListener('click', addTask);
  
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  });

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      changeFilter(btn.dataset.filter);
    });
  });
}

// Start the app
init();