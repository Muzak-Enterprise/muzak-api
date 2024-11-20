import { db } from "../database";
import { GenreType } from "./genreService";
import { InstrumentType } from "./instrumentService";
import { UserType } from "./userService";

export type GroupType = {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export type GroupTypeWithAssociations = GroupType & {
  userGroups: {
    id: number;
    user: UserType;
  }[];
  groupInstruments: {
    id: number;
    instrument: InstrumentType;
  }[];
  groupGenres: {
    id: number;
    genre: GenreType;
  }[];
};

export type GroupData = {
  name: string;
  description: string;
  userId: UserType["id"];
  instruments: InstrumentType["id"][];
  genres: GenreType["id"][];
};

const include = {
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
    include,
  });

  return group;
};

const getAllGroups = async (): Promise<GroupType[]> => {
  const groups = await db.group.findMany({ include });

  return groups;
};

const getGroupById = async (
  id: number
): Promise<GroupTypeWithAssociations | null> => {
  const group = await db.group.findUnique({
    where: { id },
    include,
  });

  return group;
};

export const groupService = {
  create,
  getAllGroups,
  getGroupById,
};
