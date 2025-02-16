import { gql } from 'apollo-angular';

export const GetCategories = gql`
  query Categories {
    Categories {
      total
      items {
        title
        _slug
      }
    }
  }
`;
