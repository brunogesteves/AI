import prisma from "./prisma";

import { Chat } from "@prisma/client";

const { chat: db } = prisma;

export const saveChat = async (data: Omit<Chat, "id">) => {
  return await db.create({
    data: {
      ai: data.ai,
      user: data.user,
      projectId: data.projectId,
    },
    select: {
      user: true,
      ai: true,
    },
  });
};

export const getHistoryChat = async (projectId: any) => {
  const data = await db.findFirst({
    where: {
      projectId: Number(projectId),
    },
    select: {
      ai: true,
      user: true,
    },
  });
  console.log(data);
  return data;
};
