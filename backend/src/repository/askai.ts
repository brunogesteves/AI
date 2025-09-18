import prisma from "./prisma";

import { Chat } from "@prisma/client";

const { chat: db } = prisma;
const { project: proj } = prisma;

export const saveChat = async (data: Omit<Chat, "id">) => {
  const res = await db.create({
    data: {
      ai: data.ai,
      user: data.user,
      projectId: data.projectId,
    },
    select: {
      id: false,
      user: false,
      ai: false,
      projectId: false,
      project: {
        include: {
          chats: {
            where: {
              projectId: data.projectId,
            },
            select: {
              ai: true,
              user: true,
            },
          },
        },
      },
    },
  });

  return res.project.chats;
};

export const getHistoryChat = async (projectId: number) => {
  const data = await proj.findFirst({
    where: {
      id: projectId,
    },

    select: {
      chats: {
        select: {
          ai: true,
          user: true,
        },
      },
    },
  });
  return data?.chats;
};
