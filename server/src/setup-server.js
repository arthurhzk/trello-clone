import http from "http";
import cors from "cors";

export class Server {
  constructor(app) {
    this.app = app;
  }

  start() {
    this.startServer();
    this.routesMiddleware();
  }

  startServer() {
    const server = http.createServer(this.app);
    server
      .listen(3000, () => {
        console.log("Server is running on port 3000");
      })
      .on("error", (error) => {
        console.error(error);
      });
  }

  routesMiddleware() {
    this.app.use(cors());
  }
}
