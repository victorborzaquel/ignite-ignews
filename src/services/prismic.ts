import * as Prismic from '@prismicio/client'
import sm from '../../sm.json'
import { enableAutoPreviews } from '@prismicio/next'

export const endpoint = sm.apiEndpoint
export const repositoryName = Prismic.getRepositoryName(endpoint)

// Update the Link Resolver to match your project's route structure
export function prismicLinkResolver(doc) {
  switch (doc.type) {
    case 'homepage':
      return '/'
    case 'posts':
      return `/${doc.uid}`
    default:
      return null
  }
}

// This factory function allows smooth preview setup
export function getPrismicClient(config: any = {}) {
  const client = Prismic.createClient(endpoint, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    ...config,
  })

  enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  })

  return client
}