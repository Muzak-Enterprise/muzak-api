import { validator } from "hono/validator";
import { z } from "zod";
import { formValidator } from "./validator";
import { authRulesEnum } from "../enums/fieldsRules";

export const patchUserValidator = validator("form", (value, c) =>
  formValidator(
    value,
    c,
    z.object({
      firstName: authRulesEnum.name.optional(),
      lastName: authRulesEnum.name.optional(),
      oldPassword: z.string().optional(),
      password: authRulesEnum.password.optional(),
      passwordConfirmation: z.string().optional(),
    }),
    {
      firstName: "Le prénom doit contenir au moins 2 lettres",
      lastName: "Le nom doit contenir au moins 2 lettres",
      password: "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule et un chiffre",
    }
  )
);
