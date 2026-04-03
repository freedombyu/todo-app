// Utility Functions

// Show loading indicator
function showLoading() {
  document.getElementById('loading').style.display = 'block';
  document.getElementById('taskList').style.opacity = '0.5';
}

// Hide loading indicator
function hideLoading() {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('taskList').style.opacity = '1';
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  
  return date.toLocaleDateString();
}

// Show notification (optional enhancement)
function showNotification(message, type = 'success') {
  // Simple alert for now - can be enhanced with custom notifications
  console.log(`${type.toUpperCase()}: ${message}`);
}

// Calculate statistics
function calculateStats(tasks) {
  return {
    total: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length
  };
}

// Filter tasks
function filterTasks(tasks, filter) {
  if (filter === 'active') return tasks.filter(t => !t.completed);
  if (filter === 'completed') return tasks.filter(t => t.completed);
  return tasks;
}