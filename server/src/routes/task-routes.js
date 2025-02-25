import { Router } from "express";
import { AddTaskController } from "../controllers/tasks/add-task-controller.js";
class TaskRoutes {
  router;

  constructor() {
    this.router = Router();
  }

  routes() {
    this.router.post("/add", AddTaskController.prototype.handle);

    return this.router;
  }
}

export const taskRoutes = new TaskRoutes();
