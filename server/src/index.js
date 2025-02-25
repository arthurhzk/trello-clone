import express from "express";
import { Server } from "./setup-server.js";
class Application {
  initialize() {
    const app = express();
    app.use(express.json());
    const server = new Server(app);
    server.start();
  }
}

const application = new Application();
application.initialize();
