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
          name: 'categoryItem',
          title: 'Category Item',
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
          preview: {
            select: {
              title: 'title',
              subtitle: 'tag',
            },
          },
        },
      ],
    }),

  ],
  preview: {
    prepare() {
      return {
        title: 'Categories',
        subtitle: 'Manage the list of categories',
      }
    },
  },
})
