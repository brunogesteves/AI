import * as ProjectsRepository from "../repository/projects";
import { Request, Response } from "express";

import { User } from "@prisma/client";
import { createJWTUser } from "../../utils/jwt";

export const createProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { projectname } = req.params;
  const { id } = req.body;

  try {
    const data = await ProjectsRepository.createProject(projectname, id);
    if (data) {
      res.json({ status: true });
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

// // export const addUpdateEditor = async (
// //   req: Request,
// //   res: Response
// // ): Promise<void> => {
// //   const userData: User = req.body;
// //   userData.image = "";

// //   try {
// //     const data = await UsersServices.addUpdateEditor(userData);
// //     if (data) {
// //       console.log("ret:", data);

// //       const updateNameImage = await UsersServices.updateNameImage(
// //         `${data.name}_${data.id}.jpg`,
// //         data.id
// //       );
// //       if (updateNameImage) {
// //         fs.rename(
// //           "src/files/users/tempuser.jpg",
// //           `src/files/users/${data.name}_${data.id}.jpg`,
// //           () => {
// //             res.json({ status: true, message: "Updated" });
// //           }
// //         );
// //       } else {
// //         fs.unlink("src/files/users/tempuser.jpg", () =>
// //           res.json({ message: "Try again" })
// //         );
// //       }
// //     } else {
// //       fs.unlink("src/files/users/tempuser.jpg", () =>
// //         res.json({ message: "Try again" })
// //       );
// //     }
// //   } catch (e) {
// //     res.status(500).send("Erro");
// //   }
// // };
