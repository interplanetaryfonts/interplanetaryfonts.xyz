import { gql } from "@apollo/client";

export const getDefaultProfile = gql`
  query defaultProfile($request: DefaultProfileRequest!) {
    defaultProfile(request: $request) {
      id
      handle
    }
  }
`;
