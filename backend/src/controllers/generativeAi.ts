import * as askAiRepository from "../repository/askai";
// import { ChatSession, GoogleGenerativeAI } from "@google/generative-ai";
// import { GoogleAIFileManager } from "@google/generative-ai/server";
// // const pdfParse = require("pdf-parse");
import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import { IChatHistoryProps, IFileProps, IHistoryChat } from "../utils/types";

const ai = new GoogleGenAI({});

export const askaiImage = async (
  file: IFileProps
): Promise<string | IHistoryChat[]> => {
  const imageUrl = `http://localhost:3001/files/${file.userId}/${file.projectId}/${file.fileName}`;

  try {
    console.log("chamou Image: ");

    const response = await fetch(imageUrl);
    const imageArrayBuffer = await response.arrayBuffer();
    const base64ImageData = Buffer.from(imageArrayBuffer).toString("base64");

    const resultsFromAi = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          inlineData: {
            mimeType: "image/png",
            data: base64ImageData,
          },
        },
        { text: file.question },
      ],
    });
    if (resultsFromAi.text) {
      const data = {
        user: file.question,
        ai: resultsFromAi.text,
        projectId: Number(file.projectId),
      };
      const hasbeenStoragedData = await askAiRepository.saveChat(data);
      if (hasbeenStoragedData) {
        return hasbeenStoragedData;
      } else {
        return "Erro ao processar Image";
      }
    } else {
      return "Erro ao processar Image";
    }
  } catch (error) {
    return "Erro ao processar Image";
  }
};

export const askaiSong = async (
  file: IFileProps
): Promise<string | IHistoryChat[]> => {
  try {
    console.log("chamou MP3");

    const filePath = `src/files/${file.userId}/${file.projectId}/${file.fileName}`;

    const base64AudioFile = fs.readFileSync(filePath, {
      encoding: "base64",
    });

    const contents = [
      { text: file.question },
      {
        inlineData: {
          mimeType: "audio/mp3",
          data: base64AudioFile,
        },
      },
    ];

    const resultsFromAi = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
    });

    if (resultsFromAi.text) {
      const data = {
        user: file.question,
        ai: resultsFromAi.text,
        projectId: Number(file.projectId),
      };
      const hasbeenStoragedData = await askAiRepository.saveChat(data);

      if (hasbeenStoragedData) {
        return hasbeenStoragedData;
      } else {
        return "Erro ao processar áudio";
      }
    } else {
      return "Erro ao processar áudio";
    }
  } catch (error) {
    // console.log(error);
    return "Error ao processar essa canção";
  }
};

export const askaiPDF = async (
  file: IFileProps
): Promise<string | IHistoryChat[]> => {
  const imageUrl = `http://localhost:3001/files/${file.userId}/${file.projectId}/${file.fileName}`;

  try {
    console.log("chamou PDF");
    const pdfResp = await fetch(imageUrl).then((response) =>
      response.arrayBuffer()
    );
    const contents = [
      { text: file.question },
      {
        inlineData: {
          mimeType: "application/pdf",
          data: Buffer.from(pdfResp).toString("base64"),
        },
      },
    ];
    const resultsFromAi = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
    });

    if (resultsFromAi.text) {
      const data = {
        user: file.question,
        ai: resultsFromAi.text,
        projectId: Number(file.projectId),
      };
      const hasbeenStoragedData = await askAiRepository.saveChat(data);

      if (hasbeenStoragedData) {
        return hasbeenStoragedData;
      } else {
        return "Erro ao processar Image";
      }
    } else {
      return "Erro ao processar PDF";
    }
  } catch (error) {
    return "Erro ao processar PDF";
  }
};

export const askchat = async (
  file: IFileProps
): Promise<string | IHistoryChat[]> => {
  try {
    const history: IChatHistoryProps[] = [];
    const historyChatData = await askAiRepository.getHistoryChat(
      Number(file.projectId)
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

    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      history: [...history],
    });
    const resultsFromAi = await chat.sendMessage({
      message: file.question,
    });
    if (resultsFromAi.text) {
      const data = {
        user: file.question,
        ai: resultsFromAi.text,
        projectId: Number(file.projectId),
      };
      const hasbeenStoragedData = await askAiRepository.saveChat(data);
      if (hasbeenStoragedData) {
        return hasbeenStoragedData;
      } else {
        return "Erro ao processar Image";
      }
    } else {
      return "Erro ao processar Image";
    }
  } catch (error) {
    return "error";
  }
};
