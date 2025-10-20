export const GetSingleProduct = `
  query Product($slug: String) {
    Product(slug: $slug) {
      description
      cover {
        url
        width
        height
      }
      content {
        ... on Text {
          body
        }
      }
      price
      title
    }
  }
`;
