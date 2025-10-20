export const GetAllProducts = `
  query GetProducts($limit: Int, $category: [String]) {
    Products(limit: $limit, where: { categories: { _slug_any: $category } }) {
        seo {
          description
          social_media_image {
            url
            width
            height
          }
          title
        }
        description
        title
        cover {
          width
          url
          height
        }
      }
    }
  }
`;
