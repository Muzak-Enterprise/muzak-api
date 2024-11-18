import { db } from "../database";

export type GenreType = {
  id: number;
  genre: string;
};

type GenreDataType = {
  genre: string;
};

const create = async (data: GenreDataType): Promise<GenreType> => {
  const genre = await db.genre.create({
    data: {
      genre: data.genre,
    },
  });

  return genre;
};

const createMany = async (data: GenreDataType[]): Promise<GenreType[]> => {
  const genres = await db.genre.createManyAndReturn({
    data: data,
  });

  return genres;
};

const getAllGenres = async (): Promise<GenreType[]> => {
  const genres = await db.genre.findMany();

  return genres;
};

export const genreService = {
  create,
  createMany,
  getAllGenres,
};
