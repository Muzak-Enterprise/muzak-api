import { genreService } from "./genreService";
import { instrumentService } from "./instrumentService";
import { userService } from "./userService";

const userByEmailExists = async (email: string) => {
  return (await userService.getUserByEmail(email)) !== null;
};

const userByIdExists = async (id: number) => {
  return (await userService.getUserById(id)) !== null;
};

const instrumentExists = async (id: number) => {
  return (await instrumentService.getInstrumentById(id)) !== null;
};

const genreExists = async (id: number) => {
  return (await genreService.getGenreById(id)) !== null;
};

export const validatorService = {
  userByEmailExists,
  userByIdExists,
  instrumentExists,
  genreExists,
};
