import { UsersSchema } from "../db/schemas/users.schema.js";
import { TodosSchema } from "../db/schemas/todos.schema.js";
import { AppDataSource } from "../db/data-source.js";
import { getUserWithoutPassword } from "../utils/getUserWithoutPassword.js";

const userRepository = AppDataSource.getRepository(UsersSchema);
const todoRepository = AppDataSource.getRepository(TodosSchema);

export const getAllUsersService = async () => {
  const users = await userRepository.find();

  return users.map((user) => getUserWithoutPassword(user));
};

export const getUserTodosService = async (userId) => {
  const userTodos = await todoRepository.find({
    where: { userId: userId },
  });

  return userTodos;
};

export const deleteUserService = async (userId) => {
  const result = await userRepository.delete({ id: userId });

  if (result.affected === 0) {
    throw new Error("User not found");
  }

  return true;
};
