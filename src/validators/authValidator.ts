import { validator } from "hono/validator";
import { z } from "zod";
import { validatorService } from "../services/validatorService";
import { formValidator } from "./validator";
import { authRulesEnum } from "../enums/fieldsRules/authRulesEnum";

export const loginValidator = validator("json", (value, c) =>
  formValidator(
    c,
    value,
    z.object({
      email: authRulesEnum.email.refine(
        async (email) => await validatorService.userByEmailExists(email)
      ),
      password: authRulesEnum.password,
    }),
    () => {
      return c.json(
        { error: "Vos identifiants de connexion sont incorrects" },
        404
      );
    }
  )
);

export const registerValidator = validator("json", (value, c) =>
  formValidator(
    c,
    value,
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
  )
);
