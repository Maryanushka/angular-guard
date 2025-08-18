import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'content',
  title: 'Content Section',
  type: 'array',
  of: [
    {
      type: 'block',
    },
    {
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
    },
  ],
})
