import { AppError } from "../middlewares/error.middleware.js";
import { getMeService } from "../services/me.service.js";

export const getMeController = async (req, res, next) => {
  try {
    const me = await getMeService(req.userId);
    res.status(200).json(me);
  } catch (error) {
    next(new AppError("Failed to get user info", 500));
  }
};
