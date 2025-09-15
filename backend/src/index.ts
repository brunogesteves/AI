import express from "express";
import mysql from "mysql2";
import cors from "cors";
import * as dotenv from "dotenv";
import routes from "./routes";
const path = require("path");

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());

// Middleware to parse JSON data
app.use(express.json());
app.use(routes);

app.use("/files", express.static(path.join(__dirname, "files")));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
