import prisma from "./prisma";

import { File } from "@prisma/client";

const { file: db } = prisma;

export const saveFiles = async (data: Omit<File, "id">) => {
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

export const deleteFile = async (fileId: number) => {
  return await db.delete({
    where: {
      id: fileId,
    },
  });
};
