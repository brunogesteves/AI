import * as FilesRepository from "../repository/files";
import { Request, Response } from "express";
import fs from "fs";

export const saveFiles = async (req: Request, res: Response): Promise<void> => {
  console.log("chamou api");
  const { userId } = req.body;

  try {
    if (req.file) {
      const filename = req.file?.originalname;

      const folderUser = `./src/files/${userId}`;
      const oldPath = `./src/files/temp/${filename}`;
      const newPath = `./src/files/${userId}/${filename}`;

      if (!fs.existsSync(folderUser)) {
        fs.mkdirSync(folderUser);
      }
      fs.renameSync(oldPath, newPath);
      const settingsFile = {
        name: filename,
        projectId: Number(userId),
      };

      const data = await FilesRepository.saveFiles(settingsFile);
      console.log("ret rep: ", data);
      if (data) {
        res.json({ status: true, files: data });
      } else {
        fs.unlinkSync(oldPath);
        res.json({ status: false });
      }
    }
  } catch (e) {
    res.status(500).send("Erro");
  }
};

export const getFiles = async (req: Request, res: Response): Promise<void> => {
  console.log("chamou api get");
  const { slug } = req.params;

  try {
    const data = await FilesRepository.getFiles(Number(slug));
    console.log("ret rep get: ", data);
    if (data) {
      res.json({ status: true, files: data });
    } else {
      res.json({ status: false });
    }
  } catch (e) {
    res.status(500).send("Erro");
  }
};
