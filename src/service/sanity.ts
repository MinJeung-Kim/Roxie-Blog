import { createClient } from "@sanity/client";

export const client = createClient({
  // Error : configuration must contain projectId

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false,
  apiVersion: "2024-02-02",
  token: process.env.SANITY_SECRET_TOKEN,
});
