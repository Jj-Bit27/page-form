import { z } from "zod";

export const registerSchema = z.object({
  /* El nombre del usuario */
  name: z.string({
    required_error: ["El nombre de usuario es requerido"],
  }),
  /* Correo del usuario */
  email: z
    .string({
      required_error: ["El correo electronico es requerido"],
    })
    .email({
      message: ["Correo electronico invalido"],
    }),

  /* Contraseña del usuario */
  password: z
    .string({
      required_error: ["La contraseña es requerida"],
    })
    .min(6, {
      message: ["La contraseña debe tener al menos 6 caracteres"],
    }),
});

export const loginSchema = z.object({
  /* Correo del usuario */
  email: z
    .string({
      required_error: ["El correo electronico es requerido"],
    })
    .email({
      message: ["Correo electronico invalido"],
    }),

  /* Contraseña del usuario */
  password: z
    .string({
      required_error: ["La contraseña es requerida"],
    })
    .min(6, {
      message: ["La contraseña debe tener al menos 6 caracteres"],
    }),
});