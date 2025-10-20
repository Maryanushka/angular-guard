export const GetSingleProduct = `
  *[_type == "product" && slug.current == $slug] {
    price,
    "metaImage": metaImage.asset->url,
    price,
    tag,
    title,
    "seo": {
      "metaImage": metaImage.asset->url,
      metaDescription,
      metaTitle
    },
    "slug": slug.current,
    description,
  }`;
