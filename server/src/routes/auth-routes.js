import { Router } from "express";
import { SignupController } from "../controllers/auth/signup-controller.js";
import { SigninController } from "../controllers/auth/signin-controller.js";
class AuthRoutes {
  router;

  constructor() {
    this.router = Router();
  }

  routes() {
    this.router.post("/signup", SignupController.prototype.handle);
    this.router.post("/signin", SigninController.prototype.handle);

    return this.router;
  }
}

export const authRoutes = new AuthRoutes();
