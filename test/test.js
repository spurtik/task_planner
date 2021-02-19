const assert = require('assert');
const chai = require("chai"),
  spies = require("chai-spies");

const jsdom = require("../node_modules/jsdom");
const { JSDOM } = jsdom;

const expect = chai.expect;
const TaskManager = require("../js/taskManager");
//const { beforeEach } = require("mocha");

describe("TaskManager", () => {      
  describe("#constructor", () => {
    describe("New Task Manager", () => {
      it("should have empty tasks array", () => {
        const currentTasks = new TaskManager();
        expect(currentTasks.tasks).to.be.eql([]);
      });

      it("should set the currentId to the 0", () => {
        const currentTasks = new TaskManager();
        expect(currentTasks.currentId).to.be.eq(0);
      });
    });
  });
});

  describe("#addTask", () => {
    describe("passing new task data as parameters", () => {
      it("should add the task to the tasks array", () => {
        const taskManager = new TaskManager();

        const task = {
          id: 0,
          name: "test",
          description: "test",
          assignedTo: "test",
          dueDate: Date.now(),
          status: "In Progress",
        };

        taskManager.addTask(
          task.name,
          task.description,
          task.assignedTo,
          task.dueDate,
          task.status
        );
        task.id = taskManager.tasks[0].id;
        expect(taskManager.tasks[0]).to.be.eql(task);
      });

    it("should increment the currentId property", () => {
        const taskManager = new TaskManager(10);

        const task = {
          id: taskManager.currentId,
          name: "test",
          description: "test",
          assignedTo: "test",
          dueDate: Date.now(),
          status: "In Progress",
        };

        taskManager.addTask(
          task.name,
          task.description,
          task.assignedTo,
          task.dueDate,
          task.status
        );

        expect(taskManager.currentId).to.be.eql(11);
       });
    });
  });

  describe("#deleteTask", () => {
    describe("when passed an existing taskId", () => {
      it("should remove the task from the tasks array", () => {
        const taskManager = new TaskManager();

        const taskToDelete = {
          id: taskManager.currentId,
          name: "test",
          description: "test",
          assignedTo: "test",
          dueDate: Date.now(),
          status: "In Progress",
        };
        const taskToKeep = {
          id: taskManager.currentId + 1,
          name: "feed puppy",
          description: "feed the puppy a heathy meal",
          assignedTo: "nick",
          dueDate: Date.now(),
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
          taskToKeep.name,
          taskToKeep.description,
          taskToKeep.assignedTo,
          taskToKeep.dueDate,
          taskToKeep.status
        );

        taskManager.deleteTask(taskToDelete.id);

        expect(taskManager.tasks).to.not.contain(taskToDelete);
      });
    });
  });

