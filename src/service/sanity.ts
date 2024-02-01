import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false,
  apiVersion: "2024-01-26",
  token: process.env.SANITY_SECRET_TOKEN,
});
