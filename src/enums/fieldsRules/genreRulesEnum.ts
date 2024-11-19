import { z } from "zod";
import { validatorService } from "../../services/validatorService";

const genre = z
  .number({ message: "Vous devez choisir un genre valide" })
  .refine(async (id) => await validatorService.genreExists(id), {
    message: "Vous devez choisir un genre valide",
  });

const genreRulesEnum = {
  genre,
} as const;

export { genreRulesEnum };
