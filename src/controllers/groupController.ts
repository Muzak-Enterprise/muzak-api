import { Context } from "hono";
import { GroupData, groupService } from "../services/groupService";
import { tokenService } from "../services/tokenService";

const get = async (c: Context) => {
  const groups = await groupService.getAllGroups();

  return c.json(groups, 200);
};

type PostGroupForm = {
  instruments: number[];
  genres: number[];
} & GroupData;

const post = async (c: Context) => {
  const { name, description, instruments, genres }: PostGroupForm = c.req.valid(
    "json" as never
  );

  const authHeader = c.req.header("Authorization")!;
  const tokenId = (await tokenService.verifyBearerToken(authHeader)).sub;

  const group = await groupService.create({
    name,
    description,
    userId: tokenId,
    instruments,
    genres,
  });

  return c.json({ group }, 201);
};

const getGroupById = async (c: Context) => {
  const id = c.req.param("id");

  const group = await groupService.getGroupById(parseInt(id));

  if (!group) return c.json({ error: "Groupe non existant" }, 404);

  return c.json(group, 200);
};

export const groupController = {
  get,
  post,
  getGroupById,
};
