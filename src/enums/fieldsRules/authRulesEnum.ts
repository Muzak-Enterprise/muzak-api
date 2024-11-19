import { z } from "zod";

const firstName = z
  .string({ message: "Veuillez entrer votre prénom" })
  .max(63, { message: "Votre prénom ne peut pas dépasser 63 lettres" })
  .refine((value) => value.replace(/\s+/g, "").length >= 2, {
    message: "Votre prénom doit contenir au moins 2 lettres",
  });

const lastName = z
  .string({ message: "Veuillez entrer votre nom" })
  .max(63, { message: "Votre nom ne peut pas dépasser 63 lettres" })
  .refine((value) => value.replace(/\s+/g, "").length >= 2, {
    message: "Votre nom doit contenir au moins 2 lettres",
  });

const email = z
  .string({ message: "Veuillez entrer votre email" })
  .email({ message: "L'adresse email est incorrecte" });

const oldPassword = z.string({
  message: "Veuillez entrer votre ancien mot de passe",
});

const password = z
  .string({ message: "Veuillez entrer votre mot de passe" })
  .min(8, {
    message:
      "Votre mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule et un chiffre",
  })
  .max(255, {
    message: "Votre mot de passe ne peut pas dépasser 255 caractères",
  })
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[1-9]).*$/, {
    message:
      "Votre mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule et un chiffre",
  });

const passwordConfirmation = z.string({
  message: "Veuillez confirmer votre mot de passe",
});

const authRulesEnum = {
  firstName,
  lastName,
  email,
  oldPassword,
  password,
  passwordConfirmation,
} as const;

export { authRulesEnum };
