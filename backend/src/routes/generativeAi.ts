import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

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
  file: string
): Promise<void> => {
  console.log("chamou askai song");
  const filePath = `../files/${slug}/${file}`;
  const base64Buffer = fs.readFileSync(path.join(__dirname, filePath));

  const base64AudioFile = base64Buffer.toString("base64");

  // Initialize a Gemini model appropriate for your use case.
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  // Generate content using a prompt and the metadata of the uploaded file.
  const result = await model.generateContent([
    {
      inlineData: {
        mimeType: "audio/mp3",
        data: base64AudioFile,
      },
    },
    { text: "Please summarize the audio." },
  ]);

  // Print the response.
  console.log(result.response.text());
};

// const reader = require xlsx

// const file = reader.readFile("file")
// const sheets = file.SheetNames
// for(let i=0;sheets.lenght; i++){
// const data = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]) )

// data.forEacch((res)=>)={
// console.log(res)
// }

// }
