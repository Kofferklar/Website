import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemaTypes'
import { structure } from './sanity/structure'

const SINGLETONS = new Set(['siteSettings', 'product', 'banner'])

export default defineConfig({
  name: 'default',
  title: 'KofferKlar',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: '/studio',
  plugins: [
    structureTool({ structure }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
  document: {
    // Prevent creating additional singleton instances
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter((template) => !SINGLETONS.has(template.templateId))
      }
      return prev
    },
    actions: (prev, { schemaType }) => {
      if (SINGLETONS.has(schemaType)) {
        return prev.filter(({ action }) => action !== 'duplicate' && action !== 'delete')
      }
      return prev
    },
  },
})
