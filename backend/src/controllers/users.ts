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
  console.log("chamou api create");

  try {
    const isUserCreatedData = await UsersRepository.createUser(values);
    if (isUserCreatedData) {
      const token = createJWTUser(isUserCreatedData);
      console.log(token);
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
  console.log("api login: ", req.params);
  try {
    const loginUserData = await UsersRepository.loginUser(email);
    console.log("rep ret: ", loginUserData);
    if (loginUserData) {
      const correctPassword = await bcrypt.compare(
        password,
        loginUserData.password
      );
      console.log("correto [pasS: ", correctPassword);
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

  console.log("chamou api updateuser");

  try {
    const data = await UsersRepository.updateUser(values);

    if (data) {
      console.log("chamou api ret update rep", data);
      res.json({ status: true, userData: data });
    }
  } catch (e) {
    res.status(500).send("Erro");
  }
};

// export const resetPassword = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   const userData = req.body;

//   try {
//     const data = await UsersServices.findEmail(userData.values);
//     if (data) res.json({ status: data });
//   } catch (e) {
//     res.status(500).send("Erro");
//   }
// };

// export const addUpdateEditor = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   const userData: User = req.body;
//   userData.image = "";

//   try {
//     const data = await UsersServices.addUpdateEditor(userData);
//     if (data) {
//       console.log("ret:", data);

//       const updateNameImage = await UsersServices.updateNameImage(
//         `${data.name}_${data.id}.jpg`,
//         data.id
//       );
//       if (updateNameImage) {
//         fs.rename(
//           "src/files/users/tempuser.jpg",
//           `src/files/users/${data.name}_${data.id}.jpg`,
//           () => {
//             res.json({ status: true, message: "Updated" });
//           }
//         );
//       } else {
//         fs.unlink("src/files/users/tempuser.jpg", () =>
//           res.json({ message: "Try again" })
//         );
//       }
//     } else {
//       fs.unlink("src/files/users/tempuser.jpg", () =>
//         res.json({ message: "Try again" })
//       );
//     }
//   } catch (e) {
//     res.status(500).send("Erro");
//   }
// };
