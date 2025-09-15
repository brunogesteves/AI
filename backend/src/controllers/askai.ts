import * as AskAiRepository from "../repository/askai";
import * as GenerativeAi from "../routes/generativeAi";
import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

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
  const { question, projectId, choosedFiles, userId } = req.body;
  // console.log(question, projectId, choosedFiles, userId);
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  const answer = "alguma resposta longa";

  const wholeContent: string[] = [];

  for (let index = 0; index < choosedFiles.length; index++) {
    // const filePath = `http://localhost:3001/src/files/${userId}/${projectId}/${choosedFiles[index]}`;
    // console.log(filePath);
    const file = {
      question: question,
      projectId: projectId,
      userId: userId,
      fileName: choosedFiles[index],
    };

    switch (choosedFiles[index].toLowerCase().split(".").pop()) {
      case "jpg":
        return GenerativeAi.askaiImage(file);
      case "png":
        return GenerativeAi.askaiImage(file);
      case "mp3":
        return GenerativeAi.askaiSong(file);
      case "csv":
        return GenerativeAi.askaiExcel(file);
      case "pdf":
        return GenerativeAi.askaiPDF(file);
      default:
    }

    //     wholeContent.push(file)
  }
  res.json({ status: true, answer });

  console.log(wholeContent);
  // const history: IChatHistoryProps[] = [];

  // const historyChatData = await AskAiRepository.getHistoryChat(projectId);

  // if (historyChatData) {
  //   historyChatData.forEach((item) => {
  //     history.push(
  //       {
  //         role: "user",
  //         parts: [{ text: item.user }],
  //       },
  //       {
  //         role: "model",
  //         parts: [{ text: item.ai }],
  //       }
  //     );
  //   });
  // }

  // const chat = model.startChat({
  //   history: history,
  // });

  //   switch (choosedFile.toLowerCase().split(".").pop()) {
  //     case "jpg":
  //       return GenerativeAi.askaiImage(res, question, projectId, choosedFile);
  //     case "png":
  //       return GenerativeAi.askaiImage(res, question, projectId, choosedFile);
  //     case "mp3":
  //       return GenerativeAi.askaiSong(res, question, projectId, choosedFile);
  //     case "csv":
  //       return GenerativeAi.askaiExcel(res, question, projectId, choosedFile);
  //     case "pdf":
  //       return GenerativeAi.askaiPDF(res, question, projectId, choosedFile);
  //     default:

  //   console.log(
  //     "retorno from ai: ",
  //     await GenerativeAi.askchat(res, question, chat, projectId)
  //   );
  //   return await GenerativeAi.askchat(res, question, chat, projectId);
  //   }
};

export const reloadChat = async (
  req: Request,
  res: Response
): Promise<void> => {
  const history = [
    {
      user: "Pergunta 1",
      ai: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      user: "Pergunta 2",
      ai: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];
  // const { slug } = req.params;

  // try {
  //   const data = await AskAiRepository.getHistoryChat(Number(slug));

  //   if (data) {
  res.json({ status: true, chatHistory: history });
  //   } else {
  //     res.json({ status: false });
  //   }
  // } catch (e) {
  //   res.status(500).send("Erro");
  // }
};
