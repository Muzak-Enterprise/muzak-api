import { Context } from "hono";
import prisma from "../prisma";
import { comparePassword } from "../services/encryptionService";
import { generetaJwtToken } from "../services/tokenService";
import { createUser, removePassword } from "../services/userService";

type LoginForm = {
  email: string;
  password: string;
};

export const login = async (c: Context) => {
  const { email, password }: LoginForm = c.req.valid("form" as never);

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return c.json(
      { error: "Vos identifiants de connexion sont incorrects" },
      404
    );
  }

  if (!(await comparePassword(password, user.password))) {
    return c.json(
      { error: "Vos identifiants de connexion sont incorrects" },
      404
    );
  }

  const token = await generetaJwtToken(user.id);

  return c.json(
    {
      user: removePassword(user),
      token,
    },
    200
  );
};

type RegisterForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export const register = async (c: Context) => {
  const {
    firstName,
    lastName,
    email,
    password,
    passwordConfirmation,
  }: RegisterForm = c.req.valid("form" as never);

  if (password !== passwordConfirmation) {
    return c.json({ error: "Les mots de passe ne correspondent pas" }, 422);
  }

  if (await prisma.user.findUnique({ where: { email } })) {
    return c.json({ error: "Cet email est déjà utilisé" }, 409);
  }

  const user = await createUser({ firstName, lastName, email, password });

  const token = await generetaJwtToken(user.id);

  return c.json({ user, token }, 201);
};
