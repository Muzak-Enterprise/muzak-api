import { Context } from "hono";
import { tokenService } from "../services/tokenService";
import { addressService } from "../services/addressService";

type PostAddressForm = {
  name: string;
  city: string;
  postcode: string;
};

const post = async (c: Context) => {
  const { name, city, postcode }: PostAddressForm = c.req.valid(
    "json" as never
  );

  const authHeader = c.req.header("Authorization")!;
  const tokenId = (await tokenService.verifyBearerToken(authHeader)).sub;

  const address = await addressService.create({
    userId: tokenId,
    name,
    city,
    postcode,
  });

  return c.json({ address }, 201);
};

export const addressController = {
  post,
};
