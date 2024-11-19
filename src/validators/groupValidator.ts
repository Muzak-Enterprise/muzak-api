import { validator } from "hono/validator";
import { z } from "zod";
import { genreRulesEnum } from "../enums/fieldsRules/genreRulesEnum";
import { groupRulesEnum } from "../enums/fieldsRules/groupRulesEnum";
import { instrumentRulesEnum } from "../enums/fieldsRules/instrumentRulesEnum";
import { formValidator } from "./validator";

export const getGroupsValidator = validator("json", (value, c) =>
  formValidator(
    c,
    value,
    z.object({
      name: groupRulesEnum.name,
      description: groupRulesEnum.description,
      instruments: z
        .array(instrumentRulesEnum.instrument, {
          message: "Vous devez choisir au moins un instrument",
        })
        .min(1, { message: "Vous devez choisir au moins un instrument" }),
      genres: z
        .array(genreRulesEnum.genre, {
          message: "Vous devez choisir au moins un genre",
        })
        .min(1, { message: "Vous devez choisir au moins un genre" })
        .max(3, { message: "Vous ne pouvez pas choisir plus de 3 genres" }),
    })
  )
);
