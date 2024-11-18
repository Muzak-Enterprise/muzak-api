import { db } from "../database";

const getAllGroups = async () => {
  const groups = await db.group.findMany();

  return groups;
};

export const groupService = {
  getAllGroups,
};
