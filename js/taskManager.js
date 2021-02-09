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
}