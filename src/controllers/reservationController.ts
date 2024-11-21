import { Context } from "hono";
import { reservationService } from "../services/reservationService";
import { tokenService } from "../services/tokenService";

type PostReservationForm = {
  groupId: number;
  addressId: number;
  date: Date;
  duration: number;
};

const post = async (c: Context) => {
  const { groupId, addressId, date, duration }: PostReservationForm =
    c.req.valid("json" as never);

  const authHeader = c.req.header("Authorization")!;
  const tokenId = (await tokenService.verifyBearerToken(authHeader)).sub;

  const reservation = await reservationService.create({
    groupId,
    userId: tokenId,
    addressId,
    date,
    duration,
    status: "PENDING",
  });

  return c.json({ reservation }, 201);
};

export const reservationController = {
  post,
};
