document.addEventListener('DOMContentLoaded', () => {
  const todayButton = document.getElementById('today-button');

  todayButton.addEventListener('click', (e) => {
    window.location.href = '../../popup/habit_tracker.html';
  });


})