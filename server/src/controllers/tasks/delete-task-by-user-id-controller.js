export class DeleteTaskByUserIDController {
  async handle(req, res) {
    const { taskId } = req.params;
    if (!taskId) {
      return res.status(400).send({ error: "Campo taskId é obrigatório" });
    }
    const response = await new TaskModel().deleteTask(taskId);
    if (!response.status) {
      return res.status(response.code).send(response.message);
    }
    res.status(200).send(response.message);
  }
}
