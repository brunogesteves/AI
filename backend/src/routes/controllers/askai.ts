import * as AskAiRepository from "../repository/askai";
import * as GenerativeAi from "../generativeAi";
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
  const { question, slug, choosedFiles } = req.body;

  if (choosedFiles) {
    for (let index = 0; index < choosedFiles.length; index++) {
      switch (choosedFiles[index].split(".").pop()) {
        case "jpg":
          GenerativeAi.askaiImage(question, slug, choosedFiles);
          break;
        case "png":
          GenerativeAi.askaiImage(question, slug, choosedFiles);
          break;
        case "mp3":
          GenerativeAi.askaiSong(question, slug, choosedFiles);
          break;

        default:
          break;
      }
    }
  } else {
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

      if (data)
        res.json({ status: true, answer: resultsFromAi.response.text() });
    }
  }
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
