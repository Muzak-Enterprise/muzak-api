import { db } from "../database";
import { userService } from "./userService";

export type GroupData = {
  name: string;
  description: string;
  userId: number;
  instruments: number[];
  genres: number[];
};

const select = {
  id: true,
  name: true,
  description: true,
  createdAt: true,
  updatedAt: true,
  userGroups: {
    select: {
      id: true,
      user: {
        select: userService.select,
      },
    },
  },
  groupInstruments: {
    select: {
      id: true,
      instrument: true,
    },
  },
  groupGenres: {
    select: {
      id: true,
      genre: true,
    },
  },
} as const;

const create = async (data: GroupData) => {
  const group = await db.group.create({
    data: {
      name: data.name,
      description: data.description,
      userGroups: {
        create: {
          userId: data.userId,
        },
      },
      groupInstruments: {
        create: data.instruments.map((instrumentId) => ({
          instrumentId,
        })),
      },
      groupGenres: {
        create: data.genres.map((genreId) => ({
          genreId,
        })),
      },
    },
    select,
  });

  return group;
};

const getAllGroups = async () => {
  const groups = await db.group.findMany({ select });

  return groups;
};

const getGroupById = async (id: number) => {
  const group = await db.group.findUnique({
    where: { id },
    select,
  });

  return group;
};

export const groupService = {
  select,
  create,
  getAllGroups,
  getGroupById,
};
