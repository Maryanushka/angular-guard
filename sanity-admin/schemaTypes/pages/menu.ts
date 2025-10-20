import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'menu',
  title: 'Menu',
  type: 'document',
  fields: [
    defineField({
      name: 'menu',
      title: 'Menu',
      type: 'string',
      readOnly: true,
      initialValue: 'menu',
    }),
    defineField({
      name: 'menu_list',
      title: 'Menu List',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'page' },
            { type: 'homePage' },
            { type: 'contentPage' },
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
