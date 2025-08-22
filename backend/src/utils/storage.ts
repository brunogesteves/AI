import multer from "multer";

import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/files/temp");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname.replace(" ", "_"));
  },
});

export const upload = multer({ storage: storage });
