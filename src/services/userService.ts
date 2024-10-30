import { db } from "../database";
import { encryptionService } from "./encryptionService";

export type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

type CreateUserType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const removePassword = (user: UserType & { password: string }): UserType => {
  const { password, ...userWithoutPassword } = user;

  return userWithoutPassword;
};

const createUser = async (data: CreateUserType): Promise<UserType> => {
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

const getUserById = async (id: number): Promise<UserType | null> => {
  const user = await db.user.findUnique({ where: { id } });

  return user ? removePassword(user) : null;
};

export const userService = {
  removePassword,
  createUser,
  getUserById,
};
