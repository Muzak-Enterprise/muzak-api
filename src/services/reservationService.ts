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

const patch = async (id: number, data: Partial<ReservationDataType>) => {
  const reservation = await db.reservation.update({
    where: { id },
    data,
  });

  return reservation;
};

export const reservationService = {
  create,
  patch,
};
