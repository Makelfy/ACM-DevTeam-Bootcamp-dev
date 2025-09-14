import express from "express";

import { userParamsSchema } from "../middlewares/zodValidations/user-validations.js";

import { todoQuerySchema } from "../middlewares/zodValidations/todo-validations.js";

import {
  validate,
  validateUserId,
} from "../middlewares/validation.middleware.js";
import {
  deleteUserController,
  getAllUsersController,
  getUserTodosController,
} from "../controllers/user.controller.js";

const router = express.Router();
router.get("/", getAllUsersController);

router.get(
  "/:id/todos",
  validate(userParamsSchema),
  validateUserId,
  validate(todoQuerySchema),
  getUserTodosController
);

router.delete(
  "/:id",
  validate(userParamsSchema),
  validateUserId,
  deleteUserController
);

export default router;
