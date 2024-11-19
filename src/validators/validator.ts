import { Context } from "hono";
import { ZodError } from "zod";

type Hook =
  | {
      success: true;
    }
  | {
      success: false;
      error: ZodError;
    };

export const formValidator = async <T>(
  hook: Hook,
  c: Context,
  callback?: (error: ZodError["formErrors"]["fieldErrors"]) => any
) => {
  if (hook.success) return;

  if (callback) {
    return callback(hook.error.formErrors.fieldErrors);
  } else {
    const errorsJoined: Record<string, string> = {};
    Object.entries(hook.error.formErrors.fieldErrors).forEach(
      ([key, value]) => (errorsJoined[key] = (value as string[]).join(" "))
    );

    return c.json(
      { errors: errorsJoined, error: "Le format des données est incorrect" },
      422
    );
  }
};

export const paramValidator = () => {};
