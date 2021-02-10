function createTaskHtml(task={}) {
    const html = 
    `
    <br />
    <div class="card align-item-center" style="width: 22rem; margin:0 auto;">
    <ul class="list-group list-group-flush">
        <li class="list-group-item">${task.name}</li>
        <li class="list-group-item">${task.description}</li>
        <li class="list-group-item">${task.assignedTo}</li>
        <li class="list-group-item">${task.dueDate}</li>
    </ul>
       <div class="card-footer">
            <small class="font-weight-bold text-left">${task.status}</small>
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
        // this.name = newTaskName;
        // this.description = newTaskDesc;
        // this.assignedTo = newTaskAssignee;
        // this.dueDate = newTaskDueDate;
        // this.status = newTaskStatus;
        this.tasks.push({
            id: this.currentId,
            name: newTaskName,
            description: newTaskDesc,
            assignedTo: newTaskAssignee,
            dueDate: newTaskDueDate,
            status: newTaskStatus             
        })
    }

    render(index) {
        const tasksHtmlList = [];
        //console.log(`The task array is ${this.tasks[index].name}`);
        const taskToDisplay = this.tasks[index];
        // dueDate = new Date(taskToDisplay.dueDate);
        // let formattedDate = dueDate.toLocaleDateString();
        const taskHtml = createTaskHtml(taskToDisplay);
        console.log(taskHtml);
        let p = document.createElement("div");
        p.innerHTML= taskHtml;
        document.getElementById('task_cards').appendChild(p);
        
    }
    
}