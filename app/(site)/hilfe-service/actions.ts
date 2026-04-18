'use server'

import { writeClient } from '@/lib/sanity/writeClient'
import { contactFormSchema, type ContactFormData } from './schema'

export type { ContactFormData }

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
