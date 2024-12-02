import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express";
import mysql from "mysql2";
import cors from "cors";
import * as dotenv from "dotenv";
import routes from "./routes";

dotenv.config();

const app = express();
const port = 3001;
const genAI = new GoogleGenerativeAI(process.env.API_KEY ?? "");

app.use(cors());

// Middleware to parse JSON data
app.use(express.json());
app.use(routes);

// Create a MySQL connection
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root", // replace with your MySQL username
//   password: "", // replace with your MySQL password
//   database: "videos", // the name of your database
// });

// Connect to MySQL
// db.connect((err) => {
//   if (err) {
//     console.error("Error connecting to MySQL:", err);
//     return;
//   }
//   console.log("Connected to MySQL");
// });

async function AiAnswers(question: string) {
  const prompt = question;
  const result = await model.generateContent(prompt);
  return result.response.text();
}

app.post("/askai", async (req, res) => {
  const { question } = req.body;
  // const answer = await AiAnswers(question);
  // if(answer){
  // const questAns = [question, answer];
  //copia no banco de dados
  // }
  const answer = "oi";

  const questAns = [question, answer];
  console.log(questAns);
  res.json({ answer });
});

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
