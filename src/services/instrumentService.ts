import { db } from "../database";

export type InstrumentType = {
  id: number;
  instrument: string;
};

type InstrumentDataType = {
  instrument: string;
};

const create = async (data: InstrumentDataType): Promise<InstrumentType> => {
  const Instrument = await db.instrument.create({
    data: {
      instrument: data.instrument,
    },
  });

  return Instrument;
};

const createMany = async (
  data: InstrumentDataType[]
): Promise<InstrumentType[]> => {
  const instruments = await db.instrument.createManyAndReturn({
    data: data,
  });

  return instruments;
};

const getAllInstruments = async (): Promise<InstrumentType[]> => {
  const instruments = await db.instrument.findMany();

  return instruments;
};

export const instrumentService = {
  create,
  createMany,
  getAllInstruments,
};
