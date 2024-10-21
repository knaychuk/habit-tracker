document.addEventListener("DOMContentLoaded", () => {
  const habitList = document.getElementById('habit-list');
  const habitForm = document.getElementById('habit-form');
  const newHabitInput = document.getElementById('new-habit');
  const addHabitText = document.getElementById('add-habit-text');
  const success = document.getElementById('success-text');
  const calenderButton = document.getElementById('calendar-button');

  // calendar
  const completedList = document.getElementById('completed-list');
  
  const today = new Date().toLocaleString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  document.getElementById('date').textContent = today;

  function getStoredHabits() {
    const storedHabits = localStorage.getItem('habits');
    return storedHabits ? JSON.parse(storedHabits) : [];
  }

  function getStoredCompletedDays() {
    const storedCompletedDays = localStorage.getItem('completedDays');
    return storedCompletedDays ? JSON.parse(storedCompletedDays) : {};
  }

  const habits = getStoredHabits();
  const completedDays = getStoredCompletedDays(); 

  function showSuccessMessage() {
    const successMessage = document.getElementById('success-message');
    successMessage.style.display = 'block';
    
    // Remove the message after the animation completes (3 seconds)
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 3000);
  }

  function renderCompletedDays(completedDays) {
    // const completedList = '';

    const div = document.getElementById('test-message');
   

    Object.entries(completedDays).forEach(([key, value]) => {
      if(value == true) {
        var content = document.createTextNode(key);
      }
      div.appendChild(content);
    });

    // div.appendChild(content);


  }

  function checkComplete() {
    const allCompleted = habits.every(habit => habit.checked);

    if(allCompleted && habits != '') {
      completedDays[today] = true;
      storeCompletedDays(completedDays);
      showSuccessMessage();
      // success.innerHTML = ':)';
    } else {
      success.innerHTML = '';
      completedDays[today] = false;
      storeCompletedDays(completedDays);
    }
  
  }

  function renderHabits(habits) {
    habitList.innerHTML = '';
   
    if(habits == '') {
      completedDays[today] = null;
      storeCompletedDays(completedDays);
      addHabitText.innerHTML = 'No Habits, Create One Now!';
      success.innerHTML = '';
    }

    habits.forEach((habit, index)=> {
      const li = document.createElement('li');
      li.classList.add('habit-item');

      const checkbox = document.createElement('input');
      checkbox.classList.add('habit-checkbox');
      checkbox.type = 'checkbox';
      checkbox.id = index;
      checkbox.checked = habit.checked;

      const label = document.createElement('label');
      label.classList.add('habit-label');
      label.htmlFor = checkbox.id;
      label.textContent = habit.text;

      const button = document.createElement('button');
      button.classList.add('remove-button');
      button.textContent = 'X';
      button.addEventListener('click', () => {
        removeHabit(index);
      })

      checkbox.addEventListener('change', (e) => {
        habits[index].checked = checkbox.checked;
        storeHabits(habits);
        checkComplete();

      })
      
      li.appendChild(checkbox);
      li.appendChild(label);
      li.appendChild(button);
  
      habitList.appendChild(li);
    });

    // checkComplete();
  }



  function storeHabits(habits) {
    localStorage.setItem('habits', JSON.stringify(habits));
  }
  
  function removeHabit(index) {
    habits.splice(index, 1);
    storeHabits(habits);
    renderHabits(habits);
    checkComplete();
  }

  function storeCompletedDays(completedDays) {
    localStorage.setItem('completedDays', JSON.stringify(completedDays));
  }

  habitForm.addEventListener('submit', (e) => {
    // e.preventDefault();

    const newHabit = newHabitInput.value.trim();
    if(newHabit) {
      habits.push({ text: newHabit, checked: false });
      storeHabits(habits);
      renderHabits(habits);
      checkComplete();
      newHabitInput.value = "";
    }
  })

  calenderButton.addEventListener('click', (e) => {
    window.location.href = '../pages/calendar/calendar.html';
  });
  
  renderHabits(habits);
  // renderCompletedDays(completedDays);
});

