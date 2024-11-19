import { z } from "zod";
import { validatorService } from "../../services/validatorService";

const instrument = z
  .number({ message: "Vous devez choisir un instrument valide" })
  .refine(async (id) => await validatorService.instrumentExists(id), {
    message: "Vous devez choisir un instrument valide",
  });

const instrumentRulesEnum = {
  instrument,
} as const;

export { instrumentRulesEnum };
