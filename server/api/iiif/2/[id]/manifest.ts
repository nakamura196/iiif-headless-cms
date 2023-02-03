import { createClient } from "microcms-js-sdk";
const runtimeConfig = useRuntimeConfig()
const client = createClient({
  serviceDomain: runtimeConfig.microcms.serviceDomain,
  apiKey: runtimeConfig.microcms.apiKey,
});
export default defineEventHandler(async (event) => {
  const res = await client.get({
    endpoint: "iiif",
    contentId: event.context.params.id,
  });

  const m_images = res.image

  const canvases = m_images.map((image: any, i: number) => {
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
    // res,
    // image: res.image,
    "@context": "http://iiif.io/api/presentation/2/context.json",
    "@id": "https://nakamura196.github.io/iiif/manifest.json",
    "@type": "sc:Manifest",
    label: res.label,
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
