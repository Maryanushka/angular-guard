// Import all section objects
export * from './sections'

// Import all page types
export * from './pages'

// Import specific schemas for Sanity config
import { page, homePage, contentPage, product, menu, categories } from './pages'
import { seo, hero, features, content, richText, youtube } from './sections'

export const schemaTypes = [
  // Page types
  page,
  homePage,
  contentPage,
  product,
  menu,
  categories,

  // Section objects
  seo,
  hero,
  features,
  content,
  richText,
  youtube
]
