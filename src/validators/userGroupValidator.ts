import { z } from "zod";
import { formValidator } from "./validator";

export const postUserGroupValidator = formValidator(
  z.object({
    groupId: z.number(),
    userId: z.number(),
  })
);
