import { db } from "../database";
import { encryptionService } from "./encryptionService";

export type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

type FullUserType = UserType & { password: string };

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

const removePassword = (user: FullUserType): UserType => {
  const { password, ...userWithoutPassword } = user;

  return userWithoutPassword;
};

const getUserByEmail = async (email: string): Promise<UserType | null> => {
  const user = await _getFullUser({ email });

  return user ? removePassword(user) : null;
};

const getFullUserByEmail = async (
  email: string
): Promise<FullUserType | null> => {
  const user = await _getFullUser({ email });

  return user;
};

const getUserById = async (id: number): Promise<UserType | null> => {
  const user = await _getFullUser({ id });

  return user ? removePassword(user) : null;
};

const getFullUserById = async (id: number): Promise<FullUserType | null> => {
  const user = await _getFullUser({ id });

  return user;
};

const _getFullUser = async ({
  id,
  email,
}: {
  id?: number;
  email?: string;
}): Promise<FullUserType | null> => {
  const user = await db.user.findUnique({
    where: {
      id,
      email,
    },
    include: {
      userGroups: {
        select: {
          id: true,
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      },
    },
  });

  return user;
};

export const userService = {
  create,
  modify,
  removePassword,
  getUserByEmail,
  getFullUserByEmail,
  getUserById,
  getFullUserById,
};
