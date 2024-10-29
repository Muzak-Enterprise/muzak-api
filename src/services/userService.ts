import prisma from "../prisma";
import { encryptPassword } from "./encryptionService";

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

export const removePassword = (
  user: UserType & { password: string }
): UserType => {
  const { password, ...userWithoutPassword } = user;

  return userWithoutPassword;
};

export const createUser = async (data: CreateUserType): Promise<UserType> => {
  const { firstName, lastName, email, password } = data;

  const hashedPassword = await encryptPassword(password);

  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    },
  });

  return removePassword(user);
};
