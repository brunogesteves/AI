import express from "express";
import mysql from "mysql2";
import cors from "cors";
import * as dotenv from "dotenv";
import routes from "./routes";

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());

// Middleware to parse JSON data
app.use(express.json());
app.use(routes);

app.use("/src/files", express.static("src/files/"));

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

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
