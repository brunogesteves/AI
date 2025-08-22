import * as askAiRepository from "../repository/askai";
import { ChatSession, GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
// const pdfParse = require("pdf-parse");

import { Response } from "express";

import fs from "fs";
import path from "path";

const genAI = new GoogleGenerativeAI(process.env.API_KEY ?? "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// const fileManager = new GoogleAIFileManager(process.env.API_KEY ?? "");

export const askaiImage = async (
  res: Response,
  question: string,
  slug: string,
  file: string
): Promise<void> => {
  try {
    const fileContent = await fetch(
      `http://localhost:3001/src/files/${slug}/${file}`
    ).then((response) => response.arrayBuffer());

    const resultsFromAi = await model.generateContent([
      {
        inlineData: {
          data: Buffer.from(fileContent).toString("base64"),
          mimeType: "image/jpeg",
        },
      },
      question,
    ]);
    if (resultsFromAi) {
      const results = {
        ai: resultsFromAi.response.text(),
        user: question,
        projectId: Number(slug),
      };
      const data = askAiRepository.saveChat(results);
      if (!data) {
        res.json({ status: false });
      } else {
        res.json({ status: true, answer: resultsFromAi.response.text() });
      }
    }
  } catch (error) {}
};

export const askaiSong = async (
  res: Response,
  question: string,
  slug: string,
  file: string
): Promise<void> => {
  try {
    const filePath = `../files/${slug}/${file}`;
    const base64Buffer = fs.readFileSync(path.join(__dirname, filePath));

    const base64AudioFile = base64Buffer.toString("base64");

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const resultsFromAi = await model.generateContent([
      {
        inlineData: {
          mimeType: "audio/mp3",
          data: base64AudioFile,
        },
      },
      { text: question },
    ]);

    if (resultsFromAi) {
      const results = {
        ai: resultsFromAi.response.text(),
        user: question,
        projectId: Number(slug),
      };
      const data = askAiRepository.saveChat(results);
      if (!data) {
        res.json({ status: false });
      } else {
        res.json({ status: true, answer: resultsFromAi.response.text() });
      }
    }
  } catch (error) {}
};

export const askaiPDF = async (
  res: Response,
  question: string,
  slug: string,
  file: string
): Promise<void> => {
  try {
    const fileContent = await fetch(
      `http://localhost:3001/src/files/${slug}/${file}`
    ).then((response) => response.arrayBuffer());

    const resultsFromAi = await model.generateContent([
      {
        inlineData: {
          data: Buffer.from(fileContent).toString("base64"),
          mimeType: "application/pdf",
        },
      },
      "O documento fala sobre criminalidade?",
    ]);
    if (resultsFromAi) {
      const results = {
        ai: resultsFromAi.response.text(),
        user: question,
        projectId: Number(slug),
      };
      const data = askAiRepository.saveChat(results);
      if (!data) {
        res.json({ status: false });
      } else {
        res.json({ status: true, answer: resultsFromAi.response.text() });
      }
    }
  } catch (error) {}
};

export const askaiExcel = async (
  res: Response,
  question: string,
  slug: string,
  file: string
): Promise<void> => {
  try {
    const fileContent = await fetch(
      `http://localhost:3001/src/files/${slug}/${file}`
    ).then((response) => response.arrayBuffer());

    const resultsFromAi = await model.generateContent([
      {
        inlineData: {
          data: Buffer.from(fileContent).toString("base64"),
          mimeType: "text/csv",
        },
      },
      question,
    ]);
    if (resultsFromAi) {
      const results = {
        ai: resultsFromAi.response.text(),
        user: question,
        projectId: Number(slug),
      };
      const data = askAiRepository.saveChat(results);
      if (!data) {
        res.json({ status: false });
      } else {
        res.json({ status: true, answer: resultsFromAi.response.text() });
      }
    }
  } catch (error) {}
};

export const askchat = async (
  res: Response,
  question: string,
  chat: ChatSession,
  projectId: number
): Promise<void> => {
  console.log("chamou api");
  try {
    let resultsFromAi = await chat.sendMessage(question);
    if (resultsFromAi) {
      const results = {
        ai: resultsFromAi.response.text(),
        user: question,
        projectId: Number(projectId),
      };

      const data = askAiRepository.saveChat(results);
      if (!data) {
        res.json({ status: false });
      } else {
        res.json({ status: true, answer: results.ai });
      }
    }
  } catch (error) {}
};
