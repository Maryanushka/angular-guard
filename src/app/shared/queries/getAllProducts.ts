import { gql } from 'apollo-angular'

export const GetAllProducts = gql`
query GetProducts($limit: Int, $categories: [String]) {
  Products(limit: $limit, where: { categories: { slug: $categories } }) {
    items {
      _slug
      categories {
        title
        _slug
      }
      content {
        ... on Text {
          body
        }
      }
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
`
