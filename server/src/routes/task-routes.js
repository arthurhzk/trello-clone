import { Router } from "express";
import { AddTaskController } from "../controllers/tasks/add-task-controller.js";
import { GetTasksByUserIDController } from "../controllers/tasks/get-tasks-by-user-id-controller.js";
import { DeleteTaskByUserIDController } from "../controllers/tasks/delete-task-by-user-id-controller.js";
import { AuthMiddleware } from "../middlewares/auth-middleware.js";
class TaskRoutes {
  router;

  constructor() {
    this.router = Router();
  }

  routes() {
    this.router.post("/add", AddTaskController.prototype.handle);
    this.router.get(
      "/list",
      AuthMiddleware.prototype.checkAuthentication,
      GetTasksByUserIDController.prototype.handle
    );
    this.router.delete(
      "/delete/:taskId",
      DeleteTaskByUserIDController.prototype.handle
    );

    return this.router;
  }
}

export const taskRoutes = new TaskRoutes();
