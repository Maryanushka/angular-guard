import { defineField, defineType } from 'sanity'
import { seo, hero, features, content, richText, youtube, productTabs } from '../sections'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'tag',
      title: 'Tags / Categories',
      type: 'array',
      of: [{ type: 'string' }],
      description:
        'Select one or more category slugs (e.g. hair, blonde, set). Product will appear in each chosen category.'
    }),
    defineField({
      name: 'metaImage',
      title: 'Meta Image',
      type: 'image',
      description: 'Image for social media sharing.'
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: Rule =>
        Rule.required().error('Price is required so the product can be added to the basket.')
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: richText.name,
      description: 'Rich text content with formatting, images, and more.'
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        { type: hero.name },
        { type: features.name },
        { type: content.name },
        { type: youtube.name },
        { type: productTabs.name }
      ],
      description: 'Add and reorder sections for this page (e.g. Product Tabs, Product Video).'
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: seo.name
    })
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      tag: 'tag'
    },
    prepare({ title, slug, tag }) {
      const tagLabel = Array.isArray(tag) ? tag.join(', ') : tag
      return {
        title,
        subtitle: tagLabel || (slug ? `/${slug}` : 'No slug')
      }
    }
  }
})
