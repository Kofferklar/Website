import { type StructureResolver } from 'sanity/structure'

const SINGLETONS = ['siteSettings', 'product', 'banner']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('KofferKlar')
    .items([
      S.listItem()
        .title('Site Settings')
        .schemaType('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem()
        .title('Produkt')
        .schemaType('product')
        .child(S.document().schemaType('product').documentId('product')),
      S.listItem()
        .title('Banner')
        .schemaType('banner')
        .child(S.document().schemaType('banner').documentId('banner')),
      S.divider(),
      // Kontakteingang (Posteingang) — custom label per CMS-10
      S.listItem()
        .title('Posteingang')
        .schemaType('contactSubmission')
        .child(
          S.documentList()
            .title('Eingegangene Nachrichten')
            .filter('_type == "contactSubmission"')
            .schemaType('contactSubmission')
        ),
      S.divider(),
      // All remaining non-singleton document types
      ...S.documentTypeListItems().filter(
        (item) => !SINGLETONS.includes(item.getId() ?? '') && item.getId() !== 'contactSubmission'
      ),
    ])
