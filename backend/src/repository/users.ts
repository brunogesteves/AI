import { hasSubscribers } from "diagnostics_channel";
import prisma from "./prisma";
const bcrypt = require("bcrypt");

import { User } from "@prisma/client";

const { user: db } = prisma;

interface UpdateProfile {
  id: number;
  firstname: string;
  lastname: string;
  birthDate: Date;
  oldPassword: string;
  newPassword: string;
}

export const createUser = async (
  values: User
): Promise<Omit<User, "password">> => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(values.password, salt);

  return await db.create({
    data: {
      birthDate: values.birthDate,
      email: values.email,
      firstname: values.firstname,
      lastname: values.lastname,
      password: hashedPassword,
      generations: 100,
    },
    select: {
      id: true,
      lastname: true,
      firstname: true,
      email: true,
      birthDate: true,
      generations: true,
    },
  });
};

export const loginUser = async (email: string): Promise<User> => {
  return await db.findFirstOrThrow({
    where: {
      email,
    },
  });
};

export const updateUser = async (data: UpdateProfile) => {
  const hasNewPassword =
    data.newPassword != ""
      ? await updatePassword(data.newPassword, data.oldPassword, data.id)
      : false;

  if (hasNewPassword == "Incorrect Password") {
    console.log("Incorrect Password");
    return false;
  } else {
    const hasUpdated = await db.update({
      where: {
        id: data.id,
      },
      data: {
        birthDate: data.birthDate,
        firstname: data.firstname,
        lastname: data.lastname,
      },
    });
    return hasUpdated;
  }
};

export const updatePassword = async (
  newPassword: string,
  oldPassword: string,
  id: number
) => {
  const salt = await bcrypt.genSalt(10);

  const recentPasswordHash = await db.findFirst({
    where: {
      id,
    },
    select: {
      password: true,
    },
  });
  const isCorrect = await bcrypt.compare(
    oldPassword,
    String(recentPasswordHash?.password)
  );

  return isCorrect
    ? await db.update({
        where: {
          id: id,
        },
        data: {
          password: await bcrypt.hash(newPassword, salt),
        },
      })
    : "Incorrect Password";
};
