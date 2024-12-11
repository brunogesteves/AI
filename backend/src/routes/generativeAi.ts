import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager, FileState } from "@google/generative-ai/server";

const genAI = new GoogleGenerativeAI(process.env.API_KEY ?? "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
export const askaiImage = async (
  question: string,
  slug: string,
  choosedFiles: string[]
): Promise<void> => {
  const imageResp = await fetch(
    `http://localhost:3001/src/files/${slug}/${choosedFiles}`
  ).then((response) => response.arrayBuffer());

  const result = await model.generateContent([
    {
      inlineData: {
        data: Buffer.from(imageResp).toString("base64"),
        mimeType: "image/jpeg",
      },
    },
    "Caption this image.",
  ]);
  console.log(result.response.text());
};

export const askaiSong = async (
  question: string,
  slug: string,
  choosedFiles: string
): Promise<void> => {
  console.log("chamou askai song");

  const fileManager = new GoogleAIFileManager(process.env.API_KEY ?? "");

  const uploadResult = await fileManager.uploadFile(
    `http://localhost:3001/src/files/9/3136.mp3`,
    {
      mimeType: "audio/mp3",
      displayName: "Audio sample",
    }
  );

  let file = await fileManager.getFile(uploadResult.file.name);
  while (file.state === FileState.PROCESSING) {
    process.stdout.write(".");
    // Sleep for 10 seconds
    await new Promise((resolve) => setTimeout(resolve, 10_000));
    // Fetch the file from the API again
    file = await fileManager.getFile(uploadResult.file.name);
  }

  if (file.state === FileState.FAILED) {
    throw new Error("Audio processing failed.");
  }

  // View the response.
  console.log(
    `Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri}`
  );

  const result = await model.generateContent([
    "Tell me about this audio clip.",
    {
      fileData: {
        fileUri: uploadResult.file.uri,
        mimeType: uploadResult.file.mimeType,
      },
    },
  ]);
  console.log(result.response.text());
};
