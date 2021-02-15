function createTaskHtml(task = {}) {
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
            <div id= "info" data-id="${task.id}" class="float-right ml-5">
            <button type="button" class="btn btn-outline-success ${(task.status === 'Done') ? 'inactive' : 'active'} done-button" ${(task.status === 'Done') ? 'disabled' : ''}>Done</button>
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
        this.currentId++;

        firebase.database().ref('tasks/' + this.currentId).set({
            id: this.currentId,
            name: newTaskName,
            description: newTaskDesc,
            assignedTo: newTaskAssignee,
            dueDate: newTaskDueDate,
            status: newTaskStatus
        }); 
    };

    render() {
        console.log('inside render');
        // Reading the data from the database
        let data;

        const tasksHtmlList = [];

        firebase.database().ref('tasks/').on('value', function (snapshot) {
            data = snapshot.val();
            console.log("This is data speaking from open");
            //console.log(data);
            for (const key in data) {
                if (Object.hasOwnProperty.call(data, key)) {
                    const element = data[key];
                    //console.log(element);
                    const taskHtml = createTaskHtml(element);
                    tasksHtmlList.push(taskHtml);
                }
            }
            document.getElementById('task_cards').innerHTML = tasksHtmlList.join('<br>');
        });
    }

    closeTask(id) {
        firebase.database().ref('tasks/' + id).update({
            status: "Done"
        })
    }


    deleteTask(id) {
        firebase.database().ref('tasks/' + id).remove();

        firebase.database().ref('tasks/' + id).update({
        });
    }
}