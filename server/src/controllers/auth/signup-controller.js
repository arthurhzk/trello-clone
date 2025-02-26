import { UserModel } from "../../infra/models/user-model.js";
import { TaskModel } from "../../infra/models/task-model.js";
export class SignupController {
  async handle(req, res) {
    const { email, password, confirmPassword } = req.body;
    const requiredFields = ["email", "password", "confirmPassword"];
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
        email,
        password,
      },
      email
    );

    await new TaskModel().addTask(email, {
      title: "Bem-vindo ao Trello Clone",
      description: "Crie suas tarefas e organize seu dia",
      status: "TODO",
    });

    if (createUser.code !== 200) {
      return res.status(createUser.code).send(createUser.message);
    }
    res.status(200).send("Usuário criado com sucesso!");
  }
}
