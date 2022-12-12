import { gql } from '@apollo/client';

export const createProfile = handle => gql`
    mutation CreateProfile {
        createProfile(
            request: {
                handle: "${handle}"
                profilePictureUri: null
                followModule: { freeFollowModule: true }
            }
        ) {
            ... on RelayerResult {
                txHash
            }
            ... on RelayError {
                reason
            }
            __typename
        }
    }
`;
