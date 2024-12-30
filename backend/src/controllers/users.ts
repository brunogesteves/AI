import * as UsersRepository from "../repository/users";
import { Request, Response } from "express";

const bcrypt = require("bcrypt");

import { createJWTUser } from "../utils/jwt";
import { User } from "@prisma/client";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { values } = req.body;

  try {
    const isUserCreatedData = await UsersRepository.createUser(values);
    if (isUserCreatedData) {
      const token = createJWTUser(isUserCreatedData);
      res.json({ status: true, token: token });
    } else {
      res.json({ statu: false });
    }
  } catch (error) {
    res.json({ result: false });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.params;
  try {
    const loginUserData = await UsersRepository.loginUser(email);
    if (loginUserData) {
      const correctPassword = await bcrypt.compare(
        password,
        loginUserData.password
      );
      if (correctPassword) {
        const token = createJWTUser(loginUserData);
        res.json({ status: true, token });
      } else {
        res.json({ status: false });
      }
    }
  } catch (e) {
    res.json({ status: false });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { values } = req.body;

  try {
    const data = await UsersRepository.updateUser(values);

    if (data) {
      res.json({ status: true, userData: data });
    }
  } catch (e) {
    res.status(500).send("Erro");
  }
};
