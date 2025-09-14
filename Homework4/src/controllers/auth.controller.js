import { AppError } from "../middlewares/error.middleware.js";
import {
  loginUserService,
  registerUserService,
} from "../services/auth.service.js";

export const registerUserController = async (req, res, next) => {
  try {
    const savedUser = await registerUserService(req.validatedBody);
    res.status(201).json({
      id: savedUser.id,
      username: savedUser.username,
      email: savedUser.email,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    next(new AppError("Failed to create user", 500));
  }
};

export const loginUserController = async (req, res, next) => {
  try {
    const token = await loginUserService(req.validatedBody);
    res.status(200).json(token);
  } catch (error) {
    console.error("Error logging in user:", error);
    next(new AppError("Failed to log in user", 500));
  }
};
