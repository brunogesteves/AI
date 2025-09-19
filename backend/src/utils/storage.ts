import multer from "multer";

import { remove } from "remove-accents";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/files/temp");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(
      null,
      remove(
        file.originalname
          .replace(/A©/g, "é")
          .replace(/Ã©/g, "é")
          .replace(/ /g, "_")
      )
    );
  },
});

export const upload = multer({ storage: storage });
