import { gql } from "@apollo/client";

export const CREATE_ITEM_MUTATION = gql`
  mutation createItem(
    $title: String!
    $description: String
    # $short_description: String = ""
    $phone_number: Long
    $price: Float
    $photos: [ID!] # $photos: Upload!
  ) {
    createItem(
      data: {
        title: $title
        description: $description
        # short_description: $short_description
        phone_number: $phone_number
        price: $price
        photos: $photos
      }
    ) {
      data {
        id
      }
    }
  }
`;
