import { z } from "zod";

const name = z
  .string({ message: "Veuillez entrer un nom de groupe" })
  .max(63, { message: "Le nom du groupe doit faire moins de 63 caractères" })
  .refine((value) => value.replace(/\s+/g, "").length >= 3, {
    message: "Le nom du groupe doit contenir au moins 3 lettres",
  });

const description = z
  .string({ message: "Veuillez entrer une description au groupe" })
  .max(511, {
    message: "Votre description ne peut pas dépasser les 511 caractères",
  })
  .refine((value) => value.replace(/\s+/g, "").length >= 3, {
    message: "Le nom du groupe doit contenir au moins 3 lettres",
  });

const groupRulesEnum = {
  name,
  description,
} as const;

export { groupRulesEnum };
