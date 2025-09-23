import multer from "multer";
import path from "path";

import { remove } from "remove-accents";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/files/temp");
  },
  filename: (req, file, cb) => {
    const removeSpecialCharacters = remove(
      file.originalname
        .replace(/A©/g, "é")
        .replace(/Ã©/g, "é")
        .replace(/ /g, "_")
    );

    cb(
      null,
      removeSpecialCharacters + Date.now() + path.extname(file.originalname)
    );
  },
});

export const upload = multer({ storage: storage });
