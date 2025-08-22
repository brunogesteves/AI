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
  const { question, projectId, choosedFile } = req.body;

  console.log(question);

  const history: IChatHistoryProps[] = [];

  const historyChatData = await AskAiRepository.getHistoryChat(projectId);

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

  const chat = model.startChat({
    history: history,
  });

  // switch (choosedFile.toLowerCase().split(".").pop()) {
  //   case "jpg":
  //     return GenerativeAi.askaiImage(res, question, projectId, choosedFile);
  //   case "png":
  //     return GenerativeAi.askaiImage(res, question, projectId, choosedFile);
  //   case "mp3":
  //     return GenerativeAi.askaiSong(res, question, projectId, choosedFile);
  //   case "csv":
  //     return GenerativeAi.askaiExcel(res, question, projectId, choosedFile);
  //   case "pdf":
  //     return GenerativeAi.askaiPDF(res, question, projectId, choosedFile);
  //   default:

  // console.log(
  //   "retorno from ai: ",
  //   await GenerativeAi.askchat(res, question, chat, projectId)
  // );
  return await GenerativeAi.askchat(res, question, chat, projectId);
  // }
};

export const reloadChat = async (
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
