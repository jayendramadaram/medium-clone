import { createClient, createCurrentUserHook } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
export const config = {
  dataset: 'production',
  projectId: 'gmsvszje',
  apiVersion: '2022-05-05',
  useCdn: 'production',
}

export const sanityClient = createClient(config)

const builder = imageUrlBuilder(config)

export function urlFor(source) {
  return builder.image(source)
}

export const useCurrentUser = createCurrentUserHook(config)
