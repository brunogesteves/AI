import * as askAiRepository from "../repository/askai";
// import { ChatSession, GoogleGenerativeAI } from "@google/generative-ai";
// import { GoogleAIFileManager } from "@google/generative-ai/server";
// // const pdfParse = require("pdf-parse");
import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";
import fs from "fs";
import path from "path";

interface IFileProps {
  question: string;
  projectId: string;
  userId: string;
  fileName: string;
}

const ai = new GoogleGenAI({});

export const askaiImage = async (file: IFileProps) => {
  console.log("chamou image");
  const imageUrl = `http://localhost:3001/files/${file.userId}/${file.projectId}/${file.fileName}`;

  try {
    console.log("chamou Image: ");

    const response = await fetch(imageUrl);
    const imageArrayBuffer = await response.arrayBuffer();
    const base64ImageData = Buffer.from(imageArrayBuffer).toString("base64");

    const answer = await ai.models.generateContent({
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
    return answer.text ?? "";
  } catch (error) {
    return "Erro ao processar Image";
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

export const askaiPDF = async (file: IFileProps): Promise<string> => {
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

    return resultsFromAi.text ?? "";
  } catch (error) {
    return "Erro ao processar PDF";
  }
};

export const askaiExcel = async (file: IFileProps): Promise<void> => {
  console.log("chamou Excel");
  const imageUrl = `http://localhost:3001/files/${file.userId}/${file.projectId}/${file.fileName}`;
  console.log(imageUrl);
  console.log(imageUrl.toLowerCase().split(".").pop());
  try {
    const pdfResp = await fetch(imageUrl).then((response) =>
      response.arrayBuffer()
    );

    const fileContent = [
      { text: file.question },
      {
        inlineData: {
          mimeType: `application/${imageUrl.toLowerCase().split(".").pop()}`,
          data: Buffer.from(pdfResp).toString("base64"),
        },
      },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: fileContent,
    });
    console.log(response.text);
    // if (resultsFromAi) {
    //   console.log(resultsFromAi);
    //   const results = {
    //     ai: resultsFromAi.text,
    //     user: file.question,
    //     projectId: Number(file.projectId),
    //   };
    //   const data = askAiRepository.saveChat(results);
    //   if (!data) {
    //     res.json({ status: false });
    //   } else {
    //     res.json({ status: true, answer: resultsFromAi.text() });
  } catch (error) {
    console.log(error);
  }
};

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
