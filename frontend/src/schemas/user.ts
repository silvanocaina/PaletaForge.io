import * as z from "zod";

// #############################
// ###  Regras de validação  ###
// #############################

export const usernameRules = z
  .string()
  .min(3, "Requer no minimo 3 caracteres")
  .max(16, "Requer no máximo 16 caracteres");

export const emailRules = z
  .string()
  .email("Email invalido")
  .max(254, "Tamanho máximo extrapolado");

export const passwordRules = z
  .string()
  .min(8, "Requer 8 caracteres")
  .regex(/[A-Z]/, "Requer uma letra maiúscula")
  .regex(/\d/, "Requer um numero")
  .regex(/[^A-Za-z0-9]/, "Requer um simbolo especial");

export const aboutRules = z
  .string()
  .max(1024)
  .optional();

// #############################
// ###  Schemas de Validação ###
// #############################

export const CreateUser = z.object({
  username: usernameRules,
  email: emailRules,
  password: passwordRules,
  about: aboutRules
})

export const AuthUser = z.object({
  username: usernameRules,
  password: passwordRules,
})
