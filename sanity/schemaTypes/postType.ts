import { defineType, defineField } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Ratgeber-Artikel',
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
      name: 'coverImage',
      title: 'Cover-Bild',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt-Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Inhalt',
      type: 'array',
      of: [{ type: 'blockContent' }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Erscheinungsdatum',
      type: 'date',
      validation: (Rule) => Rule.required(),
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
  orderings: [
    {
      title: 'Neueste zuerst',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
