export const GetAllProducts = `
  *[_type == "product"] | order(publishedAt desc)[0...20]{
    title,
    "slug": slug.current,
    price,
    "metaImage": metaImage.asset->url,
    tag,
  }`;
