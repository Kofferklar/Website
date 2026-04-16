import { defineType, defineField, defineArrayMember } from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Produkt',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Produktname',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Produktbilder',
      type: 'array',
      of: [
        defineArrayMember({
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
      ],
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video-URL',
      type: 'url',
      description: 'URL zu einem Produktvideo (YouTube, Vimeo oder direkte URL)',
    }),
    defineField({
      name: 'price',
      title: 'Preis',
      type: 'number',
      description: 'Preis in Euro (z.B. 39.99)',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'buyLink',
      title: 'Kauflink',
      type: 'url',
      description: 'Externer Kauflink (z.B. Amazon)',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Kurzbeschreibung',
      type: 'text',
      description: 'Kurze Produktbeschreibung für Übersichten',
    }),
    defineField({
      name: 'description',
      title: 'Ausführliche Beschreibung',
      type: 'array',
      of: [{ type: 'blockContent' }],
    }),
    defineField({
      name: 'setParts',
      title: 'Set-Teile',
      type: 'array',
      description: 'Die einzelnen Teile des Packwürfel-Sets',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'partName',
              title: 'Name des Teils',
              type: 'string',
            }),
            defineField({
              name: 'dimensions',
              title: 'Maße',
              type: 'string',
              description: 'z.B. 40 × 30 × 10 cm',
            }),
            defineField({
              name: 'icon',
              title: 'Icon/Bild',
              type: 'image',
              options: { hotspot: true },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'material',
      title: 'Material',
      type: 'text',
      description: 'Stoff, Reißverschluss, Wasserbeständigkeit etc.',
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
