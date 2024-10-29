import bcript from "bcrypt";

export const encryptPassword = async (password: string) => {
  return bcript.hash(password, 12);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  return bcript.compare(password, hashedPassword);
};
