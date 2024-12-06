import * as UsersRepository from "../repository/users";
import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.API_KEY ?? "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const answerQuestion = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { question } = req.body;

  const result = await model.generateContent(question);
  res.json({ status: true, answer: result.response.text() });
};

// export const loginUser = async (req: Request, res: Response): Promise<void> => {
//   const { email, password } = req.params;

//   try {
//     const loginUserData = await UsersRepository.loginUser(email, password);
//     if (loginUserData) {
//       // const dataToken = {
//       //   firstname: loginUserData.firstname,
//       //   lastname: loginUserData.lastname,
//       //   email: loginUserData.email,
//       //   generations: loginUserData.generations,
//       //   birthDate: loginUserData.birthDate,
//       //   password: loginUserData.password,
//       // };
//       const token = createJWTUser(loginUserData);
//       res.json({ status: true, token });
//     } else {
//       res.json({ status: false });
//     }
//   } catch (e) {
//     res.status(500).send("Erro");
//   }
// };

// export const updateUser = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   const { values } = req.body;

//   try {
//     const data = await UsersRepository.updateUser(values);
//     if (data) {
//       res.json({ status: true });
//     }
//   } catch (e) {
//     res.status(500).send("Erro");
//   }
// };

// // export const resetPassword = async (
// //   req: Request,
// //   res: Response
// // ): Promise<void> => {
// //   const userData = req.body;

// //   try {
// //     const data = await UsersServices.findEmail(userData.values);
// //     if (data) res.json({ status: data });
// //   } catch (e) {
// //     res.status(500).send("Erro");
// //   }
// // };

// // export const addUpdateEditor = async (
// //   req: Request,
// //   res: Response
// // ): Promise<void> => {
// //   const userData: User = req.body;
// //   userData.image = "";

// //   try {
// //     const data = await UsersServices.addUpdateEditor(userData);
// //     if (data) {
// //       console.log("ret:", data);

// //       const updateNameImage = await UsersServices.updateNameImage(
// //         `${data.name}_${data.id}.jpg`,
// //         data.id
// //       );
// //       if (updateNameImage) {
// //         fs.rename(
// //           "src/files/users/tempuser.jpg",
// //           `src/files/users/${data.name}_${data.id}.jpg`,
// //           () => {
// //             res.json({ status: true, message: "Updated" });
// //           }
// //         );
// //       } else {
// //         fs.unlink("src/files/users/tempuser.jpg", () =>
// //           res.json({ message: "Try again" })
// //         );
// //       }
// //     } else {
// //       fs.unlink("src/files/users/tempuser.jpg", () =>
// //         res.json({ message: "Try again" })
// //       );
// //     }
// //   } catch (e) {
// //     res.status(500).send("Erro");
// //   }
// // };
