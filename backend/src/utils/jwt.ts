import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export const createJWTUser = (data: Omit<User, "password">) => {
  const token = jwt.sign(data, process.env.SECRET ?? "");
  return token;
};

export const createJWTUpdateUser = (data: Omit<User, "password">) => {
  const token = jwt.sign(data, process.env.SECRET ?? "");
  return token;
};
