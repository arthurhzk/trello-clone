import http from "http";
import cors from "cors";
import prisma from "./infra/database/prisma-connection.js";
import applicationRoutes from "./router.js";
export class Server {
  constructor(app) {
    this.app = app;
  }

  start() {
    this.startServer();
    this.routesMiddleware();
    this.setupDatabase();
  }

  startServer() {
    const server = http.createServer(this.app);
    server
      .listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
      })
      .on("error", (error) => {
        console.error(error);
      });
  }

  routesMiddleware() {
    this.app.use(cors());
    applicationRoutes(this.app);
  }
  async setupDatabase() {
    await prisma
      .$connect()
      .then(() => console.log("Prisma conectado com sucesso!"))
      .catch((error) => console.log(error));
  }
}
