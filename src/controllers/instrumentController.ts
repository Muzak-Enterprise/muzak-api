import { Context } from "hono";
import { instrumentService } from "../services/instrumentService";

const get = async (c: Context) => {
  const instruments = await instrumentService.getAllInstruments();

  return c.json(instruments, 200);
};

export const instrumentController = {
  get,
};
