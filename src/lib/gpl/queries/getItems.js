import { gql } from "@apollo/client";

export const GET_ITEMS = gql`
  query getItems {
    items(sort: "createdAt:desc", filters: { active: { eq: true } }) {
      data {
        id
        attributes {
          createdAt
          title
          description
          phone_number
          price
          active
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
