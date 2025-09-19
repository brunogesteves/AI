import * as FilesRepository from "../repository/files";
import { Request, Response } from "express";
import fs from "fs";
import { remove } from "remove-accents";

export const saveFiles = async (req: Request, res: Response): Promise<void> => {
  const { projectId, userId } = req.body;

  try {
    if (req.file) {
      const filename = remove(
        req.file.originalname
          .replace(/A©/g, "é")
          .replace(/Ã©/g, "é")
          .replace(/ /g, "_")
      );
      const folderUser = `./src/files/${userId}/${projectId}`;
      const oldPath = `./src/files/temp/${filename}`;
      const newPath = `./src/files/${userId}/${projectId}/${filename}`;

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

  try {
    const data = await FilesRepository.deleteFile(Number(id));
    fs.unlinkSync(
      `./src/files/${data.Project?.userId}/${data.Project?.id}/${data.name}`
    );

    if (data) {
      res.json({ status: true });
    } else {
      res.json({ status: false });
    }
  } catch (e) {
    res.status(500).send("Erro");
  }
};
