import * as ProjectsRepository from "../repository/projects";
import { Request, Response } from "express";

import { User } from "@prisma/client";
import { createJWTUser } from "../utils/jwt";

export const createProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { projectname } = req.params;
  const { id } = req.body;

  try {
    const data = await ProjectsRepository.createProject(projectname, id);
    if (data) {
      res.json({ status: true, projectData: data });
    }
  } catch (error) {}
};

export const getProjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const data = await ProjectsRepository.getProjects(Number(id));
    if (data) {
      res.json({ status: true, projects: data });
    } else {
      res.json({ status: false });
    }
  } catch (e) {
    res.status(500).send("Erro");
  }
};

export const deleteProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const data = await ProjectsRepository.deleteProject(Number(id));
    if (data) {
      res.json({ status: true });
    }
  } catch (e) {
    res.status(500).send("Erro");
  }
};

export const getuniqueProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { slug } = req.params;

  try {
    const data = await ProjectsRepository.getProject(Number(slug));

    if (data) res.json({ status: data });
  } catch (e) {
    res.status(500).send("Erro");
  }
};
export const getFiles = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const data = await ProjectsRepository.getFiles(Number(id));

    if (data) {
      res.json({ status: true, files: data });
    } else {
      res.json({ status: false });
    }
  } catch (e) {
    res.status(500).send("Erro");
  }
};
