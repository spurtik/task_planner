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
            <div data-id="${task.id}" class="float-right ml-5">
            <button type="button" class="btn btn-outline-success ${(task.status==='Done') ? 'inactive' : 'active'} done-button" ${(task.status==='Done') ? 'disabled' : ''}>Done</button>
            <button type="button" class="btn btn-outline-danger active delete-button">Delete</button>
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
        
        this.tasks.push({
            id: this.currentId++,
            name: newTaskName,
            description: newTaskDesc,
            assignedTo: newTaskAssignee,
            dueDate: newTaskDueDate,
            status: newTaskStatus             
        });   
    };

    closeTask (id) {
        const taskToClose = this.tasks.findIndex(task => task.id === Number(id));
        console.log(`Task to close ${taskToClose}`);
        if(taskToClose > -1) {
            this.tasks[taskToClose].status = 'Done';
        }
    }

    deleteTask (id) {
        const taskToDelete = this.tasks.findIndex(task => task.id === Number(id));
        console.log(`Task to delete ${taskToDelete}`);
        if(taskToDelete > -1) {
            this.tasks.splice(taskToDelete,1);
        }
    }

    render() {
        console.log('inside render');
        const tasksHtmlList = [];    
        this.tasks.forEach(task => {
            const taskHtml = createTaskHtml(task);
            tasksHtmlList.push(taskHtml);
        })
        document.getElementById('task_cards').innerHTML = tasksHtmlList.join('<br>');    
    }

    getTaskById(taskId) {
        let foundTask;
        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];
            if (task.id === taskId) {
                foundTask = task;
            };
        }
        return foundTask
    };

     //save the tasks as string and set the items in local storage
    save() {
        const tasksJson = JSON.stringify(this.tasks);
        localStorage.setItem("tasks", tasksJson);

        const currentId = String(this.currentId);
        localStorage.setItem("currentId", currentId);
    }

    //load the tasks to display it on page 
    load () {
        if(localStorage.getItem("tasks")) {
            const tasksJson = localStorage.getItem("tasks");
            this.tasks = JSON.parse(tasksJson);
            console.log(localStorage.getItem("tasks"));
        }

        if(localStorage.getItem("currentId")) {
            const currentId = localStorage.getItem("currentId");
            this.currentId = String(currentId);

        }
    }
    
}

module.exports = TaskManager;