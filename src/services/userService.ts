import { db } from "../database";
import { encryptionService } from "./encryptionService";

type UserDataType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const select = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  createdAt: true,
  updatedAt: true,

  userGroups: true,
  reservations: true,
  addresses: true,
} as const;

const create = async (data: UserDataType) => {
  const { firstName, lastName, email, password } = data;

  const hashedPassword = await encryptionService.encryptPassword(password);

  const user = await db.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    },
    select,
  });

  return user;
};

const modify = async (id: number, data: Partial<UserDataType>) => {
  if (data.password) {
    data.password = await encryptionService.encryptPassword(data.password);
  }

  const user = await db.user.update({
    where: { id },
    data,
    select,
  });

  return user;
};

const getAllUsers = async () => {
  const users = await db.user.findMany({
    select,
  });

  return users;
};

const getUserByEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: { email },
    select,
  });

  return user;
};

const getFullUserByEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: { email },
    select: { ...select, password: true },
  });
  return user;
};

const getUserById = async (id: number) => {
  const user = await db.user.findUnique({
    where: { id },
    select,
  });
  return user;
};

const getFullUserById = async (id: number) => {
  const user = await db.user.findUnique({
    where: { id },
    select: { ...select, password: true },
  });
  return user;
};

export const userService = {
  select,
  create,
  modify,
  getUserByEmail,
  getFullUserByEmail,
  getUserById,
  getFullUserById,
  getAllUsers,
};
