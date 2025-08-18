import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'richText',
  title: 'Rich Text Content',
  type: 'array',
  of: [
    {
      type: 'block',
      title: 'Text Block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
        { title: 'Code', value: 'code' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
          { title: 'Underline', value: 'underline' },
          { title: 'Strike', value: 'strike-through' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: (Rule) => Rule.uri({
                  scheme: ['http', 'https', 'mailto', 'tel']
                }),
              },
              {
                title: 'Open in new tab',
                name: 'blank',
                type: 'boolean',
                initialValue: false,
              },
              {
                title: 'Link Text',
                name: 'linkText',
                type: 'string',
                description: 'Optional custom text for the link',
              },
            ],
            preview: {
              select: {
                title: 'linkText',
                subtitle: 'href',
              },
              prepare({ title, subtitle }) {
                return {
                  title: title || 'Link',
                  subtitle: subtitle,
                }
              },
            },
          },
          {
            name: 'internalLink',
            type: 'object',
            title: 'Internal Link',
            fields: [
              {
                title: 'Reference',
                name: 'reference',
                type: 'reference',
                to: [
                  { type: 'page' },
                  { type: 'homePage' },
                  { type: 'contentPage' },
                  { type: 'product' },
                ],
              },
              {
                title: 'Open in new tab',
                name: 'blank',
                type: 'boolean',
                initialValue: false,
              },
            ],
            preview: {
              select: {
                title: 'reference.title',
                subtitle: 'reference.slug.current',
              },
              prepare({ title, subtitle }) {
                return {
                  title: title || 'Internal Link',
                  subtitle: subtitle ? `/${subtitle}` : 'No slug',
                }
              },
            },
          },
          {
            name: 'highlight',
            type: 'object',
            title: 'Highlight',
            fields: [
              {
                title: 'Color',
                name: 'color',
                type: 'string',
                options: {
                  list: [
                    { title: 'Yellow', value: 'yellow' },
                    { title: 'Green', value: 'green' },
                    { title: 'Blue', value: 'blue' },
                    { title: 'Red', value: 'red' },
                    { title: 'Purple', value: 'purple' },
                  ],
                },
              },
            ],
            preview: {
              select: {
                title: 'color',
              },
              prepare({ title }) {
                return {
                  title: `Highlight (${title})`,
                }
              },
            },
          },
        ],
      },
    },
    {
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
        metadata: ['dimensions', 'palette'],
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Optional caption below the image',
        },
        {
          name: 'link',
          type: 'object',
          title: 'Image Link',
          fields: [
            {
              title: 'URL',
              name: 'href',
              type: 'url',
            },
            {
              title: 'Open in new tab',
              name: 'blank',
              type: 'boolean',
              initialValue: false,
            },
          ],
        },
      ],
    },
  ],
})
