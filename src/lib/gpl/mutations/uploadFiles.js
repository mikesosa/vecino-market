import { gql } from "@apollo/client";

export const UPLOAD_FILES_MUTATION = gql`
  mutation multipleUpload(
    $files: [Upload!]! # $photos: Upload!
  ) {
    multipleUpload(files: $files) {
      data {
        id
      }
    }
  }
`;
