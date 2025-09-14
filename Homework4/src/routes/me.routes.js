import express from "express";

import { getMeController } from "../controllers/me.controller.js";
import { validateAuthAccess } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", validateAuthAccess, getMeController);

export default router;
