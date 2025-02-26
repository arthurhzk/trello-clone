import { Router } from "express";
import { SignupController } from "../controllers/auth/signup-controller.js";
import { SigninController } from "../controllers/auth/signin-controller.js";

class AuthRoutes {
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post("/signup", SignupController.prototype.handle);
    this.router.post("/signin", SigninController.prototype.handle);
  }
}

export default new AuthRoutes().router;
