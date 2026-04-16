import { defineType, defineField } from 'sanity'

export const bannerType = defineType({
  name: 'banner',
  title: 'Rabatt-Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'text',
      title: 'Banner-Text',
      type: 'string',
      description: "Banner-Text, z.B. '10% Rabatt mit Code SUMMER'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'discountCode',
      title: 'Rabattcode',
      type: 'string',
    }),
    defineField({
      name: 'isActive',
      title: 'Aktiv',
      type: 'boolean',
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'validFrom',
      title: 'Gültig ab',
      type: 'datetime',
    }),
    defineField({
      name: 'validUntil',
      title: 'Gültig bis',
      type: 'datetime',
    }),
  ],
})
