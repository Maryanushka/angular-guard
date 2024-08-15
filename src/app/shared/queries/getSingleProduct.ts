import { gql } from 'apollo-angular'

export const GetSingleProduct = gql`
query Product($slug: String) {
  Product(slug: $slug) {
    categories {
      title
      _slug
    }
    seo {
      title
      social_media_image {
        url
        width
        height
      }
      description
    }
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

`
