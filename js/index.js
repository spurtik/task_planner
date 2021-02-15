  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyALupzqKneBdIXwsyXUjp2EPuhAFH-thQo",
    authDomain: "taskplaner-6f566.firebaseapp.com",
    databaseURL: "https://taskplaner-6f566-default-rtdb.firebaseio.com",
    projectId: "taskplaner-6f566",
    storageBucket: "taskplaner-6f566.appspot.com",
    messagingSenderId: "494526692714",
    appId: "1:494526692714:web:25745da48a40482eeab913",
    measurementId: "G-NG50SN5E62"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

const currentTasks = new TaskManager();
currentTasks.render();



if (currentTasks.tasks.length === 0) {
  console.log(`current tasks are ${currentTasks.tasks}`);
}

const taskHtml = createTaskHtml();
console.log(taskHtml);

const form = document.querySelector("#new-task-form");

let validationFail = 0;


function validate(validateData, validLength) {
  if (validateData.value.length >= validLength) {
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


  event.preventDefault();
  event.stopPropagation();

  // Form validation for Task Name Field min length 6
  validate(validateName, 6);

  // Form validation for Task Description Field min length 8
  validate(validateDescription, 8);

  // Form validation for Task Assigned Field min length 5
  validate(validateAssignedTo, 5);

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
    return;
  } else {
    form.classList.add("was-validated");
    alert("Creating Submitted Task");
    currentTasks.addTask(validateName.value, validateDescription.value, validateAssignedTo.value, validateDueDate.value, validateStatus.value);
    alert("New Task Created");
    form.reset();
    form.classList.remove("was-validated");
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
    console.log(event.target.parentElement.firstElementChild.innerHTML);
    event.target.parentElement.firstElementChild.innerHTML = 'Done';
    currentTasks.render();
    //disable the button
    event.target.setAttribute('disabled', true);

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
