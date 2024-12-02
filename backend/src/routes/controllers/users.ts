import * as UsersRepository from "../repository/users";
import { Request, Response } from "express";
import fs from "fs";
import { User } from "@prisma/client";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("api");
  console.log(req.body);

  try {
    const data = UsersRepository.createUser(req.body.values);
    res.json({ result: data });
  } catch (error) {}
  //   const createUser = UsersRepository.createUser;
};

// export const list = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const usersList = await UsersServices.getAllUsers();
//     usersList.forEach((element) => {
//       delete element.password;
//     });

//     res.json({ results: usersList });
//   } catch (e) {
//     res.status(500).send("Erro");
//   }
// };

// export const getByEmail = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   const userData = req.body;

//   try {
//     const data = await UsersServices.getByEmail(userData.values);
//     if (data.password == userData.values.password) {
//       res.json(true);
//     } else {
//       res.json(false);
//     }
//   } catch (e) {
//     console.log("nao: ");
//     console.log(e);
//     res.status(500).send("Erro");
//   }
// };

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
