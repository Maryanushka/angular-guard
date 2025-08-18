import { defineType } from 'sanity'

export default defineType({
  name: 'product_card',
  title: 'Product Card',
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'product' }],
    },
  ],
})
