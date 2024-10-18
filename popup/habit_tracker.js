document.addEventListener("DOMContentLoaded", () => {
  const habitList = document.getElementById('habit-list');
  const habitForm = document.getElementById('habit-form');
  const newHabitInput = document.getElementById('new-habit');
  const addHabitText = document.getElementById('add-habit-text');
  
  const today = new Date().toLocaleString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  document.getElementById('date').textContent = today;

  function getStoredHabits() {
    const storedHabits = localStorage.getItem('habits');
    return storedHabits ? JSON.parse(storedHabits) : [];
  }

  const habits = getStoredHabits();

  function renderHabits(habits) {
    habitList.innerHTML = '';
   
    if(habits == '') {
      addHabitText.innerHTML = 'No Habits, Create One Now!';
    }

    habits.forEach((habit, index)=> {
      const li = document.createElement('li');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = habit;
      const label = document.createElement('label');
      label.htmlFor = habit;
      label.textContent = habit;
      const button = document.createElement('button');
      button.textContent = 'Remove';
      button.addEventListener('click', () => {
        removeHabit(index);
      })

      li.appendChild(checkbox);
      li.appendChild(label);
      li.appendChild(button);
  
      habitList.appendChild(li);
    });
  }


  function storeHabits(habits) {
    localStorage.setItem('habits', JSON.stringify(habits));
  }
  
  function removeHabit(index) {
    habits.splice(index, 1);
    storeHabits(habits);
    renderHabits(habits);
  }
 
  habitForm.addEventListener('submit', (e) => {
    // e.preventDefault();

    const newHabit = newHabitInput.value.trim();
    if(newHabit) {
      habits.push(newHabit);
      storeHabits(habits);
      renderHabits(habits);
      newHabitInput.value = "";
    }
  })

  
  renderHabits(habits);
});

