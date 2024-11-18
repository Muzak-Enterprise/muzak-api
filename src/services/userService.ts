import { db } from "../database";
import { encryptionService } from "./encryptionService";

export type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

type UserDataType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const create = async (data: UserDataType): Promise<UserType> => {
  const { firstName, lastName, email, password } = data;

  const hashedPassword = await encryptionService.encryptPassword(password);

  const user = await db.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    },
  });

  return removePassword(user);
};

const modify = async (
  id: number,
  data: Partial<UserDataType>
): Promise<UserType> => {
  if (data.password) {
    data.password = await encryptionService.encryptPassword(data.password);
  }

  const user = await db.user.update({ where: { id }, data });

  return removePassword(user);
};

const removePassword = (user: UserType & { password: string }): UserType => {
  const { password, ...userWithoutPassword } = user;

  return userWithoutPassword;
};

const getUserById = async (id: number): Promise<UserType | null> => {
  const user = await db.user.findUnique({ where: { id } });

  return user ? removePassword(user) : null;
};

const getFullUserById = async (
  id: number
): Promise<(UserType & { password: string }) | null> => {
  const user = await db.user.findUnique({ where: { id } });

  return user;
};

export const userService = {
  create,
  modify,
  removePassword,
  getUserById,
  getFullUserById,
};
