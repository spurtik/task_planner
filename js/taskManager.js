function createTaskHtml(name, description, assignedTo, dueDate, status) {
    const html = 
    `
    <br />
    <div class="card align-item-center" style="width: 22rem; margin:0 auto;">
    <ul class="list-group list-group-flush">
        <li class="list-group-item">${name}</li>
        <li class="list-group-item">${description}</li>
        <li class="list-group-item">${assignedTo}</li>
        <li class="list-group-item">${dueDate}</li>
    </ul>
       <div class="card-footer">
            <small class="font-weight-bold text-left">${status}</small>
            <div class="float-right ml-5">
            <button type="button" class="btn btn-outline-success">Done</button>
            <button type="button" class="btn btn-outline-danger">Delete</button>
            </div>
        </div>
   </div><br />
    `
    return html;
}



class TaskManager {
    constructor(currentId=0) {
        this.currentId = currentId;
        this.tasks = [];
    }

    addTask (newTaskName, newTaskDesc, newTaskAssignee, newTaskDueDate, newTaskStatus) {
        this.currentId++;
        const  task = {
            id: this.currentId,
            name: newTaskName,
            description: newTaskDesc,
            assignedTo: newTaskAssignee,
            dueDate: newTaskDueDate,
            status: newTaskStatus             
        };
        this.tasks.push(task);
        
    };

    render() {
        const tasksHtmlList = [];
        let tasks = this.tasks;
        
        for (let taskIndex = 0; taskIndex < tasks.length; taskIndex++) {
            const task = tasks[taskIndex];
            const date = new Date(task.dueDate);
            const formattedDate =
            date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
            const taskHtml = createTaskHtml(task.name, task.description, task.assignedTo, formattedDate, task.status);
            tasksHtmlList.push(taskHtml);
        }
        console.log(tasksHtmlList);
        const taskHtml = tasksHtmlList.join('\n');

        const taskList = document.querySelector('#task_cards');
        taskList.innerHTML = taskHtml;
       // taskList.innerHTML = taskHtml;
        // const taskToDisplay = this.tasks[index];
        // dueDate = new Date(taskToDisplay.dueDate);
        // let formattedDate = dueDate.toLocaleDateString();
      
        // let p = document.createElement("div");
        // p.innerHTML= taskHtml;
        // document.getElementById('task_cards').appendChild(p);
        
    }
    
}