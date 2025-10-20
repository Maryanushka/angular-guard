export const GetCategories = `
  *[_type == "categories"] {
    title,
    "slug": slug.current,
  }`;
