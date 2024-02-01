import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
//import {googleMapsInput} from '@sanity/google-maps-input'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: "Roxie's Blog",

  projectId: `${process.env.NEXT_PUBLIC_PROJECT_ID}`,
  dataset: `${process.env.SANITY_DATASET}`,

  plugins: [
    structureTool(),
    visionTool(),
    //googleMapsInput(),
  ],

  schema: {
    types: schemaTypes,
  },
})
