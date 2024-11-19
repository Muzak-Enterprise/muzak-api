import { validator } from "hono/validator";
import { z } from "zod";
import { formValidator } from "./validator";
import { authRulesEnum } from "../enums/fieldsRules/authRulesEnum";

export const patchUsersValidator = validator("json", (value, c) =>
  formValidator(
    c,
    value,
    z.object({
      firstName: authRulesEnum.firstName.optional(),
      lastName: authRulesEnum.lastName.optional(),
      oldPassword: authRulesEnum.oldPassword.optional(),
      password: authRulesEnum.password.optional(),
      passwordConfirmation: authRulesEnum.passwordConfirmation.optional(),
    })
  )
);
