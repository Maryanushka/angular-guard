import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'youtube',
  title: 'YouTube Section',
  type: 'object',
  fields: [
    defineField({
      name: 'youtube_id',
      title: 'Youtube Video ID',
      type: 'string',
      description: 'Enter only the video ID (e.g., BKdb1xNEGoY from https://www.youtube.com/watch?v=BKdb1xNEGoY)',
      validation: (Rule) => Rule.regex(/^[a-zA-Z0-9_-]{11}$/),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      youtubeId: 'youtube_id',
    },
    prepare({ title, youtubeId }) {
      return {
        title: title || 'YouTube Section',
        subtitle: youtubeId ? `Video ID: ${youtubeId}` : 'No video ID',
      }
    },
  },
})
