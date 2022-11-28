import {
    ApolloClient,
    InMemoryCache,
    gql,
    createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const authLink = setContext((_, { headers }) => {
    const token = window.localStorage.getItem('lens-auth-token');
    return {
        headers: {
            ...headers,
            authorization: token ? `${token}` : '',
        },
    };
});

const API_URL = 'https://api-mumbai.lens.dev/';

const httpLink = createHttpLink({
    uri: API_URL,
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

// Authentication queries
export const challenge = gql`
    query Challenge($address: EthereumAddress!) {
        challenge(request: { address: $address }) {
            text
        }
    }
`;

export const verify = gql`
    query Query($address: EthereumAddress!) {
        verify(request: { address: $address, signature: $signature })
    }
`;

export const authenticate = gql`
    mutation Authenticate($address: EthereumAddress!, $signature: Signature!) {
        authenticate(request: { address: $address, signature: $signature }) {
            accessToken
            refreshToken
        }
    }
`;

export const refresh = gql`
    mutation Refresh($refreshToken: Jwt!) {
        refresh(request: { refreshToken: $refreshToken }) {
            accessToken
            refreshToken
        }
    }
`;

// Lens data queries

export const exploreProfiles = gql`
    query ExploreProfiles {
        exploreProfiles(request: { sortCriteria: MOST_FOLLOWERS }) {
            items {
                id
                name
                bio
                isDefault
                attributes {
                    displayType
                    traitType
                    key
                    value
                }
                followNftAddress
                metadata
                handle
                picture {
                    ... on NftImage {
                        contractAddress
                        tokenId
                        uri
                        chainId
                        verified
                    }
                    ... on MediaSet {
                        original {
                            url
                            mimeType
                        }
                    }
                }
                coverPicture {
                    ... on NftImage {
                        contractAddress
                        tokenId
                        uri
                        chainId
                        verified
                    }
                    ... on MediaSet {
                        original {
                            url
                            mimeType
                        }
                    }
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
                        contractAddress
                        amount {
                            asset {
                                name
                                symbol
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
            pageInfo {
                prev
                next
                totalCount
            }
        }
    }
`;

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

export const getProfileId = gql`
    query Profiles($owner: [EthereumAddress!]) {
        profiles(request: { ownedBy: $owner }) {
            items {
                id
            }
        }
    }
`;

export const getPublications = gql`
    query Publications($id: ProfileId!, $limit: LimitScalar) {
        publications(
            request: { profileId: $id, publicationTypes: [POST], limit: $limit }
        ) {
            items {
                __typename
                ... on Post {
                    ...PostFields
                }
            }
        }
    }
    fragment PostFields on Post {
        id
        metadata {
            ...MetadataOutputFields
        }
    }
    fragment MetadataOutputFields on MetadataOutput {
        content
    }
`;

export const mirror = gql`
    mutation CreateMirrorTypedData {
        createMirrorTypedData(
            request: {
                profileId: "0x03"
                publicationId: "0x01-0x01"
                referenceModule: { followerOnlyReferenceModule: false }
            }
        ) {
            id
            expiresAt
            typedData {
                types {
                    MirrorWithSig {
                        name
                        type
                    }
                }
                domain {
                    name
                    chainId
                    version
                    verifyingContract
                }
                value {
                    nonce
                    deadline
                    profileId
                    profileIdPointed
                    pubIdPointed
                    referenceModule
                    referenceModuleData
                    referenceModuleInitData
                }
            }
        }
    }
`;
