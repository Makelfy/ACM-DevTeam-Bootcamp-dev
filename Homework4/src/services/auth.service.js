import bcrypt from "bcryptjs";
import { UsersSchema } from "../db/schemas/users.schema.js";
import { AppDataSource } from "../db/data-source.js";
import { getUserWithoutPassword } from "../utils/getUserWithoutPassword.js";
import jwt from "jsonwebtoken";

const userRepository = AppDataSource.getRepository(UsersSchema);

export const registerUserService = async (userData) => {
  const { username, email, password } = userData;

  const existingUser = await userRepository.findOne({
    where: { email: email },
  });
  if (existingUser) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = userRepository.create({
    username,
    email,
    password: hashedPassword,
  });
  const savedUser = await userRepository.save(newUser);

  return getUserWithoutPassword(savedUser);
};

export const loginUserService = async (loginData) => {
  const { email, password } = loginData;

  const user = await userRepository.findOne({
    where: { email: email },
  });

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const payload = {
      isAdmin: true,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return { token };
  }

  if (!user) {
    throw new Error("Email not found");
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error("Invalid password");
  }

  const payload = {
    userId: user.id,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return { token };
};
