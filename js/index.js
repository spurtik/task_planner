const currentTasks = new TaskManager();
if (currentTasks.tasks.length === 0) {
  console.log(`current tasks are ${currentTasks.tasks}`);
}

const taskHtml = createTaskHtml();
console.log(taskHtml);

const form = document.querySelector("#new-task-form");

form.addEventListener("submit", (event) => {
  const validateName = document.querySelector("#taskName");
  const validateDescription = document.querySelector("#taskDescription");
  const validateAssignedTo = document.querySelector("#taskAssignedTo");
  const validateDueDate = document.querySelector("#taskDueDate");
  const validateStatus = document.querySelector("#taskStatus");
  
  let validationFail = 0;
  
  // Form validation for Task Name Field min length 5
  if (validateName.value.length > 5) {
    validateName.classList.remove("is-invalid");
  } else {
    validateName.classList.add("is-invalid");
    validationFail++;
  }
  
  // Form validation for Task Description Field min length 5
  if (validateDescription.value.length > 5) {
    validateDescription.classList.remove("is-invalid");
  } else {
    validateDescription.classList.add("is-invalid");
    validationFail++;
  }
  
  // Form validation for Task Assigned Field min length 5
  if (validateAssignedTo.value.length > 5) {
    validateAssignedTo.classList.remove("is-invalid");
  } else {
    validateAssignedTo.classList.add("is-invalid");
    validationFail++;
  } 

  // Form validation for Due Date Field not empty
  if (validateDueDate.value) {
    validateDueDate.classList.remove("is-invalid");
  } else {
    validateDueDate.classList.add("is-invalid");
    validationFail++;
  }
 
  // try your own validation for a date in the future
  var now = new Date();
  var nowDate = new Date(now.getTime() - (now.getTimezoneOffset() * 60000 ))
                    .toISOString()
                    .split("T")[0];
  console.log("Task Due Date :" + validateDueDate.value + " vs Date Now " + nowDate);
  if (validateDueDate.value >= nowDate) {
    validateDueDate.classList.remove("is-invalid");
  } else {
    validateDueDate.classList.add("is-invalid");
    validationFail++;
  }
  
  // If validation fails then function will not proceed further and
  // will return. The value of validationFail will also needed to be
  // reset to 0.
  // ----------------------------------------------------------------------------------
  if (validationFail > 0) {
    event.preventDefault();
    event.stopPropagation();
    validationFail = 0;
    alert("Please correct any error and Submit again")
    //console.log("Form Invalid");
    return;
  } else {
    form.classList.add("was-validated");
    alert("Creating Submitted Task");
    currentTasks.addTask(validateName.value,validateDescription.value,validateAssignedTo.value,validateDueDate.value,validateStatus.value);
    alert('after addTask'); 
    //console.log(`New task created is ${currentTasks.tasks[newTaskNumber].id}, ${currentTasks.tasks[newTaskNumber].name}, ${currentTasks.tasks[newTaskNumber].description}, ${currentTasks.tasks[newTaskNumber].assignedTo}, ${currentTasks.tasks[newTaskNumber].dueDate}, ${currentTasks.tasks[newTaskNumber].status}`);
    alert("New Task Created");
    event.preventDefault();
    event.stopPropagation();
    form.reset();
    form.classList.remove("was-validated");
    //const tasksHtmlList = [];
    //tasksHtmlList = currentTasks.render();
    currentTasks.render();
  }
});

const taskList = document.querySelector("#task_cards");

taskList.addEventListener("click", (event) => {

  //if done button was clicked
  if (event.target.classList.contains('done-button')) {
    console.log(`Done button clicked on task ${event.target.parentElement.dataset.id}`);
    //change status
    let taskId = event.target.parentElement.dataset.id;
    currentTasks.closeTask(taskId);
    event.target.parentElement.parentElement.firstElementChild.innerHTML = 'Done';
    //disable the button
    event.target.setAttribute('disabled',true);
    console.log(event.target.parentElement.parentElement.parentElement.parentElement);
  }

  //if done button was clicked
  if (event.target.classList.contains('delete-button')) {
    console.log(`Delete button clicked on task ${event.target.parentElement.dataset.id}`);
    let taskId = event.target.parentElement.dataset.id;
    if (confirm(`Delete Task ${taskId}`)) {
      currentTasks.deleteTask(taskId);
      currentTasks.render();  
    }
  }
  
});
