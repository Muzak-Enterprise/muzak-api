import { Context } from "hono";
import { genreService } from "../services/genreService";

const get = async (c: Context) => {
  const genres = await genreService.getAllGenres();

  return c.json(genres, 200);
};

export const genreController = {
  get,
};
