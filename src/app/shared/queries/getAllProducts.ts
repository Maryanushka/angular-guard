import { gql } from 'apollo-angular'

export const GetAllProducts = gql`
query GetProducts($limit: Int) {
  Products(limit: $limit) {
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
