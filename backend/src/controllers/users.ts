import * as UsersRepository from "../repository/users";
import { Request, Response } from "express";

const bcrypt = require("bcrypt");

import { createJWTUser } from "../utils/jwt";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { data } = req.body;
  try {
    const isUserCreatedData = await UsersRepository.createUser(data);
    if (isUserCreatedData) {
      const token = createJWTUser(isUserCreatedData);
      res.json({ status: true, token: token });
    } else {
      res.json({ status: false });
    }
  } catch (error) {
    res.json({ result: false });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.params;
  console.table(req.params);

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
  const { data } = req.body;

  try {
    const updateData = await UsersRepository.updateUser(data);
    if (updateData) {
      const token = createJWTUser(data);
      res.json({ status: true, token });
    } else {
      res.json({ status: false, message: updateData });
    }
  } catch (e) {
    res.status(500).send("Erro");
  }
};
