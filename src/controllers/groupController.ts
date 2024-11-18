import { Context } from "hono";
import { groupService } from "../services/groupService";

const get = async (c: Context) => {
  const groups = await groupService.GetAll();
  return c.json(groups, 200);
};

export const groupController = {
  get,
};
