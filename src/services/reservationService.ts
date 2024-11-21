import { ReservationStatus } from "@prisma/client";
import { db } from "../database";

type ReservationDataType = {
  groupId: number;
  userId: number;
  addressId: number;
  date: Date;
  duration: number;
  status: ReservationStatus;
};

const create = async (data: ReservationDataType) => {
  const reservation = await db.reservation.create({
    data: {
      groupId: data.groupId,
      userId: data.userId,
      addressId: data.addressId,
      date: data.date,
      duration: data.duration,
      status: data.status,
    },
  });

  return reservation;
};

export const reservationService = {
  create,
};
