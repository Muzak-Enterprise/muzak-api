import { Context } from "hono";
import { userGroupService } from "../services/userGroupService";

const post = async (c: Context) => {
  const { groupId, userId } = c.req.valid("json" as never);

  const group = await userGroupService.getUserGroup(userId, groupId);

  if (group) {
    await userGroupService.del(group.id);
  } else {
    await userGroupService.create(userId, groupId);
  }

  return c.json({}, 200);
};

export const userGroupController = {
  post,
};
