import { defineType, defineField } from 'sanity'

export const faqItemType = defineType({
  name: 'faqItem',
  title: 'FAQ-Eintrag',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Frage',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Antwort',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategorie',
      type: 'string',
      description: "z.B. 'Lieferung', 'Produkt', 'Rückgabe'",
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Kategorie',
      name: 'categoryAsc',
      by: [{ field: 'category', direction: 'asc' }],
    },
  ],
})
