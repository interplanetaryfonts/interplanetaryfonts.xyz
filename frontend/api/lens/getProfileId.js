export const getProfileId = gql`
    query Profiles($owner: [EthereumAddress!]) {
        profiles(request: { ownedBy: $owner }) {
            items {
                id
            }
        }
    }
`;
