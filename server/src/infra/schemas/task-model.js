import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "../database/prisma-connection.js";

export class TaskModel {
  async addTask(task) {
    try {
      const response = await prisma.task.create({
        data: {
          title: task.title,
          description: task.description,
          completed: task.completed,
          user: {
            connect: { id: task.userId },
          },
        },
      });
      return {
        status: true,
        code: 200,
        message: "Tarefa criada com sucesso!",
        data: response,
      };
    } catch (error) {
      return this.handlePrismaError(error, "Erro ao criar tarefa");
    }
  }

  handlePrismaError(error, defaultMessage) {
    if (error instanceof PrismaClientKnownRequestError) {
      return {
        status: false,
        code: error.code,
        message: error.message,
      };
    }
    return {
      status: false,
      code: 500,
      message: defaultMessage,
    };
  }
}
