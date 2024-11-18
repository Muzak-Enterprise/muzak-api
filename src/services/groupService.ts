import { db } from "../database";

const GetAll = async () => {
  const groups = await db.group.findMany();
  return groups;
};

export const groupService = {
  GetAll,
};
