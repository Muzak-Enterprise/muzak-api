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

const confirmReservation = async (c: Context) => {
  const id = c.req.param("id");

  const reservation = await reservationService.patch(parseInt(id), {
    status: "CONFIRMED",
  });

  return c.json({ reservation }, 200);
};

const cancelReservation = async (c: Context) => {
  const id = c.req.param("id");

  const reservation = await reservationService.patch(parseInt(id), {
    status: "CANCELLED",
  });

  return c.json({ reservation }, 200);
};

export const reservationController = {
  post,
  confirmReservation,
  cancelReservation,
};
