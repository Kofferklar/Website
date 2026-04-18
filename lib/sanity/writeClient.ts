import 'server-only'
import { createClient } from '@sanity/client'

const token = process.env.SANITY_WRITE_TOKEN
if (!token) throw new Error('SANITY_WRITE_TOKEN is not set')

export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2025-03-04',
  useCdn: false,
  token,
})
