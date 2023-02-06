import { gql } from "@apollo/client";

export const UPLOAD_FILES_MUTATION = gql`
  mutation (
    $file: Upload! # $photos: Upload!
  ) {
    upload(file: $file) {
      data {
        id
      }
    }
  }
`;
