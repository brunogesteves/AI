import { Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";

import * as AskAiRepository from "../repository/askai";
import * as GenerativeAi from "./generativeAi";
import { IChatHistoryProps, IHistoryChat } from "../utils/types";

const ai = new GoogleGenAI({});

export const answerQuestion = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { question, projectId, choosedFile, userId } = req.body;

  let historyChatData: IHistoryChat[] = [];
  const history: IChatHistoryProps[] = [];

  const file = {
    userId: userId,
    question: question,
    projectId: projectId,
    fileName: choosedFile,
  };

  switch (choosedFile.toLowerCase().split(".").pop()) {
    case "mp3":
      const MP3Data = await GenerativeAi.askaiPDF(file);

      if (typeof MP3Data == "string") {
        const oi = MP3Data;
      } else {
        historyChatData = [...MP3Data];
      }
      break;

    case "jpg":
      const JPGData = await GenerativeAi.askaiImage(file);

      if (typeof JPGData == "string") {
        const oi = JPGData;
      } else {
        historyChatData = [...JPGData];
      }
      break;

    case "png":
      const PNGData = await GenerativeAi.askaiImage(file);

      if (typeof PNGData == "string") {
        const oi = PNGData;
      } else {
        historyChatData = [...PNGData];
      }
      break;

    case "pdf":
      const pdfData = await GenerativeAi.askaiPDF(file);

      if (typeof pdfData == "string") {
        const oi = pdfData;
      } else {
        historyChatData = [...pdfData];
      }

      break;

    default:
      const justAsk = await GenerativeAi.askchat(file);

      if (typeof justAsk == "string") {
        const oi = justAsk;
      } else {
        historyChatData = [...justAsk];
      }
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

  const chat = ai.chats.create({
    model: "gemini-2.5-flash",
    history: [...history],
  });

  res.json({ status: true, answer: chat });
};

export const reloadChat = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { projectId } = req.params;

  try {
    const history: IChatHistoryProps[] = [];

    const historyChatData = await AskAiRepository.getHistoryChat(
      Number(projectId)
    );

    // console.log(historyChatData);

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
