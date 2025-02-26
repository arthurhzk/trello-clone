import prisma from "../database/prisma-connection.js";
import bcrypt from "bcrypt";

export class UserModel {
  SALT_ROUNDS = 10;

  async create(data) {
    const { email, password } = data;

    try {
      const existingUser = await this.findUserByEmail(email);
      if (existingUser?.data?.length > 0) {
        return {
          status: false,
          code: 400,
          message: "Usuário já cadastrado",
        };
      }

      const hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS);
      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      return {
        status: true,
        code: 200,
        message: "Usuário criado com sucesso!",
        data: newUser,
      };
    } catch (error) {
      return this.handlePrismaError(error, "Erro ao criar usuário");
    }
  }

  async findUserByEmail(email) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (user === null) {
        return {
          status: false,
          code: 404,
          message: "Usuário não encontrado",
          data: user ?? [],
        };
      }

      return {
        status: true,
        code: 200,
        message: "Usuário encontrado",
        data: user,
      };
    } catch (error) {
      return this.handlePrismaError(error, "Erro ao buscar usuário");
    }
  }

  handlePrismaError(error, defaultMessage) {
    return {
      status: false,
      code: 500,
      message: defaultMessage,
    };
  }
}
