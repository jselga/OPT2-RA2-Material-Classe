import { z } from 'zod'

export const noteSchema = z.object({
  content: z.string().min(1, 'El contingut és obligatori'),
  important: z.boolean()
})

export type NoteFormData = z.infer<typeof noteSchema>