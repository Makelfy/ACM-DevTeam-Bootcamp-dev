import { AppError } from "../middlewares/error.middleware.js";
import {
  getMeService,
  postChangeEmailService,
  postChangePasswordService,
  postElevatedTokenService,
} from "../services/me.service.js";

export const getMeController = async (req, res, next) => {
  try {
    const me = await getMeService(req.userId);
    res.status(200).json(me);
  } catch (error) {
    next(new AppError("Failed to get user info", 500));
  }
};

export const postElevatedTokenController = async (req, res, next) => {
  try {
    const { action } = req.body;
    const userId = req.userId;

    const protocol = req.protocol;
    const host = req.get("Host");
    const baseUrl = req.baseUrl;
    const appEmail = `${protocol}://${host}${baseUrl}`;

    const sentToken = await postElevatedTokenService(action, userId, appEmail);
    if (sentToken) {
      res.status(204).json();
    }
  } catch (error) {
    next(new AppError("Failed to send elevated token", 500));
  }
};

export const postChangeEmailController = async (req, res, next) => {
  try {
    const { newEmail } = req.body;
    const userId = req.userId;

    const changedEmail = await postChangeEmailService(userId, newEmail);
    if (!changedEmail) {
      new Error("Failed to change email", 500);
    }
    res.status(200).json({ id: userId, email: newEmail });
  } catch (error) {
    next(new AppError("Failed to change email", 500));
  }
};

export const postChangePasswordController = async (req, res, next) => {
  try {
    const { newPassword } = req.body;
    const userId = req.userId;
    const changedPassword = await postChangePasswordService(
      userId,
      newPassword
    );
    if (!changedPassword) {
      new Error("Failed to change password", 500);
    }
    res.status(200).json({ id: userId });
  } catch (error) {
    next(new AppError("Failed to change password", 500));
  }
};
