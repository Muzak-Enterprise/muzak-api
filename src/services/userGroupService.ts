import { db } from "../database";

const create = async (userId: number, groupId: number) => {
  await db.userGroups.create({
    data: {
      userId,
      groupId,
    },
  });
};

const del = async (id: number) => {
  await db.userGroups.delete({ where: { id } });
};

const getUserGroup = async (userId: number, groupId: number) => {
  const userGroup = await db.userGroups.findFirst({
    where: { userId, groupId },
  });

  return userGroup;
};

export const userGroupService = {
  create,
  del,
  getUserGroup,
};
