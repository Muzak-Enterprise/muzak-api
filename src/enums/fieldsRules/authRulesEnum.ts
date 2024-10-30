import { z } from "zod";

const name = z
  .string()
  .refine((value) => value.replace(/\s+/g, "").length >= 2);

const email = z.string().email();

const password = z
  .string()
  .min(8)
  .max(255)
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[1-9]).*$/);

const authRulesEnum = {
  email,
  password,
  name,
} as const;

export { authRulesEnum };
