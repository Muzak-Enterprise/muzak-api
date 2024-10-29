import { Context } from "hono";
import { ParsedFormValue } from "hono/types";
import { StatusCode } from "hono/utils/http-status";
import { ZodSchema } from "zod";

// This function is used to validate the form data
// If the data is valid, it returns the data
// If the data is invalid
// - If the errorMessages parameter is a string, it returns an object with the errors and the error message
// - If the errorMessages parameter is an object, it returns an object with the errors and the corresponding error message
// - If the errorMessages parameter is not provided, it returns an object with the errors and a default error message
const formValidator = <T>(
  value: Record<string, ParsedFormValue | ParsedFormValue[]>,
  c: Context,
  schema: ZodSchema<T>,
  errorMessages: Record<string, string> | string,
  httpCode: StatusCode = 422
) => {
  const parsed = schema.safeParse(value);

  if (parsed.success) return parsed.data;

  const response: Record<string, any> = {
    errors: parsed.error.errors,
  };

  if (typeof errorMessages === "string") {
    response["error"] = errorMessages;
  } else if (!parsed.error?.formErrors.fieldErrors) {
    response["error"] = "Le format des données est incorrect";
  } else {
    for (const [key, _] of Object.entries(
      parsed.error?.formErrors.fieldErrors
    )) {
      response["error"] = errorMessages[key];
      break;
    }
  }

  return c.json(response, httpCode);
};

export { formValidator };
