import contentful from "contentful";
const runtimeConfig = useRuntimeConfig()
const client = contentful.createClient({
  space: runtimeConfig.contentful.space, // "jkgqrjf3it0u",
  accessToken: runtimeConfig.contentful.accessToken //"up8u93shIBdzdW75HBN33GtgMuU8UW7TLCF8B3Ums2E",
});
export default defineEventHandler(async (event) => {

  const items = await client.getEntries({
    content_type: "iiif",
    "fields.id": event.context.params.id,
  })

  const res = items.items[0] // .fields
  const fields: any = res.fields

  const m_images = fields.image

  const canvases = m_images.map((image_: any, i: number) => {
    const image = image_.fields
    const index = i + 1;
    return {
      "@id": `https://nakamura196.github.io/iiif/canvas/${index}`,
      "@type": "sc:Canvas",
      label: `[${index}]`,
      width: image.width,
      height: image.height,
      images: [
        {
          "@id": `https://nakamura196.github.io/iiif/annotation/${index}`,
          "@type": "oa:Annotation",
          motivation: "sc:painting",
          resource: {
            "@id": image.url.replace("/info.json", "/full/full/0/default.jpg"),
            "@type": "dctypes:Image",
            format: "image/jpeg",
            width: image.width,
            height: image.height,
            service: {
                "@context": "http://iiif.io/api/image/2/context.json",
                "@id": image.url.replace("/info.json", ""),
                "profile": "http://iiif.io/api/image/2/level2.json"
            }
          },
          on: `https://nakamura196.github.io/iiif/canvas/${index}`,
        },
      ],
    };
  })

  const manifest = {
    "@context": "http://iiif.io/api/presentation/2/context.json",
    "@id": "https://nakamura196.github.io/iiif/manifest.json",
    "@type": "sc:Manifest",
    label: fields.label,
    sequences: [
        {
            "@id": "https://nakamura196.github.io/iiif/sequence/normal",
            "@type": "sc:Sequence",
            canvases: canvases

        }
    ]
  };

  return manifest;
});
