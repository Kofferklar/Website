'use server'

import { z } from 'zod'
import { writeClient } from '@/lib/sanity/writeClient'

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Bitte gib deinen Namen an.' }),
  email: z.string().email({ message: 'Bitte gib eine gültige E-Mail-Adresse an.' }),
  subject: z.string().min(3, { message: 'Bitte gib einen Betreff an.' }),
  message: z.string().min(10, { message: 'Deine Nachricht sollte mindestens 10 Zeichen enthalten.' }),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

/**
 * Server Action: submitContact
 * Validates the contact form data and writes it to Sanity.
 */
export async function submitContact(data: ContactFormData) {
  // Server-side validation
  const result = contactFormSchema.safeParse(data)

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    }
  }

  try {
    const { name, email, subject, message } = result.data

    await writeClient.create({
      _type: 'contactSubmission',
      name,
      email,
      subject,
      message,
      submittedAt: new Date().toISOString(),
      read: false,
    })

    return {
      success: true,
      message: 'Deine Nachricht wurde erfolgreich gesendet.',
    }
  } catch (error) {
    console.error('Error submitting contact form:', error)
    return {
      success: false,
      message: 'Es gab ein Problem beim Senden deiner Nachricht. Bitte versuche es später erneut.',
    }
  }
}
