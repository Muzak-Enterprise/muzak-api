import { Context } from "hono";
import { tokenService } from "../services/tokenService";
import { userService } from "../services/userService";

const getUserById = async (c: Context) => {
  const userId = c.req.param("id");
  const authHeader = c.req.header("Authorization")!;
  const tokenId = (await tokenService.verifyBearerToken(authHeader)).sub;

  if (userId !== tokenId.toString()) return c.text("Unauthorized", 401);

  const user = await userService.getUserById(parseInt(userId));

  if (!user) return c.text("Something went wrong", 500);

  return c.json(user, 200);
};

export const userController = {
  getUserById,
};
