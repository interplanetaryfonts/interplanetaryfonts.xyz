import { gql } from "@apollo/client";

export const createProfile = gql`
    mutation CreateProfile($request: CreateProfileRequest!) {
        createProfile(request: $request) {
            ... on RelayerResult {
                txHash
            }
            ... on RelayError {
                reason
            }
            __typename
        }
    }
  }
`;
