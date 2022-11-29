export const getProfile = gql`
    query Profile($handle: Handle!) {
        profile(request: { handle: $handle }) {
            isFollowedByMe
            id
            name
            bio
            attributes {
                displayType
                traitType
                key
                value
            }
            followNftAddress
            metadata
            isDefault
            picture {
                ... on NftImage {
                    contractAddress
                    tokenId
                    uri
                    verified
                }
                ... on MediaSet {
                    original {
                        url
                        mimeType
                    }
                }
                __typename
            }
            handle
            coverPicture {
                ... on NftImage {
                    contractAddress
                    tokenId
                    uri
                    verified
                }
                ... on MediaSet {
                    original {
                        url
                        mimeType
                    }
                }
                __typename
            }
            ownedBy
            dispatcher {
                address
                canUseRelay
            }
            stats {
                totalFollowers
                totalFollowing
                totalPosts
                totalComments
                totalMirrors
                totalPublications
                totalCollects
            }
            followModule {
                ... on FeeFollowModuleSettings {
                    type
                    amount {
                        asset {
                            symbol
                            name
                            decimals
                            address
                        }
                        value
                    }
                    recipient
                }
                ... on ProfileFollowModuleSettings {
                    type
                }
                ... on RevertFollowModuleSettings {
                    type
                }
            }
        }
    }
`;
