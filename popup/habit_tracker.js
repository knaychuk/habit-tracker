document.addEventListener("DOMContentLoaded", () => {
  
  // eventually get from storage
  // let habits = [
  //   "Get Exercise",
  //   "Drink 8oz Water",
  //   "Practice LeetCode",
  //   "Update Calender",
  // ]

  function getStoredHabits() {
    const storedHabits = localStorage.getItem('habits');
    return storedHabits ? JSON.parse(storedHabits) : [];
  }
  
  const today = new Date().toLocaleDateString();
  document.getElementById('date').textContent = today;
  
  const habitList = document.getElementById('habit-list');
  const habitForm = document.getElementById('habit-form');
  const newHabitInput = document.getElementById('new-habit');

  
  const habits = getStoredHabits();

  function renderHabits(habits) {
    habitList.innerHTML = '';

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
    e.preventDefault();

    const newHabit = newHabitInput.value.trim();
    if(newHabit) {
      habits.push(newHabit);
      storeHabits(habits);
      renderHabits(habits);
    }
  })

  
  renderHabits(habits);
});

