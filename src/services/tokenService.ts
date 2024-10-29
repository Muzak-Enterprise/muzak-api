import { sign } from "hono/jwt";
import type { JWTPayload } from "hono/utils/jwt/types";
import { JWT_SECRET } from "../constant";

export const generetaJwtToken = async (id: number) => {
  const payload: JWTPayload = {
    sub: id,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 31, // Duration of the token (31 days)
    iat: Math.floor(Date.now() / 1000), // When the token was created
    nbf: Math.floor(Date.now() / 1000), // Will not be active before this time
  };

  return sign(payload, JWT_SECRET);
};
