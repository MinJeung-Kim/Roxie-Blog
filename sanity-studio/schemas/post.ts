export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {name: 'title', title: 'Title', type: 'string'},
    {name: 'description', title: 'Description', type: 'string'},
    {name: 'category', title: 'Category', type: 'string'},
    {name: 'indt', title: 'Indt', type: 'date'},
    {name: 'updt', title: 'Updt', type: 'date'},
    {name: 'path', title: 'Path', type: 'string'},
    {name: 'featured', title: 'Featured', type: 'boolean'},
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
}
