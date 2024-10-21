document.addEventListener('DOMContentLoaded', () => {
  const todayButton = document.getElementById('today-button');

  todayButton.addEventListener('click', (e) => {
    window.location.href = '../../popup/habit_tracker.html';
  });

  
  function getStoredCompletedDays() {
    const storedCompletedDays = localStorage.getItem('completedDays');
    return storedCompletedDays ? JSON.parse(storedCompletedDays) : {};
  }

  const completedDays = getStoredCompletedDays(); 

  function renderCompletedDays(completedDays) {
    const completedList = document.getElementById('completed-list');

    // const div = document.getElementById('test-message');
   
    Object.entries(completedDays).forEach(([key, value]) => {
      if(value == true) {
        var div = document.createElement('div');
        div.innerHTML = key;
        div.classList.add('complete-day');
      } else if(value == false) {
        var div = document.createElement('div');
        div.innerHTML = key;
        div.classList.add('incomplete-day')
      } else {
        var div = document.createElement('div');
        div.innerHTML = key;
        div.classList.add('null-day');
      }
      completedList.appendChild(div);
    });
  }

  renderCompletedDays(completedDays);

})