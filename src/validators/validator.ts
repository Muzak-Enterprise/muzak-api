import { zValidator } from "@hono/zod-validator";
import { Context } from "hono";
import { Schema, z, ZodError } from "zod";

export const formValidator = (
  schema: Schema,
  callback?: (errors: ZodError["formErrors"]["fieldErrors"], c: Context) => any
) =>
  zValidator("json", schema, (hook, c) => {
    if (hook.success) return;

    if (callback) return callback(hook.error.formErrors.fieldErrors, c);

    const errorsJoined: Record<string, string> = {};
    Object.entries(hook.error.formErrors.fieldErrors).forEach(
      ([key, value]) => (errorsJoined[key] = (value as string[]).join(" "))
    );

    return c.json(
      { errors: errorsJoined, error: "Le format des données est incorrect" },
      422
    );
  });

export const paramValidator = (
  schema: Schema = z.object({
    id: z.string().refine((id) => id.match(/^\d+$/)),
  }),
  callback?: (errors: ZodError["formErrors"]["fieldErrors"], c: Context) => any
) =>
  zValidator("param", schema, (hook, c) => {
    console.log(hook);

    if (hook.success) return;

    if (callback) return callback(hook.error.formErrors.fieldErrors, c);

    return c.json({ error: "Veuillez mettre un identifiant valide" }, 422);
  });

export const idParamValidator = paramValidator();
