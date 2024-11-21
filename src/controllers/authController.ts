import { Context } from "hono";
import { db } from "../database";
import { encryptionService } from "../services/encryptionService";
import { tokenService } from "../services/tokenService";
import { userService } from "../services/userService";

type LoginForm = {
  email: string;
  password: string;
};

const login = async (c: Context) => {
  const { email, password }: LoginForm = c.req.valid("json" as never);

  const fullUser = (await userService.getFullUserByEmail(email))!;

  if (!(await encryptionService.comparePassword(password, fullUser.password))) {
    return c.json(
      { error: "Vos identifiants de connexion sont incorrects" },
      404
    );
  }

  const { password: _, ...user } = fullUser;

  const token = await tokenService.generetaJwtToken(user.id);

  return c.json({ user, token }, 200);
};

export type RegisterForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

const register = async (c: Context) => {
  const {
    firstName,
    lastName,
    email,
    password,
    passwordConfirmation,
  }: RegisterForm = c.req.valid("json" as never);

  if (password !== passwordConfirmation) {
    return c.json({ error: "Les mots de passe ne correspondent pas" }, 422);
  }

  const user = await userService.create({
    firstName,
    lastName,
    email,
    password,
  });

  const token = await tokenService.generetaJwtToken(user.id);

  return c.json({ user, token }, 201);
};

export const authController = {
  login,
  register,
};
