import { AppError } from "../middlewares/error.middleware.js";
import {
  getAllUsersService,
  getUserTodosService,
  deleteUserService,
} from "../services/user.service.js";

export const getAllUsersController = async (req, res, next) => {
  try {
    const usersWithoutPasswords = await getAllUsersService();
    res.status(200).json(usersWithoutPasswords);
  } catch (error) {
    console.error("Error getting users:", error);
    next(new AppError("Failed to get users", 500));
  }
};

export const getUserTodosController = async (req, res, next) => {
  try {
    const userTodos = await getUserTodosService(req.validatedParams.id);
    res.status(200).json(userTodos);
  } catch (error) {
    console.error("Error getting user todos:", error);
    next(new AppError("Failed to get user todos", 500));
  }
};

export const deleteUserController = async (req, res, next) => {
  try {
    await deleteUserService(req.validatedParams.id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting user:", error);
    next(new AppError("Failed to delete user", 500));
  }
};
