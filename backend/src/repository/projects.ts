import prisma from "./prisma";

import { Project } from "@prisma/client";

const { project: db } = prisma;

export const createProject = async (name: string, id: number) => {
  return db.create({
    data: {
      name: name,
      userId: id,
    },
  });
};

export const getProjects = async (id: number) => {
  return await db.findMany({
    where: {
      userId: id,
    },
    select: {
      id: true,
      name: true,
    },
  });
};

export const deleteProject = async (id: number) => {
  return await db.delete({
    where: {
      id,
    },
  });
};

export const getProject = async (slug: number) => {
  return await db.findUnique({
    where: {
      id: slug,
    },
    select: {
      chats: true,
      files: true,
    },
  });
};

export const getFiles = async (projectId: number) => {
  return await db.findMany({
    where: {
      id: projectId,
    },
    select: {
      files: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });
};
