import prisma from "./prisma";

import { File } from "@prisma/client";

const { file: db } = prisma;

export const saveFiles = async (data: Omit<File, "id">) => {
  console.log("rep: ", data);
  return await db.create({
    data: {
      name: data.name,
      projectId: data.projectId,
    },
    select: {
      name: true,
    },
  });
};

export const getFiles = async (projectId: number) => {
  console.log("rep get data: ", projectId);
  return await db.findMany({
    where: {
      projectId,
    },
    select: {
      name: true,
    },
  });
};
