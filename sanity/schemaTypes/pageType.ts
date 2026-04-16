import { defineType, defineField } from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Seite',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Inhalt',
      type: 'array',
      of: [{ type: 'blockContent' }],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'SEO-Titel',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'SEO-Beschreibung',
          type: 'text',
        }),
        defineField({
          name: 'ogImage',
          title: 'OG-Bild',
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    }),
  ],
})
