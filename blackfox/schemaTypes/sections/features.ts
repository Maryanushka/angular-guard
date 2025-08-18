import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'features',
  title: 'Features Section',
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Feature Title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Feature Description',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'icon',
          title: 'Feature Icon',
          type: 'string',
          description: 'Icon name or emoji',
        }),
      ],
    },
  ],
})
