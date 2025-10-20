import { defineField, defineType } from 'sanity'
import { seo, hero, features, content, richText } from '../sections'

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
      name: 'youtube_id',
      title: 'Youtube Video ID',
      type: 'string',
      description: 'Enter only the video ID (e.g., BKdb1xNEGoY from https://www.youtube.com/watch?v=BKdb1xNEGoY)',
      validation: (Rule) => Rule.regex(/^[a-zA-Z0-9_-]{11}$/),
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
      description: 'description',
    },
    prepare({ title, slug, description }) {
      return {
        title,
        subtitle: description || (slug ? `/${slug}` : 'No slug'),
      }
    },
  },
})
