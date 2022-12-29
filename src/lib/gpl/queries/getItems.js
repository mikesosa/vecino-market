import { gql } from "@apollo/client";

export const GET_ITEMS = gql`
  query getItems {
    items(sort: "createdAt:desc") {
      data {
        id
        attributes {
          createdAt
          title
          description
          price
          short_description
          photos {
            data {
              id
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;
