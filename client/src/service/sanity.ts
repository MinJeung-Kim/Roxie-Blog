import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false,
  apiVersion: "2024-02-02",
  token: process.env.SANITY_SECRET_TOKEN,
});

// https://www.sanity.io/docs/image-url
// npm install --save @sanity/image-url
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source).width(800).url();
}

// https://www.sanity.io/docs/http-api-assets
// https://myProjectId.api.sanity.io/v2021-03-25/assets/images/myDataset

export const assetsURL = `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v2021-03-25/assets/images/${process.env.SANITY_DATASET}`;
