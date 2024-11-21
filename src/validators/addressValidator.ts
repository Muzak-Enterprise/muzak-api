import { z } from "zod";
import { formValidator } from "./validator";

export const postAddressValidator = formValidator(
  z.object({
    name: z.string(),
    city: z.string(),
    postcode: z.string(),
  })
);
