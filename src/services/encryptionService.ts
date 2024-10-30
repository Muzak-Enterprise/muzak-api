import bcript from "bcrypt";

const encryptPassword = async (password: string) => {
  return bcript.hash(password, 12);
};

const comparePassword = async (password: string, hashedPassword: string) => {
  return bcript.compare(password, hashedPassword);
};

export const encryptionService = {
  encryptPassword,
  comparePassword,
};
