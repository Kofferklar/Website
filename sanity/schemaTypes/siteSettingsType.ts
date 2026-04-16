import { defineType, defineField } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Website-Einstellungen',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Website-Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'seo',
      title: 'Globale SEO-Einstellungen',
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
    defineField({
      name: 'socialLinks',
      title: 'Social-Media-Links',
      type: 'object',
      fields: [
        defineField({
          name: 'instagram',
          title: 'Instagram-URL',
          type: 'url',
        }),
        defineField({
          name: 'facebook',
          title: 'Facebook-URL',
          type: 'url',
        }),
      ],
    }),
    defineField({
      name: 'phone',
      title: 'Telefonnummer',
      type: 'string',
      description: 'z.B. +49 123 456789',
    }),
    defineField({
      name: 'email',
      title: 'E-Mail-Adresse',
      type: 'string',
    }),
  ],
})
