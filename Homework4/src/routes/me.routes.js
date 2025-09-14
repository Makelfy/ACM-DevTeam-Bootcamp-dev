import express from "express";

import {
  getMeController,
  postChangeEmailController,
  postChangePasswordController,
  postElevatedTokenController,
} from "../controllers/me.controller.js";
import {
  validateAuthAccess,
  validateAuthElevated,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", validateAuthAccess, getMeController);

router.post(
  "/request-elevated-token",
  validateAuthAccess,
  postElevatedTokenController
);

router.post(
  "/change-email/:token",
  validateAuthAccess,
  validateAuthElevated("change-email"),
  postChangeEmailController
);

router.post(
  "/change-password/:token",
  validateAuthAccess,
  validateAuthElevated("change-password"),
  postChangePasswordController
);

export default router;
