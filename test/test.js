const assert = require("assert");
const TaskManager = require("../js/taskManager.js");

describe("TaskManager", () => {
  describe("#constructor", () => {
    describe("when initializing a new TaskManager", () => {
      it("should create an empty tasks array", () => {
        const taskManager = new TaskManager(1);

        assert.deepStrictEqual(taskManager.tasks, []);
      });

      it("should set the currentId to the passed in number", () => {
        const taskManager = new TaskManager(1);

        assert.deepStrictEqual(taskManager.currentId, 1);
      });
    });
  });

  describe(".addTask", () => {
    describe("passing new task data as parameters", () => {
      it("should add the task to the tasks array", () => {
        const taskManager = new TaskManager(0);

        const task = {
          id: taskManager.currentId,
          name: "Task 1",
          description: "Task WireFrame",
          assignedTo: "Spurti",
          dueDate: '2021 - 02 - 19',
          status: "In Progress",
        };

        taskManager.addTask(
          task.name,
          task.description,
          task.assignedTo,
          task.dueDate,
          task.status
        );
        assert.deepStrictEqual(taskManager.tasks[0], task);
      });

      it("should increment the currentId property", () => {
        const taskManager = new TaskManager(0);

        const task = {
          id: taskManager.currentId,
          name: "Task 1",
          description: "Task WireFrame",
          assignedTo: "Spurti",
          dueDate: '2021 - 02 - 19',
          status: "In Progress",
        };

        taskManager.addTask(
          task.name,
          task.description,
          task.assignedTo,
          task.dueDate,
          task.status
        );

        assert.deepStrictEqual(taskManager.currentId, 1);
      });
    });
  });

  describe(".deleteTask", () => {
    describe("when passed an existing taskId", () => {
      it("should remove the task from the tasks array", () => {
        const taskManager = new TaskManager();

        const taskToDelete = {
          id: taskManager.currentId,
          name: "Task 2",
          description: "Html/Css",
          assignedTo: "Miguel",
          dueDate: '20 - 02 - 2021',
          status: "In Progress",
        };
        const doNotDelete = {
          id: taskManager.currentId + 1,
          name: "Task 3",
          description: "Create js files",
          assignedTo: "Fahad",
          dueDate: '19 - 02 - 2021',
          status: "In Progress",
        };

        taskManager.addTask(
          taskToDelete.name,
          taskToDelete.description,
          taskToDelete.assignedTom,
          taskToDelete.dueDate,
          taskToDelete.status
        );
        taskManager.addTask(
          doNotDelete.name,
          doNotDelete.description,
          doNotDelete.assignedTo,
          doNotDelete.dueDate,
          doNotDelete.status
        );

        taskManager.deleteTask(taskToDelete.id);

        assert.deepStrictEqual(taskManager.tasks, [doNotDelete]);
      });
    });
  });

  describe(".getTaskById", () => {
    describe("when passed an existing taskId", () => {
      it("should return the task", () => {
        const taskManager = new TaskManager(1);

        const task = {
          id: taskManager.currentId,
          name: "Task 5",
          description: "Testing",
          assignedTo: "Miguel",
          dueDate: '21 - 02 -2021',
          status: "In Progress",
        };

        taskManager.addTask(
          task.name,
          task.description,
          task.assignedTo,
          task.dueDate,
          task.status
        );

        const result = taskManager.getTaskById(1);

        assert.deepStrictEqual(result, task);
      });
    });
  });
}); 