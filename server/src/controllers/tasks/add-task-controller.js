import { TaskModel } from "../../infra/models/task-model.js";

export class AddTaskController {
  async handle(req, res) {
    const { title, description, userId } = req.body;
    const requiredFields = ["title", "description", "userId"];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).send({ error: `Campo ${field} é obrigatório` });
      }
    }
    const response = await new TaskModel().addTask({
      title,
      description,
      completed: false,
      userId,
    });
    if (!response.status) {
      return res.status(response.code).send(response.message);
    }
    res
      .status(200)
      .send({ message: "Tarefa criada com sucesso!", data: response.data });
  }
}
