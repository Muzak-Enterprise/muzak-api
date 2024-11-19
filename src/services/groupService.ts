import { db } from "../database";
import { GenreType } from "./genreService";
import { InstrumentType } from "./instrumentService";
import { UserType } from "./userService";

export type GroupType = {
  id: number;
  name: string;
  description: string;
};

export type GroupTypeWithAssociations = GroupType & {
  userGroups: {
    id: number;
    userId: number;
    groupId: number;
  }[];
  groupInstruments: {
    id: number;
    instrumentId: number;
    groupId: number;
  }[];
  groupGenres: {
    id: number;
    genreId: number;
    groupId: number;
  }[];
};

export type GroupData = {
  name: string;
  description: string;
  userId: UserType["id"];
  instruments: InstrumentType["id"][];
  genres: GenreType["id"][];
};

const create = async (data: GroupData): Promise<GroupTypeWithAssociations> => {
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
    include: {
      userGroups: true,
      groupInstruments: true,
      groupGenres: true,
    },
  });

  return group;
};

const getAllGroups = async (): Promise<GroupType[]> => {
  const groups = await db.group.findMany();

  return groups;
};

export const groupService = {
  create,
  getAllGroups,
};
