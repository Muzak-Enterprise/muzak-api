import { db } from "../database";

type AddressDataType = {
  userId: number;
  name: string;
  city: string;
  postcode: string;
};

const create = async (data: AddressDataType) => {
  const address = await db.address.create({
    data: {
      userId: data.userId,
      name: data.name,
      city: data.city,
      postcode: data.postcode,
    },
  });

  return address;
};

const modify = async (addressId: number, data: Partial<AddressDataType>) => {
  const address = await db.address.update({
    where: { id: addressId },
    data: {
      name: data.name,
      city: data.city,
      postcode: data.postcode,
    },
  });

  return address;
};

export const addressService = {
  create,
  modify,
};
