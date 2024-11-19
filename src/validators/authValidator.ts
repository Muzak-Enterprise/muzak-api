import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { authRulesEnum } from "../enums/fieldsRules/authRulesEnum";
import { validatorService } from "../services/validatorService";
import { formValidator } from "./validator";

export const loginValidator = zValidator(
  "json",
  z.object({
    email: authRulesEnum.email.refine(
      async (email) => await validatorService.userByEmailExists(email)
    ),
    password: authRulesEnum.password,
  }),
  (hook, c) =>
    formValidator(hook, c, () => {
      return c.json(
        { error: "Vos identifiants de connexion sont incorrects" },
        404
      );
    })
);

export const registerValidator = zValidator(
  "json",
  z.object({
    firstName: authRulesEnum.firstName,
    lastName: authRulesEnum.lastName,
    email: authRulesEnum.email.refine(
      async (email) => !(await validatorService.userByEmailExists(email)),
      { message: "Cet email est déjà utilisé" }
    ),
    password: authRulesEnum.password,
    passwordConfirmation: authRulesEnum.passwordConfirmation,
  }),
  (hook, c) => formValidator(hook, c)
);
