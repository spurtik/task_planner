const form = document.querySelector("#new-task-form");

form.addEventListener("submit", (event) => {
  const validateName = document.querySelector("#taskName");
  const validateDescription = document.querySelector("#taskDescription");
  const validateAssignedTo = document.querySelector("#taskAssignedTo");
  const validateDueDate = document.querySelector("#taskDueDate");
  const validateStatus = document.querySelector("#taskStatus");
  
  let validationFail = 0;

  console.log("Task Name :" + validateName.value.length);
  console.log("Task Description :" + validateDescription.value.length);
  console.log("Task Assigned To :" + validateAssignedTo.value.length);
  console.log("Task Due Date :" + validateDueDate.value);
  console.log("Task Status:" + validateStatus.value);
  
  // Form validation for Task Name Field min length 5
  if (validateName.value.length > 5) {
    validateName.classList.add("is-valid");
    validateName.classList.remove("is-invalid");
  } else {
    validateName.classList.add("is-invalid");
    validateName.classList.remove("is-valid");
    validationFail++;
  }
  
  // Form validation for Task Description Field min length 5
  if (validateDescription.value.length > 5) {
    validateDescription.classList.add("is-valid");
    validateDescription.classList.remove("is-invalid");
  } else {
    validateDescription.classList.add("is-invalid");
    validateDescription.classList.remove("is-valid");
    validationFail++;
  }
  
  // Form validation for Task Assigned Field min length 5
  if (validateAssignedTo.value.length > 5) {
    validateAssignedTo.classList.add("is-valid");
    validateAssignedTo.classList.remove("is-invalid");
  } else {
    validateAssignedTo.classList.add("is-invalid");
    validateAssignedTo.classList.remove("is-valid");
    validationFail++;
  } 

  // Form validation for Due Date Field not empty
  if (validateDueDate.value) {
    validateDueDate.classList.add("is-valid");
    validateDueDate.classList.remove("is-invalid");
  } else {
    validateDueDate.classList.add("is-invalid");
    validateDueDate.classList.remove("is-valid");
    validationFail++;
  }
 
  // try your own validation for a date in the future
  var now = new Date();
  var nowDate = new Date(now.getTime() - (now.getTimezoneOffset() * 60000 ))
                    .toISOString()
                    .split("T")[0];
  console.log("Task Due Date :" + validateDueDate.value + " vs Date Now " + nowDate);
  if (validateDueDate.value >= nowDate) {
    validateDueDate.classList.add("is-valid");
    validateDueDate.classList.remove("is-invalid");
  } else {
    validateDueDate.classList.add("is-invalid");
    validateDueDate.classList.remove("is-valid");
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
    alert("Creating Submitted Task")
  }
});