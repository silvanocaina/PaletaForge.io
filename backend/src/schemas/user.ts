import * as z from "zod";

export const CreateUser = z.object({
  name: z.string().min(3).max(16),
  password: z.string().min(8).max(128),
  email: z.string().max(254), // limite tecnico que a rfc 5321 para emails permite de tamanho
  about: z.string().max(1024).optional()
})

export const AuthUser = z.object({
  name: z.string().max(16),
  password: z.string().max(128),
})
