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
      chats: true,
      files: true,
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

// export const addUpdateEditor = async (data: User) => {
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(data.password, salt);
//   const { id, name, role, email, document, image } = data;
//   return await db.upsert({
//     where: {
//       id: Number(id),
//     },
//     update: {
//       name: name,
//       role: role,
//       email: email,
//       document: document,
//       password: hashedPassword,
//       image: image,
//     },
//     create: {
//       name: name,
//       role: role,
//       email: email,
//       document: document,
//       password: hashedPassword,
//       image: image,
//     },
//   });
// };

// export const updateNameImage = async (nameFile: string, id: number) => {
//   return await db.update({
//     where: {
//       id: id,
//     },
//     data: {
//       image: nameFile.toLowerCase(),
//     },
//   });
// };
