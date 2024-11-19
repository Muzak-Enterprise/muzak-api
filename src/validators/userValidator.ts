import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { authRulesEnum } from "../enums/fieldsRules/authRulesEnum";
import { formValidator } from "./validator";

export const patchUsersValidator = zValidator(
  "json",
  z.object({
    firstName: authRulesEnum.firstName.optional(),
    lastName: authRulesEnum.lastName.optional(),
    oldPassword: authRulesEnum.oldPassword.optional(),
    password: authRulesEnum.password.optional(),
    passwordConfirmation: authRulesEnum.passwordConfirmation.optional(),
  }),
  (hook, c) => formValidator(hook, c)
);
