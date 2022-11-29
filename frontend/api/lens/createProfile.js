export const createProfile = gql`
    mutation CreateProfile {
        createProfile(
            request: {
                handle: "your-handle"
                profilePictureUri: null
                followNFTURI: null
                followModule: null
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
