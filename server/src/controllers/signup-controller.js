import { UserModel } from "../infra/schemas/user-model.js";

export class SignupController {
  async handle(req, res) {
    const { name, email, password, confirmPassword } = req.body;
    const requiredFields = ["name", "email", "password", "confirmPassword"];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).send({ error: `Campo ${field} é obrigatório` });
      }
    }
    if (password !== confirmPassword) {
      return res.status(400).send({ error: "Senhas não conferem" });
    }
    const createUser = await new UserModel().create(
      {
        name,
        email,
        password,
      },
      email
    );
    console.log(createUser);

    if (createUser.code === 400) {
      return res.status(400).send(createUser.message);
    }
    res.status(200).send("Usuário criado com sucesso!");
  }
}
