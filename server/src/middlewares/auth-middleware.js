import jwt from "jsonwebtoken";

export class AuthMiddleware {
  verifyUser(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .send({ error: "Token não encontrado, tente novamente!" });
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.currentUser = payload;
    } catch (error) {
      return res
        .status(401)
        .send({ error: "Token é inválido, tente novamente!." });
    }
    next();
  }

  checkAuthentication(req, res, next) {
    if (!req.currentUser) {
      return res
        .status(401)
        .send({ error: "Autenticação é necessária para acessar esta rota." });
    }
    next();
  }
}
