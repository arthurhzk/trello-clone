import prisma from "../database/prisma-connection.js";

export class UserModel {
  async create(data, email) {
    try {
      const existingUser = await this.findUserByEmail(email);
      if (existingUser !== null) {
        return {
          status: false,
          code: 400,
          message: "Usuário já cadastrado",
        };
      }

      const newUser = await prisma.user.create({
        data: {
          name: data.name ?? "",
          email: data.email,
          password: data.password,
        },
      });

      return {
        status: true,
        code: 200,
        message: "Usuário criado com sucesso!",
        data: newUser,
      };
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      return {
        status: false,
        code: 500,
        message: "Erro ao criar usuário",
      };
    }
  }

  async findUserByEmail(email) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      return user;
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      throw error;
    }
  }
}
