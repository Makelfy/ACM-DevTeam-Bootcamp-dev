import { AppDataSource } from "../db/data-source.js";
import { OpaqueTokenSchema } from "../db/schemas/opaqueToken.schema.js";
import { UsersSchema } from "../db/schemas/users.schema.js";
import dotenv from "dotenv";
import { sendMail } from "../utils/sendMail.js";
dotenv.config();

const userRepository = AppDataSource.getRepository(UsersSchema);
const opaqueTokenRepository = AppDataSource.getRepository(OpaqueTokenSchema);

export const getMeService = async (userId) => {
  if (!userId) {
    return { adminEmail: process.env.ADMIN_EMAIL };
  } else {
    const user = await userRepository.findOne({ where: { id: userId } });
    return { id: userId, username: user.name, email: user.email };
  }
};

export const postElevatedTokenService = async (action, userId, appEmail) => {
  const user = await userRepository.findOne({ where: { id: userId } });

  const newToken = opaqueTokenRepository.create({
    userId,
    action,
    expiresAt: process.env.ELEVATED_TOKEN_TTL_MIN,
    used: false,
  });
  const savedToken = await opaqueTokenRepository.save(newToken);
  const emailLink = `${appEmail}/me/${action}/${savedToken.token}`;

  sendMail(user.email, "Elevated Token", emailLink);

  return true;
};

export const postChangeEmailService = async (userId, newEmail) => {
  const user = await userRepository.findOne({ where: { id: userId } });
  user.email = newEmail;
  await userRepository.save(user);
  return true;
};

export const postChangePasswordService = async (userId, newPassword) => {
  const user = await userRepository.findOne({ where: { id: userId } });
  user.password = newPassword;
  await userRepository.save(user);
  return true;
};
