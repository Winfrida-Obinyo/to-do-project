
const todos = [
  {
    id: 1,
    userId: 1,
    task: 'Task 1',
    description: 'Description 1',
    status: 'Not Started',
    priority: 'Low',
    completeOnDate: '2023-06-30',
    taskPercentage: 0,
    additionalNotes: 'I love what Im doing'
  },
  {
    id: 2,
    userId: 1,
    task: 'Task 2',
    description: 'Description 2',
    status: 'In Progress',
    priority: 'Medium',
    completeOnDate: '2023-07-10',
    taskPercentage: 50,
    additionalNotes: 'Remember to complete the documentation.'
  },
  {
    id: 3,
    userId: 2,
    task: 'Task 3',
    description: 'Description 3',
    status: 'Completed',
    priority: 'High',
    completeOnDate: '2023-06-15',
    taskPercentage: 100,
    additionalNotes: 'Task completed successfully.'
  }
];


function fetchTodos(userId) {
  return todos.filter(todo => todo.userId === userId);
}


function renderTodos(todos) {
  const taskTable = document.getElementById('taskTable');
  taskTable.innerHTML = '';

 
  const tableHead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const headers = ['Task', 'Description', 'Status', 'Priority', 'Complete On', 'Task %', 'Additional Notes', 'Actions'];

  headers.forEach(headerText => {
    const headerCell = document.createElement('th');
    headerCell.textContent = headerText;
    headerRow.appendChild(headerCell);
  });

  tableHead.appendChild(headerRow);
  taskTable.appendChild(tableHead);

  const tableBody = document.createElement('tbody');

  todos.forEach(todo => {
    const row = document.createElement('tr');

    const taskCell = document.createElement('td');
    taskCell.textContent = todo.task;

    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = todo.description;

    const statusCell = document.createElement('td');
    statusCell.textContent = todo.status;

    const priorityCell = document.createElement('td');
    priorityCell.textContent = todo.priority;

    const completeOnDateCell = document.createElement('td');
    completeOnDateCell.textContent = todo.completeOnDate;

    const taskPercentageCell = document.createElement('td');
    taskPercentageCell.textContent = todo.taskPercentage;

    const additionalNotesCell = document.createElement('td');
    additionalNotesCell.textContent = todo.additionalNotes;

    const actionsCell = document.createElement('td');

  
    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    completeBtn.addEventListener('click', () => {
      if (!todo.completed) {
        row.classList.add('completed');
        todo.completed = true;
      } else {
        row.classList.remove('completed');
        todo.completed = false;
      }
    });

    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      todos.splice(todos.indexOf(todo), 1);
      row.remove();
    });

    actionsCell.appendChild(completeBtn);
    actionsCell.appendChild(deleteBtn);

    row.appendChild(taskCell);
    row.appendChild(descriptionCell);
    row.appendChild(statusCell);
    row.appendChild(priorityCell);
    row.appendChild(completeOnDateCell);
    row.appendChild(taskPercentageCell);
    row.appendChild(additionalNotesCell);
    row.appendChild(actionsCell);

    tableBody.appendChild(row);
  });

  taskTable.appendChild(tableBody);
}

const addTaskForm = document.getElementById('addTaskForm');
addTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const userId = parseInt(document.getElementById('userId').value);
  const task = document.getElementById('task').value;
  const description = document.getElementById('description').value;
  const status = document.getElementById('status').value;
  const priority = document.getElementById('priority').value;
  const completeOnDate = document.getElementById('completeOnDate').value;
  const taskPercentage = parseInt(document.getElementById('taskPercentage').value);
  const additionalNotes = document.getElementById('additionalNotes').value;
  
  todos.push({
    id: todos.length + 1,
    userId,
    task,
    description,
    status,
    priority,
    completeOnDate,
    taskPercentage,
    additionalNotes,
    completed: false
  });


  const userTodos = fetchTodos(userId);
  renderTodos(userTodos);

  addTaskForm.reset();
});




const initialUserId = 9; 
const initialTodos = fetchTodos(initialUserId);
renderTodos(initialTodos);


