import { UserModel } from "../../infra/models/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class SigninController {
  async handle(req, res) {
    const { email, password } = req.body;
    const requiredFields = ["email", "password"];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).send({ error: `Campo ${field} é obrigatório` });
      }
    }

    const user = await new UserModel().findUserByEmail(email);
    if (user.data.length === 0) {
      return res.status(404).send({ error: "Usuário não encontrado" });
    }

    const doesPasswordMatch = await bcrypt.compare(
      password,
      user?.data?.password
    );
    if (!doesPasswordMatch) {
      return res.status(400).send({ error: "Senha incorreta" });
    }

    const token = jwt.sign(
      {
        email: user?.data?.email,
        password: user?.data?.password,
      },
      process.env.JWT_SECRET
    );

    req.session = { jwt: token };

    res.status(200).send({ message: "Login realizado com sucesso!", token });
  }
}
