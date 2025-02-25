import { authRoutes } from "./routes/auth-routes.js";
const BASE_PATH = "/api";

export default (app) => {
  const routes = () => {
    app.use(BASE_PATH, authRoutes.routes());
  };
  routes();
};
