import { z } from "zod";
import { formValidator } from "./validator";

export const postReservationValidator = formValidator(
  z.object({
    groupId: z.number(),
    addressId: z.number(),
    date: z
      .union([z.string().transform((val) => new Date(val)), z.date()])
      .refine((val) => !isNaN(val.getTime()), {
        message: "Invalid date",
      }),
    duration: z.number(),
  })
);
