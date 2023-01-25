import { gql } from "@apollo/client";

export const getDefaultProfile = gql`
    query defaultProfile($request: DefaultProfileRequest!) {
        defaultProfile(request: $request) {
            id
            handle
            name
            bio
            attributes {
                key
                value
            }
            coverPicture {
                ... on MediaSet {
                    original {
                        url
                    }
                }
            }
            picture {
                ... on MediaSet {
                    original {
                        url
                    }
                }
                ... on NftImage {
                    uri
                    tokenId
                    contractAddress
                }
            }
        }
    }
`;
