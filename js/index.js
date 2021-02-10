//let currentId = 1;
const currentTasks = new TaskManager();
// currentTasks.tasks.push('task1');
// console.log(`current tasks are ${currentTasks.tasks}`);
// currentTasks.addTask(1,1,1,1,1); 
// console.log(`current tasks are ${currentTasks.tasks[1].id}`);
// currentTasks.addTask(1,1,1,1,1); 
// console.log(`current tasks are ${currentTasks.tasks[2].id}`);
if (currentTasks.tasks.length === 0) {
  console.log(`current tasks are ${currentTasks.tasks}`);
}

const taskHtml = createTaskHtml();
console.log(taskHtml);

const form = document.querySelector("#new-task-form");

function validate(validateData) {
  if (validateData.value.length > 5) {
    validateData.classList.remove("is-invalid");
  } else {
    validateData.classList.add("is-invalid");
    validationFail++;
  }
};

form.addEventListener("submit", (event) => {
  const validateName = document.querySelector("#taskName");
  const validateDescription = document.querySelector("#taskDescription");
  const validateAssignedTo = document.querySelector("#taskAssignedTo");
  const validateDueDate = document.querySelector("#taskDueDate");
  const validateStatus = document.querySelector("#taskStatus");

  let validationFail = 0;

  event.preventDefault();
  event.stopPropagation();

  // console.log("Task Name :" + validateName.value.length);
  // console.log("Task Description :" + validateDescription.value.length);
  // console.log("Task Assigned To :" + validateAssignedTo.value.length);
  // console.log("Task Due Date :" + validateDueDate.value);
  // console.log("Task Status:" + validateStatus.value);

  // Form validation for Task Name Field min length 5
  validate(validateName);

  // Form validation for Task Description Field min length 5
  validate(validateDescription);

  // Form validation for Task Assigned Field min length 5
  validate(validateAssignedTo);

  // Form validation for Due Date Field not empty
  if (validateDueDate.value) {
    validateDueDate.classList.remove("is-invalid");
  } else {
    validateDueDate.classList.add("is-invalid");
    validationFail++;
  }

  // try your own validation for a date in the future
  var now = new Date();
  var nowDate = new Date(now.getTime() - (now.getTimezoneOffset() * 60000))
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
    validationFail = 0;
    alert("Please correct any error and Submit again")
    //console.log("Form Invalid");
    return;
  } else {
    // form.classList.remove("was-validated");
    // form.classList.add("was-validated");
    // alert("Creating Submitted Task")
    currentTasks.addTask(validateName.value, validateDescription.value, validateAssignedTo.value, validateDueDate.value, validateStatus.value);
    form.reset();
    currentTasks.render();
    // let newTaskNumber = currentTasks.tasks.length - 1;
    // console.log(`New task created are ${currentTasks.tasks[newTaskNumber].id}, ${currentTasks.tasks[newTaskNumber].name}, ${currentTasks.tasks[newTaskNumber].description}, ${currentTasks.tasks[newTaskNumber].assignedTo}, ${currentTasks.tasks[newTaskNumber].dueDate}, ${currentTasks.tasks[newTaskNumber].status}`);
    alert("New Task Created");

    // validateName.classList.remove("is-invalid");
    // validateDescription.classList.remove("is-invalid");
    // validateAssignedTo.classList.remove("is-invalid");
    // validateDueDate.classList.remove("is-invalid");


  }
});