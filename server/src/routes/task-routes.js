import { Router } from "express";
import { AddTaskController } from "../controllers/tasks/add-task-controller.js";
import { GetTasksByUserIDController } from "../controllers/tasks/get-tasks-by-user-id-controller.js";
import { AuthMiddleware } from "../middlewares/auth-middleware.js";

class TaskRoutes {
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    const authMiddleware = new AuthMiddleware();

    this.router.post(
      "/add",
      authMiddleware.verifyUser.bind(authMiddleware),
      AddTaskController.prototype.handle
    );
    this.router.get(
      "/list",
      authMiddleware.verifyUser.bind(authMiddleware),
      GetTasksByUserIDController.prototype.handle
    );
  }
}

export default new TaskRoutes().router;
