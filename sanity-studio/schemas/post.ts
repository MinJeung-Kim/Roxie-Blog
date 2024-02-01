import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'string'}),
    defineField({name: 'category', title: 'Category', type: 'string'}),
    defineField({name: 'path', title: 'Path', type: 'string'}),
    defineField({name: 'featured', title: 'Featured', type: 'boolean'}),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})
