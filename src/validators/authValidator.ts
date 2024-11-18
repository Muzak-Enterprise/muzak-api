import { validator } from "hono/validator";
import { z } from "zod";
import { authRulesEnum } from "../enums/fieldsRules";
import { formValidator } from "./validator";

export const loginValidator = validator("json", (value, c) =>
  formValidator(
    value,
    c,
    z.object({
      email: authRulesEnum.email,
      password: authRulesEnum.password,
    }),
    "Vos identifiants de connexion sont incorrects",
    404
  )
);

export const registerValidator = validator("json", (value, c) =>
  formValidator(
    value,
    c,
    z.object({
      firstName: authRulesEnum.name,
      lastName: authRulesEnum.name,
      email: authRulesEnum.email,
      password: authRulesEnum.password,
      passwordConfirmation: z.string(),
    }),
    {
      firstName: "Le prénom doit contenir au moins 2 lettres et faire moins de 63 caractères",
      lastName: "Le nom doit contenir au moins 2 lettres et faire moins de 63 caractères",
      email: "L'adresse email est incorrecte",
      password:
        "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule et un chiffre",
      passwordConfirmation: "Veuillez confirmer votre mot de passe",
    }
  )
);
