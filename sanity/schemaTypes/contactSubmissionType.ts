import { defineType, defineField } from 'sanity'

export const contactSubmissionType = defineType({
  name: 'contactSubmission',
  title: 'Kontaktanfrage',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'E-Mail',
      type: 'string',
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subject',
      title: 'Betreff',
      type: 'string',
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'message',
      title: 'Nachricht',
      type: 'text',
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'submittedAt',
      title: 'Eingegangen am',
      type: 'datetime',
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'read',
      title: 'Gelesen',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Neueste zuerst',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
  ],
})
