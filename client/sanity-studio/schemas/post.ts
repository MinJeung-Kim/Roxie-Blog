import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'string'}),
    defineField({name: 'category', title: 'Category', type: 'string'}),
    defineField({name: 'content', title: 'Content', type: 'string'}),
    defineField({
      title: 'Photo',
      name: 'photo',
      type: 'image',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'photo',
    },
  },
})
