import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'categories',
  title: 'Categories',
  type: 'document',
  fields: [
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'string',
      readOnly: true,
      initialValue: 'categories',
    }),
    defineField({
      name: 'category_list',
      title: 'Category List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'tag',
              title: 'Tag',
              type: 'string',
            },
          ],
        },
      ],
    }),

  ],
  preview: {
    select: {
      title: 'title',
      heroHeading: 'hero.heading',
      media: 'hero.heroImage',
    },
    prepare({ title, heroHeading, media }) {
      return {
        title: title || 'Home Page',
        subtitle: heroHeading || 'No hero heading',
        media,
      }
    },
  },
})
