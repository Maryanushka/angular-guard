import { defineField, defineType } from 'sanity'
import richText from './richText'

export default defineType({
  name: 'productTabs',
  title: 'Product Tabs',
  type: 'object',
  fields: [
    defineField({
      name: 'tabs',
      title: 'Tabs',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'productTab',
          title: 'Tab',
          fields: [
            {
              name: 'label',
              type: 'string',
              title: 'Tab Label',
              validation: Rule => Rule.required()
            },
            {
              name: 'content',
              type: richText.name,
              title: 'Tab Content',
              description: 'Rich text content with formatting, images, and more.'
            }
          ],
          preview: {
            select: { label: 'label' },
            prepare({ label }) {
              return { title: label || 'Tab' }
            }
          }
        }
      ]
    })
  ],
  preview: {
    select: { tabs: 'tabs' },
    prepare({ tabs }) {
      const count = Array.isArray(tabs) ? tabs.length : 0
      return { title: 'Product Tabs', subtitle: `${count} tab(s)` }
    }
  }
})
