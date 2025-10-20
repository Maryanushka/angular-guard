import { defineField, defineType } from 'sanity'
import { seo, hero, features, content, richText, youtube } from '../sections'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
    }),
    defineField({
      name: 'metaImage',
      title: 'Meta Image',
      type: 'image',
      description: 'Image for social media sharing.',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: richText.name,
      description: 'Rich text content with formatting, images, and more.',
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        { type: hero.name },
        { type: features.name },
        { type: content.name },
        { type: youtube.name },
      ],
      description: 'Add and reorder sections for this page.',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: seo.name,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      tag: 'tag',
    },
    prepare({ title, slug, tag }) {
      return {
        title,
        subtitle: tag || (slug ? `/${slug}` : 'No slug'),
      }
    },
  },
})
