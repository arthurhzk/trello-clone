import { TaskModel } from "../../infra/models/task-model.js";
export class GetTasksByUserIDController {
  async handle(req, res) {
    const { email } = req.currentUser;

    const fetchTasksByEmail = await new TaskModel().getTasksByEmail(email);

    if (fetchTasksByEmail.length === 0) {
      return res.status(204).send("Nenhuma task encontrada");
    }

    res.status(200).send(fetchTasksByEmail);
  }
}
