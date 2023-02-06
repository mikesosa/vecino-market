import { gql } from "@apollo/client";

export const GET_ITEM_BY_ID = gql`
  query getItemById($id: ID!) {
    item(id: $id) {
      data {
        id
        attributes {
          createdAt
          title
          description
          price
          short_description
          phone_number
          photos {
            data {
              id
              attributes {
                url
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;
