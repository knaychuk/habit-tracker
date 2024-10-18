document.addEventListener("DOMContentLoaded", () => {
  
  // eventually get from storage
  const habits = [
    "Get Exercise",
    "Drink 8oz Water",
    "Practice LeetCode",
    "Update Calender",
  ]
  
  const today = new Date().toLocaleDateString();
  document.getElementById('date').textContent = today;
  
  const habitList = document.getElementById('habit-list');
  const habitForm = document.getElementById('habit-form');
  const newHabitInput = document.getElementById('new-habit');

  function renderHabits(habits) {
    habitList.innerHTML = '';

    habits.forEach(habit=> {
      const li = document.createElement('li');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = habit;
      const label = document.createElement('label');
      label.htmlFor = habit;
      label.textContent = habit;
      li.appendChild(checkbox);
      li.appendChild(label);
  
      habitList.appendChild(li);
    });
  }
 
  habitForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newHabit = newHabitInput.value.trim();
    if(newHabit) {
      habits.push(newHabit);
      renderHabits(habits);
    }
  })
});

