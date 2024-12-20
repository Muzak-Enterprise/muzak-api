import { db } from "../database";

type InstrumentDataType = {
  instrument: string;
};

const create = async (data: InstrumentDataType) => {
  const instrument = await db.instrument.create({
    data: {
      instrument: data.instrument,
    },
  });

  return instrument;
};

const createMany = async (data: string[]): Promise<number> => {
  const existingInstruments = await db.instrument.findMany({
    where: {
      instrument: {
        in: data,
      },
    },
  });

  const existingNames = existingInstruments.map(
    (instrument) => instrument.instrument
  );

  const filteredInstruments = data.filter(
    (instrument) => !existingNames.includes(instrument)
  );

  const instruments = await db.instrument.createMany({
    data: filteredInstruments.map((instrument) => ({ instrument })),
  });

  return instruments.count;
};

const getAllInstruments = async () => {
  const instruments = await db.instrument.findMany();

  return instruments;
};

const getInstrumentById = async (id: number) => {
  const instrument = await db.instrument.findUnique({ where: { id } });

  return instrument;
};

export const instrumentService = {
  create,
  createMany,
  getAllInstruments,
  getInstrumentById,
};
