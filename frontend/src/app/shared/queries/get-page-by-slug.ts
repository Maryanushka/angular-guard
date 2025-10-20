export const GetPageBySlug = `
  *[_type == "page" && slug.current == $slug] {
    title,
    "slug": slug.current,
    description,
    seo,
  }`;
