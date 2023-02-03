const createManifest = (prefix, id, label, images) => {
    const item_prefix = `${prefix}/${id}`
    const canvases = images.map((image, i) => {
        const index = i + 1;
        return {
            "@id": `${item_prefix}/canvas/${index}`,
            "@type": "sc:Canvas",
            label: `[${index}]`,
            width: image.width,
            height: image.height,
            images: [
            {
                "@id": `${item_prefix}/annotation/${index}`,
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
                on: `${item_prefix}/canvas/${index}`,
            },
            ],
        };
    })

    const manifest = {
        "@context": "http://iiif.io/api/presentation/2/context.json",
        "@id": `${item_prefix}/manifest.json`,
        "@type": "sc:Manifest",
        label: label,
        sequences: [
            {
              "@id": `${item_prefix}/sequence/normal`,
                "@type": "sc:Sequence",
                canvases: canvases
    
            }
        ]
      };
    
    return manifest 
}

export { createManifest };