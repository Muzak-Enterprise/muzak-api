import { Context } from "hono";
import { encryptionService } from "../services/encryptionService";
import { tokenService } from "../services/tokenService";
import { userService } from "../services/userService";
import { RegisterForm } from "./authController";

const getUserById = async (c: Context) => {
  const userId = c.req.param("id");
  const authHeader = c.req.header("Authorization")!;
  const tokenId = (await tokenService.verifyBearerToken(authHeader)).sub;

  if (userId !== tokenId.toString()) return c.text("Unauthorized", 401);

  const user = await userService.getUserById(parseInt(userId));

  if (!user) return c.text("Something went wrong", 500);

  return c.json(user, 200);
};

type PatchUserForm = Partial<RegisterForm> & {
  oldPassword: string;
};

const patchUser = async (c: Context) => {
  const {
    firstName,
    lastName,
    email,
    oldPassword,
    password,
    passwordConfirmation,
  }: PatchUserForm = c.req.valid("form" as never);

  const userId = c.req.param("id");
  const authHeader = c.req.header("Authorization")!;
  const tokenId = (await tokenService.verifyBearerToken(authHeader)).sub;

  if (userId !== tokenId.toString()) return c.text("Unauthorized", 401);

  const oldUser = await userService.getFullUserById(parseInt(userId));

  if (!oldUser) return c.text("Something went wrong", 500);

  const data = Object.create(null);

  if (firstName) data.firstName = firstName;
  if (lastName) data.lastName = lastName;
  if (email) data.email = email;
  if (oldPassword || password || passwordConfirmation) {
    if (!oldPassword) {
      return c.json(
        { error: "Veuillez entrer votre ancien mot de passe" },
        422
      );
    }

    if (!password) {
      return c.json(
        { error: "Veuillez entrer votre nouveau mot de passe" },
        422
      );
    }

    if (!passwordConfirmation) {
      return c.json(
        { error: "Veuillez confirmer votre nouveau mot de passe" },
        422
      );
    }

    if (password !== passwordConfirmation) {
      return c.json(
        { error: "Les nouveaux mots de passe ne correspondent pas" },
        422
      );
    }

    if (
      !(await encryptionService.comparePassword(oldPassword, oldUser.password))
    ) {
      return c.json(
        { error: "Votre ancien mot de passe ne correspond pas" },
        422
      );
    }
  }

  if (Object.keys(data).length === 0) {
    return c.json({ error: "Aucune donnée à modifier" }, 422);
  }

  const user = await userService.modify(parseInt(userId), {
    firstName,
    lastName,
    email,
    password,
  });

  return c.json(user, 200);
};

export const userController = {
  getUserById,
  patchUser,
};