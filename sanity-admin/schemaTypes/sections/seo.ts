import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Title used for search engines. If blank, the page title will be used.',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Description for search engines.',
    }),
    defineField({
      name: 'metaImage',
      title: 'Meta Image',
      type: 'image',
      description: 'Image for social media sharing.',
    }),
  ],
})
