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
  });
};

export const getHistoryChat = async (slug: number) => {
  return await db.findMany({
    where: {
      projectId: Number(slug),
    },
    select: {
      ai: true,
      user: true,
    },
  });
};
