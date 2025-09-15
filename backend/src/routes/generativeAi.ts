import * as askAiRepository from "../repository/askai";
// import { ChatSession, GoogleGenerativeAI } from "@google/generative-ai";
// import { GoogleAIFileManager } from "@google/generative-ai/server";
// // const pdfParse = require("pdf-parse");
import { Response } from "express";
import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";
import fs from "fs";
import path from "path";

import { access, constants } from "node:fs";
import { error } from "node:console";

interface IFileProps {
  question: string;
  projectId: string;
  userId: string;
  fileName: string;
}

const ai = new GoogleGenAI({});
// const genAI = new GoogleGenerativeAI(process.env.API_KEY ?? "");
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// const fileManager = new GoogleAIFileManager(process.env.API_KEY ?? "");

export const askaiImage = async (file: IFileProps): Promise<void> => {
  // Buscando algo a partir da raiz do projeto
  // const targetPath = path.join(
  //   projectRoot,
  //   file.userId,
  //   file.projectId,
  //   file.fileName
  // );
  console.log("chamou image");
  const filePath = `src/files/${file.userId}/${file.projectId}/${file.fileName}`;

  console.log(filePath);
  // console.log("chamou image: ");
  access(filePath, constants.F_OK, (err) => {
    console.log(`${file} ${err ? "does not exist" : "exists"}`);
  });

  try {
    console.log("chamou AI");
    const myfile = await ai.files.upload({
      file: filePath,
      config: { mimeType: "image/jpeg" },
    });
    console.log("chamou myfile: ", myfile);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: createUserContent([
        createPartFromUri(myfile.uri, myfile.mimeType),
        "Caption this image.",
      ]),
    });
    console.log(response.text);
  } catch (error) {
    console.log(error);
  }
  //   console.log(resultsFromAi);
  //   if (resultsFromAi) {
  //     const results = {
  //       ai: resultsFromAi.response.text(),
  //       user: file.question,
  //       projectId: Number(file.projectId),
  //     };
  //     const data = askAiRepository.saveChat(results);
  //     if (!data) {
  //       Response.json({ status: false });
  //     } else {
  //       Response.json({ status: true, answer: resultsFromAi.response.text() });
  //     }
  //   }
  // } catch (error) {}
};

// export const askaiSong = async (file: IFileProps): Promise<void> => {
//   try {
//     const filePath = `http://localhost:3001/src/files/${file.userId}/${file.projectId}/${file.fileName}`;
//     const base64Buffer = fs.readFileSync(path.join(__dirname, filePath));

//     const base64AudioFile = base64Buffer.toString("base64");

//     const model = genAI.getGenerativeModel({
//       model: "gemini-1.5-flash",
//     });

//     const resultsFromAi = await model.generateContent([
//       {
//         inlineData: {
//           mimeType: "audio/mp3",
//           data: base64AudioFile,
//         },
//       },
//       { text: file.question },
//     ]);

//     if (resultsFromAi) {
//       const results = {
//         ai: resultsFromAi.response.text(),
//         user: file.question,
//         projectId: Number(file.projectId),
//       };
//       const data = askAiRepository.saveChat(results);
//       if (!data) {
//         res.json({ status: false });
//       } else {
//         res.json({ status: true, answer: resultsFromAi.response.text() });
//       }
//     }
//   } catch (error) {}
// };

// export const askaiPDF = async (file: IFileProps): Promise<void> => {
//   try {
//     const fileContent = await fetch(
//       `http://localhost:3001/src/files/${file.userId}/${file.projectId}/${file.fileName}`
//     ).then((response) => response.arrayBuffer());

//     const resultsFromAi = await model.generateContent([
//       {
//         inlineData: {
//           data: Buffer.from(fileContent).toString("base64"),
//           mimeType: "application/pdf",
//         },
//       },
//       "O documento fala sobre criminalidade?",
//     ]);
//     if (resultsFromAi) {
//       const results = {
//         ai: resultsFromAi.response.text(),
//         user: file.question,
//         projectId: Number(file.projectId),
//       };
//       const data = askAiRepository.saveChat(results);
//       if (!data) {
//         res.json({ status: false });
//       } else {
//         res.json({ status: true, answer: resultsFromAi.response.text() });
//       }
//     }
//   } catch (error) {}
// };

// export const askaiExcel = async (file: IFileProps): Promise<void> => {
//   try {
//     const fileContent = await fetch(
//       `http://localhost:3001/src/files/${file.userId}/${file.projectId}/${file.fileName}`
//     ).then((response) => response.arrayBuffer());

//     const resultsFromAi = await model.generateContent([
//       {
//         inlineData: {
//           data: Buffer.from(fileContent).toString("base64"),
//           mimeType: "text/csv",
//         },
//       },
//       file.question,
//     ]);
//     if (resultsFromAi) {
//       const results = {
//         ai: resultsFromAi.response.text(),
//         user: file.question,
//         projectId: Number(file.projectId),
//       };
//       const data = askAiRepository.saveChat(results);
//       if (!data) {
//         res.json({ status: false });
//       } else {
//         res.json({ status: true, answer: resultsFromAi.response.text() });
//       }
//     }
//   } catch (error) {}
// };

// export const askchat = async (file: IFileProps): Promise<void> => {
//   try {
//     let resultsFromAi = await chat.sendMessage(file.question);
//     if (resultsFromAi) {
//       const results = {
//         ai: resultsFromAi.response.text(),
//         user: file.question,
//         projectId: Number(file.projectId),
//       };

//       const data = askAiRepository.saveChat(results);
//       if (!data) {
//         res.json({ status: false });
//       } else {
//         res.json({ status: true, answer: results.ai });
//       }
//     }
//   } catch (error) {}
// };
