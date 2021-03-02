function createTaskHtml(task = {}) {
    const html =
        `
    <br />
    <div id=""task-cards" class="card align-item-center" style="width: 25rem; margin:0 auto;">
    <ul class="">
        <li class="list-group-item">${task.name}</li>
        <li class="list-group-item">${task.description}</li>
        <li class="list-group-item">${task.assignedTo}</li>
        <li class="list-group-item border-bottom-0">${task.dueDate}</li>
    </ul>
       <div class="card-footer pr-2"pl-2>
            <small class="font-weight-bold text-left"> ${(task.status === 'Done') ? '<i class="far fa-check-circle"></i> Task Completed ' : `${task.status}`}</small>
            <div data-id="${task.id}" class="float-right ml-5">
            <small class="font-weight-bold text-left" hidden>${task.name}</small>
            <button type="button" class="btn btn-outline-success ${(task.status === 'Done') ? 'inactive' : 'active'} done-button" ${(task.status === 'Done') ? 'hidden' : ''}>Done</button>
            <button type="button" class="btn btn-outline-danger active delete-button">Delete</button>
            </div>
        </div>
   </div><br />
    `
    return html;
}
class TaskManager {
    constructor(currentId = 0) {
        this.currentId = currentId;
        this.tasks = [];
    }

    addTask(newTaskName, newTaskDesc, newTaskAssignee, newTaskDueDate, newTaskStatus) {

        this.tasks.push({
            id: this.currentId++,
            name: newTaskName,
            description: newTaskDesc,
            assignedTo: newTaskAssignee,
            dueDate: newTaskDueDate,
            status: newTaskStatus
        });
    };

    closeTask(id) {
        const taskToClose = this.tasks.findIndex(task => task.id === Number(id));
        console.log(`Task to close ${taskToClose}`);
        if (taskToClose > -1) {
            this.tasks[taskToClose].status = 'Done';
        }
    }

    deleteTask(id) {
        const taskToDelete = this.tasks.findIndex(task => task.id === Number(id));
        console.log(`Task to delete ${taskToDelete}`);
        if (taskToDelete > -1) {
            this.tasks.splice(taskToDelete, 1);
        }
    }

    render() {
        console.log('inside render');
        const tasksHtmlList = [];

        if (this.tasks.length === 0) {

            document.getElementById('task_cards').innerHTML = `<div class="no-task-info" id = "info">
                <i class="fas fa-info-circle"></i>
                No pending tasks
            </div>`;
        } else {
            this.tasks.forEach(task => {
                const taskHtml = createTaskHtml(task);
                tasksHtmlList.push(taskHtml);
            })
            document.getElementById('task_cards').innerHTML = tasksHtmlList.join('<br>');
        }
       
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
    load() {
        if (localStorage.getItem("tasks")) {
            const tasksJson = localStorage.getItem("tasks");
            this.tasks = JSON.parse(tasksJson);
        }
      
        if (localStorage.getItem("currentId")) {
            const currentId = localStorage.getItem("currentId");
            this.currentId = String(currentId);

        }
    }

}

module.exports = TaskManager;