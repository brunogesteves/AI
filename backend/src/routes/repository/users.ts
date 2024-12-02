import prisma from "./prisma";

import { User } from "@prisma/client";

const { user: db } = prisma;

interface LoginProps {
  email: string;
  password: string;
}
export const createUser = async (values: User) => {
  console.log("rep: ", values);
  const crypto = require("crypto");

  const DATA_ENCRYPTION = {
    algorithm: "aes256",
    secret: "beans",
    type: "hex",
  };

  const cipher = crypto.createCipher(
    DATA_ENCRYPTION.algorithm,
    DATA_ENCRYPTION.secret
  );
  cipher.update(values.password);

  return db.create({
    data: {
      birthDate: values.birthDate,
      email: values.email,
      firstname: values.firstname,
      lastname: values.lastname,
      password: cipher.final(DATA_ENCRYPTION.type),
      generations: 100,
    },
  });
};

// export const getAllUsers = async () => {
//   return await db.findMany({
//     where: {
//       role: "editor",
//     },
//   });
// };

// export const getByEmail = async (data: LoginProps) => {
//   return await db.findFirstOrThrow({
//     where: {
//       email: data.email,
//     },
//     select: {
//       password: true,
//     },
//   });
// };

// export const updatePassword = async (data: LoginProps) => {
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(data.password, salt);
//   const userId = await db.findFirst({
//     where: {
//       email: data.email,
//     },
//   });

//   const saveNewPassword = await db.update({
//     where: {
//       id: userId.id,
//     },
//     data: {
//       password: hashedPassword,
//     },
//   });

//   if (saveNewPassword) {
//     const { id, name, role, document, image, email } = saveNewPassword;
//     return createJWT(id, name, role, document, image, email);
//   }
// };

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
