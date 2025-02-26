import { TaskModel } from "../../infra/models/task-model.js";

export class AddTaskController {
  async handle(req, res) {
    const { title, description, status } = req.body;
    const { email } = req.currentUser;
    const requiredFields = ["title", "description", "status"];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).send({ error: `Campo ${field} é obrigatório` });
      }
    }
    if (!email) {
      return res.status(401).send({ error: "Usuário não autenticado" });
    }
    const response = await new TaskModel().addTask(email, {
      title,
      description,
      status,
    });
    if (!response.status) {
      return res.status(response.code).send(response.message);
    }
    res
      .status(200)
      .send({ message: "Tarefa criada com sucesso!", data: response.data });
  }
}
