import * as AskAiRepository from "../repository/askai";
import * as GenerativeAi from "../routes/generativeAi";

import { Request, Response } from "express";

interface IFileProps {
  req: Request;
  res: Response;
  question: string;
  projectId: string;
  userId: string;
  fileName: string;
}
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { GoogleAIFileManager } from "@google/generative-ai/server";

// const genAI = new GoogleGenerativeAI(process.env.API_KEY ?? "");
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

interface IChatHistoryProps {
  role: string;
  parts: [{ text: string }];
}

interface IHistoryChat {
  ai: string;
  user: string;
}

export const answerQuestion = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { question, projectId, choosedFile, userId } = req.body;
  // console.log(question, projectId, choosedFiles, userId);
  // const answer = "alguma resposta longa";

  const historyChatData = [];
  const history: IChatHistoryProps[] = [];

  const file = {
    userId: userId,
    question: question,
    projectId: projectId,
    fileName: choosedFile,
  };

  console.table(file);

  switch (choosedFile.toLowerCase().split(".").pop()) {
    case "mp3":
      historyChatData.push(await GenerativeAi.askaiSong(file));
      break;

    case "jpg":
      historyChatData.push(await GenerativeAi.askaiImage(file));
      break;

    case "png":
      historyChatData.push(await GenerativeAi.askaiImage(file));
      break;

    case "pdf":
      historyChatData.push(await GenerativeAi.askaiPDF(file));
      break;

    default:
  }

  if (historyChatData) {
    historyChatData.forEach((item) => {
      history.push(
        {
          role: "user",
          parts: [{ text: item?.toString() }],
        },
        {
          role: "model",
          parts: [{ text: item?.toString() }],
        }
      );
    });
  }

  res.json({ status: true, answer: history });

  // const chat = model.startChat({
  //   history: history,
  // });

  //   return await GenerativeAi.askchat(res, question, chat, projectId);
  //   }
};

export const reloadChat = async (
  req: Request,
  res: Response
): Promise<void> => {
  const historyTeste = [
    {
      user: "Pergunta 1",
      ai: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      user: "Pergunta 2",
      ai: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];
  const { projectId } = req.params;
  console.log(req.params);
  try {
    const history: IChatHistoryProps[] = [];

    const historyChatData = [
      await AskAiRepository.getHistoryChat(Number(projectId)),
    ];

    if (historyChatData) {
      historyChatData.forEach((item) => {
        history.push(
          {
            role: "user",
            parts: [{ text: item?.user ?? "" }],
          },
          {
            role: "model",
            parts: [{ text: item?.ai ?? "" }],
          }
        );
      });
    }
    res.json({ status: true, chatHistory: history });
  } catch (error) {
    console.log(error);
  }
};
