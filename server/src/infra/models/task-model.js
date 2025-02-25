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
  async updateTask(task) {
    try {
      const response = await prisma.task.update({
        where: {
          id: task.id,
        },
        data: {
          title: task.title,
          description: task.description,
          completed: task.completed,
        },
      });
      return {
        status: true,
        code: 200,
        message: "Tarefa atualizada com sucesso!",
        data: response,
      };
    } catch (error) {
      return this.handlePrismaError(error, "Erro ao atualizar tarefa");
    }
  }
  async deleteTask(taskId) {
    try {
      const response = await prisma.task.delete({
        where: {
          id: taskId,
        },
      });
      return {
        status: true,
        code: 200,
        message: "Tarefa deletada com sucesso!",
        data: response,
      };
    } catch (error) {
      return this.handlePrismaError(error, "Erro ao deletar tarefa");
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
  getTasksByID(userId) {
    return prisma.task.findMany({
      where: {
        userId,
      },
    });
  }
}
