document.addEventListener("DOMContentLoaded", () => {
  const habitList = document.getElementById('habit-list');
  const habitForm = document.getElementById('habit-form');
  const newHabitInput = document.getElementById('new-habit');
  const addHabitText = document.getElementById('add-habit-text');
  const success = document.getElementById('success-text');
  
  const today = new Date().toLocaleString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  document.getElementById('date').textContent = today;

  function getStoredHabits() {
    const storedHabits = localStorage.getItem('habits');
    return storedHabits ? JSON.parse(storedHabits) : [];
  }

  const habits = getStoredHabits();

  function checkComplete() {
    const allCompleted = habits.every(habit => habit.checked);

    if(allCompleted && habits != '') {
      success.innerHTML = ':)';
    } else {
    success.innerHTML = '';
    }
  
  }

  function renderHabits(habits) {
    habitList.innerHTML = '';
   
    if(habits == '') {
      addHabitText.innerHTML = 'No Habits, Create One Now!';
      success.innerHTML = 'test';
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
  
  renderHabits(habits);
});

