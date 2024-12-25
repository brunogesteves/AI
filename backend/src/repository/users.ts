import prisma from "./prisma";
const crypto = require("crypto");
const bcrypt = require("bcrypt");

import { User } from "@prisma/client";

const { user: db } = prisma;

export const createUser = async (values: User) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(values.password, salt);

  return db.create({
    data: {
      birthDate: values.birthDate,
      email: values.email,
      firstname: values.firstname,
      lastname: values.lastname,
      password: hashedPassword,
      generations: 100,
    },
  });
};

export const loginUser = async (email: string, password: string) => {
  const salt = await bcrypt.genSalt(10);

  const data = await db.findFirst({
    where: {
      email,
    },
  });
  if (data) {
    if (await bcrypt.compare(password, data.password)) {
      return data;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const updateUser = async (data: User) => {
  console.log("rep: ", data.password);

  if (data.password) {
    updatePassword(data.password, data.id);
  }
  return await db.update({
    where: {
      id: data.id,
    },
    data: {
      birthDate: data.birthDate,
      email: data.email,
      firstname: data.firstname,
      lastname: data.lastname,
      generations: data.generations,
    },
    select: {
      birthDate: true,
      firstname: true,
      lastname: true,
    },
  });
};

export const updatePassword = async (password: string, id: number) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  db.update({
    where: {
      id,
    },
    data: {
      password: hashedPassword,
    },
  });
};
