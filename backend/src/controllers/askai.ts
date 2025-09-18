import * as AskAiRepository from "../repository/askai";
import * as GenerativeAi from "../routes/generativeAi";

import { Request, Response } from "express";

interface IHistoryChat {
  ai: string;
  user: string;
}

interface IChatHistoryProps {
  role: string;
  parts: [{ text: string }];
}

export const answerQuestion = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { question, projectId, choosedFile, userId } = req.body;
  // console.log(question, projectId, choosedFiles, userId);
  // const answer = "alguma resposta longa";

  let historyChatData: IHistoryChat[] = [];
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
      historyChatData = [...(await GenerativeAi.askaiSong(file))];
      break;

    case "jpg":
      historyChatData = [...(await GenerativeAi.askaiImage(file))];
      break;

    case "png":
      historyChatData = [...(await GenerativeAi.askaiImage(file))];
      break;

    case "pdf":
      historyChatData = [...(await GenerativeAi.askaiPDF(file))];
      break;

    default:
  }

  if (historyChatData) {
    historyChatData.forEach((item) => {
      history.push(
        {
          role: "user",
          parts: [{ text: item.user }],
        },
        {
          role: "model",
          parts: [{ text: item?.ai }],
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
  // console.log(req.params);
  try {
    const history: IChatHistoryProps[] = [];

    const historyChatData = await AskAiRepository.getHistoryChat(
      Number(projectId)
    );

    if (historyChatData) {
      historyChatData?.forEach((item) => {
        history.push(
          {
            role: "user",
            parts: [{ text: item.user }],
          },
          {
            role: "model",
            parts: [{ text: item?.ai }],
          }
        );
      });
    }
    res.json({ status: true, chatHistory: history });
  } catch (error) {
    console.log(error);
  }
};
