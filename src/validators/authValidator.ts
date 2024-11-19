import { z } from "zod";
import { authRulesEnum } from "../enums/fieldsRules/authRulesEnum";
import { validatorService } from "../services/validatorService";
import { formValidator } from "./validator";

export const loginValidator = formValidator(
  z.object({
    email: authRulesEnum.email.refine(
      async (email) => await validatorService.userByEmailExists(email)
    ),
    password: authRulesEnum.password,
  }),
  (_, c) =>
    c.json({ error: "Vos identifiants de connexion sont incorrects" }, 404)
);

export const registerValidator = formValidator(
  z.object({
    firstName: authRulesEnum.firstName,
    lastName: authRulesEnum.lastName,
    email: authRulesEnum.email.refine(
      async (email) => !(await validatorService.userByEmailExists(email)),
      { message: "Cet email est déjà utilisé" }
    ),
    password: authRulesEnum.password,
    passwordConfirmation: authRulesEnum.passwordConfirmation,
  })
);
