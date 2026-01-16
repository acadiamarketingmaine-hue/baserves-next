import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Types for Sanity documents
export interface Location {
  _id: string
  _type: 'location'
  name: string
  slug: { current: string }
  tagline: string
  description: string
  longDescription?: string
  region: string
  state: string
  features: string[]
  stats: {
    campsites?: string
    trails?: string
    acres?: string
    lakeSize?: string
  }
  mainImage: SanityImageSource
  gallery?: SanityImageSource[]
  coordinates?: {
    lat: number
    lng: number
  }
  bookingUrl?: string
}

export interface ExperienceCategory {
  _id: string
  _type: 'experienceCategory'
  name: string
  slug: { current: string }
  description: string
  icon: string
  image: SanityImageSource
}

export interface Experience {
  _id: string
  _type: 'experience'
  name: string
  slug: { current: string }
  description: string
  category: ExperienceCategory
  location: Location
  mainImage: SanityImageSource
  gallery?: SanityImageSource[]
  price?: string
  duration?: string
  difficulty?: string
  bookingUrl?: string
}

export interface Service {
  _id: string
  _type: 'service'
  name: string
  slug: { current: string }
  description: string
  longDescription?: string
  icon: string
  image: SanityImageSource
  features?: string[]
}

// Query functions
export async function getLocations(): Promise<Location[]> {
  return client.fetch(`
    *[_type == "location"] | order(name asc) {
      _id,
      name,
      slug,
      tagline,
      description,
      region,
      state,
      features,
      stats,
      mainImage,
      bookingUrl
    }
  `)
}

export async function getLocation(slug: string): Promise<Location | null> {
  return client.fetch(`
    *[_type == "location" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      tagline,
      description,
      longDescription,
      region,
      state,
      features,
      stats,
      mainImage,
      gallery,
      coordinates,
      bookingUrl
    }
  `, { slug })
}

export async function getExperienceCategories(): Promise<ExperienceCategory[]> {
  return client.fetch(`
    *[_type == "experienceCategory"] | order(name asc) {
      _id,
      name,
      slug,
      description,
      icon,
      image,
      "count": count(*[_type == "experience" && references(^._id)])
    }
  `)
}

export async function getExperiencesByCategory(categorySlug: string): Promise<Experience[]> {
  return client.fetch(`
    *[_type == "experience" && category->slug.current == $categorySlug] | order(name asc) {
      _id,
      name,
      slug,
      description,
      mainImage,
      price,
      duration,
      difficulty,
      location->{name, slug},
      bookingUrl
    }
  `, { categorySlug })
}

export async function getServices(): Promise<Service[]> {
  return client.fetch(`
    *[_type == "service"] | order(name asc) {
      _id,
      name,
      slug,
      description,
      icon,
      image
    }
  `)
}

export async function getService(slug: string): Promise<Service | null> {
  return client.fetch(`
    *[_type == "service" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      description,
      longDescription,
      icon,
      image,
      features
    }
  `, { slug })
}
