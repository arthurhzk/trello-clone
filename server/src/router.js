import { authRoutes } from "./routes/auth-routes.js";
import { taskRoutes } from "./routes/task-routes.js";
const BASE_PATH = "/api";

export default (app) => {
  const routes = () => {
    app.use(BASE_PATH, authRoutes.routes());
    app.use(BASE_PATH, taskRoutes.routes());
  };
  routes();
};
