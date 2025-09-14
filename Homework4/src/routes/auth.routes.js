import express from "express";

import { validate } from "../middlewares/validation.middleware.js";

import {
  createUserSchema,
  loginUserSchema,
} from "../middlewares/zodValidations/user-validations.js";
import {
  loginUserController,
  registerUserController,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", validate(createUserSchema), registerUserController);

router.post("/login", validate(loginUserSchema), loginUserController);

export default router;
