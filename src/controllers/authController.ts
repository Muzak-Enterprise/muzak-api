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
  const { email, password }: LoginForm = c.req.valid("form" as never);

  const user = await db.user.findUnique({ where: { email } });

  if (!user) {
    return c.json(
      { error: "Vos identifiants de connexion sont incorrects" },
      404
    );
  }

  if (!(await encryptionService.comparePassword(password, user.password))) {
    return c.json(
      { error: "Vos identifiants de connexion sont incorrects" },
      404
    );
  }

  const token = await tokenService.generetaJwtToken(user.id);

  return c.json(
    {
      user: userService.removePassword(user),
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

const register = async (c: Context) => {
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

  if (await db.user.findUnique({ where: { email } })) {
    return c.json({ error: "Cet email est déjà utilisé" }, 409);
  }

  const user = await userService.createUser({
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
