import { defineField, defineType } from 'sanity'
import { seo, richText } from '../sections'

export default defineType({
  name: 'contentPage',
  title: 'Content Page',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'A brief description of the page content.',
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: richText.name,
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
