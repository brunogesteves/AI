import * as FilesRepository from "../repository/files";
import { Request, Response } from "express";
import fs from "fs";

export const saveFiles = async (req: Request, res: Response): Promise<void> => {
  const { userId, projectId } = req.body;

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
        projectId: Number(projectId),
      };

      const data = await FilesRepository.saveFiles(settingsFile);
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

export const deleteFile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { userId, filename } = req.query;

  try {
    const data = await FilesRepository.deleteFile(Number(id));
    fs.unlinkSync(`./src/files/${userId}/${filename}`);

    if (data) {
      res.json({ status: true });
    } else {
      res.json({ status: false });
    }
  } catch (e) {
    res.status(500).send("Erro");
  }
};
