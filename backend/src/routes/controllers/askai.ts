import * as AskAiRepository from "../repository/askai";
import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.API_KEY ?? "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

interface IChatHistoryProps {
  role: string;
  parts: [{ text: string }];
}

export const answerQuestion = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { question, slug } = req.body;

  const history: IChatHistoryProps[] = [];

  const historyChatData = await AskAiRepository.getHistoryChat(slug);
  if (historyChatData) {
    historyChatData.forEach((item) => {
      history.push(
        {
          role: "user",
          parts: [{ text: item.user }],
        },
        {
          role: "model",
          parts: [{ text: item.ai }],
        }
      );
    });
  }
  console.log(history);

  const chat = model.startChat({
    history: history,
  });
  let resultsFromAi = await chat.sendMessage(question);

  if (resultsFromAi) {
    const results = {
      ai: resultsFromAi.response.text(),
      user: question,
      projectId: Number(slug),
    };
    const data = await AskAiRepository.saveChat(results);

    if (data) res.json({ status: true, answer: resultsFromAi.response.text() });
  }
};

export const getHistoryChat = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { slug } = req.params;

  try {
    const data = await AskAiRepository.getHistoryChat(Number(slug));

    if (data) {
      res.json({ status: true, chatHistory: data });
    } else {
      res.json({ status: false });
    }
  } catch (e) {
    res.status(500).send("Erro");
  }
};

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
