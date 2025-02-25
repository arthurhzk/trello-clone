import { TaskModel } from "../../infra/models/task-model.js";
export class GetTasksByUserIDController {
  async handle(req, res) {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).send({ error: "Campo userId é obrigatório" });
    }
    const response = await new TaskModel().getTasksByID(userId);
    if (!response.status) {
      return res.status(response.code).send(response.message);
    }
    res.status(200).send(response.data);
  }
}
