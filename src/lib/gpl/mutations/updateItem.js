import { gql } from "@apollo/client";

export const UPDATE_ITEM = gql`
  mutation updateItem($id: ID!, $active: Boolean = false) {
    updateItem(id: $id, data: { active: $active }) {
      data {
        id
      }
    }
  }
`;
