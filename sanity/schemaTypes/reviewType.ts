import { defineType, defineField } from 'sanity'

export const reviewType = defineType({
  name: 'review',
  title: 'Kundenbewertung',
  type: 'document',
  fields: [
    defineField({
      name: 'reviewerName',
      title: 'Name des Bewerters',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Bewertung',
      type: 'number',
      description: 'Sterne-Bewertung von 1 bis 5',
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'body',
      title: 'Bewertungstext',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Veröffentlicht am',
      type: 'date',
    }),
    defineField({
      name: 'verified',
      title: 'Verifizierter Kauf',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Neueste zuerst',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Beste Bewertung zuerst',
      name: 'ratingDesc',
      by: [{ field: 'rating', direction: 'desc' }],
    },
  ],
})
