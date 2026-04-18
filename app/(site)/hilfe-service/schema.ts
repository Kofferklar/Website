import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, { message: 'Bitte gib deinen Namen an.' }).max(100),
  email: z.string().trim().email({ message: 'Bitte gib eine gültige E-Mail-Adresse an.' }),
  subject: z.string().trim().min(3, { message: 'Bitte gib einen Betreff an.' }).max(100),
  message: z.string().trim().min(10, { message: 'Deine Nachricht sollte mindestens 10 Zeichen enthalten.' }).max(2000),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
