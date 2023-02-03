import contentful from "contentful";
import { createManifest } from "~/utils/iiif";

const runtimeConfig = useRuntimeConfig();

const baseUrl = runtimeConfig.public.baseURL;

const prefix = `${baseUrl}/api/iiif/contentful`;

const client = contentful.createClient({
  space: runtimeConfig.contentful.space,
  accessToken: runtimeConfig.contentful.accessToken,
});
export default defineEventHandler(async (event) => {
  const id = event.context.params.id;

  const items = await client.getEntries({
    content_type: "iiif",
    "fields.id": id,
  });

  const res = items.items[0];
  const fields: any = res.fields;

  const label = fields.label;

  const images = fields.image.map((image_: any, i: number) => {
    const image = image_.fields;
    return {
      url: image.url,
      width: image.width,
      height: image.height,
    };
  });

  return createManifest(prefix, id, label, images);
});
