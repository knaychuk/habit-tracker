document.addEventListener("DOMContentLoaded", () => {
  const habits = [
    "Get Exercise",
    "Drink 8oz Water",
    "Practice LeetCode",
    "Update Calender",
  ]
  
  const today = new Date().toLocaleDateString();
  document.getElementById('date').textContent = today;
  
  const habitList = document.getElementById('habit-list');
  habits.forEach(habit=> {
    // const li = document.createElement('li');
    // const checkbox = document.createElement('input');
    // checkbox.type = 'checkbox';
    // checkbox.id = habit;
    // const label = document.createElement('label');
    // label.htmlFor = habit;
    // label.textContent = habit;
  
    // li.appendChild(checkbox);
    // li.appendChild(label);
    // habitList.appendChild(li);
    const div = document.createElement('div');
    div.innerHTML = habit;
    habitList.appendChild(div);
  });
});

