import { Router } from "express";
import { SignupController } from "../controllers/auth/signup-controller.js";
class AuthRoutes {
  router;

  constructor() {
    this.router = Router();
  }

  routes() {
    this.router.post("/signup", SignupController.prototype.handle);

    return this.router;
  }
}

export const authRoutes = new AuthRoutes();
