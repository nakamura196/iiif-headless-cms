import { createClient } from "microcms-js-sdk";
import { createManifest } from "~/utils/iiif";

const runtimeConfig = useRuntimeConfig();

const baseUrl = runtimeConfig.public.baseURL;

const prefix = `${baseUrl}/api/iiif/microcms`;

const client = createClient({
  serviceDomain: runtimeConfig.microcms.serviceDomain,
  apiKey: runtimeConfig.microcms.apiKey,
});
export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  const res = await client.get({
    endpoint: "iiif",
    contentId: id,
  });

  const label = res.label;

  const images = res.image;

  return createManifest(prefix, id, label, images);
});
