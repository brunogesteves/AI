import * as askAiRepository from "../repository/askai";
// import { ChatSession, GoogleGenerativeAI } from "@google/generative-ai";
// import { GoogleAIFileManager } from "@google/generative-ai/server";
// // const pdfParse = require("pdf-parse");
import { GoogleGenAI } from "@google/genai";
import fs from "fs";

interface IFileProps {
  question: string;
  projectId: string;
  userId: string;
  fileName: string;
}

interface IHistoryChat {
  ai: string;
  user: string;
}

const ai = new GoogleGenAI({});

export const askaiImage = async (
  file: IFileProps
): Promise<string | IHistoryChat> => {
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

export const askaiSong = async (file: IFileProps): Promise<string> => {
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

    return resultsFromAi.text ?? "Erro ao processar essa canção";

    // if (resultsFromAi) {
    //   const results = {
    //     ai: resultsFromAi.response.text(),
    //     user: file.question,
    //     projectId: Number(file.projectId),
    //   };
    //   const data = askAiRepository.saveChat(results);
    //   if (!data) {
    //     res.json({ status: false });
    //   } else {
    //     res.json({ status: true, answer: resultsFromAi.response.text() });
    //   }
    // }
  } catch (error) {
    // console.log(error);
    return "Error ao processar essa canção";
  }
};

export const askaiPDF = async (file: IFileProps): Promise<IHistoryChat[]> => {
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
      }
    } else {
      return "Erro ao processar Image";
    }
  } catch (error) {
    return "Erro ao processar PDF";
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
