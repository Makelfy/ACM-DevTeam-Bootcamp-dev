import { AppDataSource } from "../db/data-source.js";
import { UsersSchema } from "../db/schemas/users.schema.js";
import dotenv from "dotenv";
dotenv.config();

const userRepository = AppDataSource.getRepository(UsersSchema);

export const getMeService = async (userId) => {
  if (!userId) {
    return { adminEmail: process.env.ADMIN_EMAIL };
  } else {
    const user = await userRepository.findOne({ where: { id: userId } });
    return { id: userId, username: user.name, email: user.email };
  }
};
