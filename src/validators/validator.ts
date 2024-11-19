import { Context } from "hono";
import { ParsedFormValue } from "hono/types";
import { ZodError, ZodSchema } from "zod";

export const formValidator = async <T>(
  c: Context,
  value: Record<string, ParsedFormValue | ParsedFormValue[]>,
  schema: ZodSchema<T>,
  callback?: (parsed: ZodError<T>["formErrors"]["fieldErrors"]) => any
) => {
  const parsed = await schema.safeParseAsync(value);

  if (parsed.success) return parsed.data;

  if (callback) {
    return callback(parsed.error.formErrors.fieldErrors);
  } else {
    const errorsJoined: Record<string, string> = {};
    Object.entries(parsed.error.formErrors.fieldErrors).forEach(
      ([key, value]) => (errorsJoined[key] = (value as string[]).join(" "))
    );

    return c.json(
      { errors: errorsJoined, error: "Le format des données est incorrect" },
      422
    );
  }
};
