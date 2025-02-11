import { z } from 'zod'

export const questionSchema = z.object({
  /* Titulo de la pregunta */
  titulo: z.string({
    required_error: 'El titulo de la pregunta es requerido',
  }).min(4, {
    message: 'El minimo de caracteres para el titulo de la pregunta es de 4'
  }).max(40, {
    message: 'El maximo de caracteres para el titulo de la pregunta es de 40'
  }),

  /* Descripcion de la pregunta */
  descripcion: z.string().min(10, {
    message: 'La descripcion de la pregunta no puede tener menos de 10 caracteres'
  }).max(40, {
    message: 'La descripcion de la pregunta no puede tener más de 40 caracteres'
  }),

  /* Tipo de respuesta de la pregunta */
  tipo_respuestas: z.string({
    required_error: 'El tipo de respuesta de la pregunta es requerido',
  }).max(20, {
    message: 'El tipo de respuesta de la pregunta no puede tener más de 20 caracteres'
  }),

  /* Respuesta correcta de la pregunta */
  respuesta_correcta: z.string().max(150, {
    message: 'La respuesta correcta de la pregunta no puede tener más de 150 caracteres'
  })
})