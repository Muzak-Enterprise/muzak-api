import { db } from "../database";

type GenreDataType = {
  genre: string;
};

const create = async (data: GenreDataType) => {
  const genre = await db.genre.create({
    data: {
      genre: data.genre,
    },
  });

  return genre;
};

const createMany = async (data: string[]): Promise<number> => {
  const existingGenres = await db.genre.findMany({
    where: {
      genre: {
        in: data,
      },
    },
  });

  const existingNames = existingGenres.map((genre) => genre.genre);

  const filteredGenres = data.filter((genre) => !existingNames.includes(genre));

  const genres = await db.genre.createMany({
    data: filteredGenres.map((genre) => ({ genre })),
  });

  return genres.count;
};

const getAllGenres = async () => {
  const genres = await db.genre.findMany();

  return genres;
};

const getGenreById = async (id: number) => {
  const genre = await db.genre.findUnique({ where: { id } });

  return genre;
};

export const genreService = {
  create,
  createMany,
  getAllGenres,
  getGenreById,
};
