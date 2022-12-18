import { gql } from '@apollo/client';

export const createSetProfileWithMetadata = gql`
    mutation CreateSetProfileMetadataTypedData(
        $profileId: ProfileId!
        $metadata: Url!
    ) {
        createSetProfileMetadataTypedData(
            request: { profileId: $profileId, metadata: $metadata }
        ) {
            id
            expiresAt
            typedData {
                types {
                    SetProfileMetadataURIWithSig {
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
                    metadata
                }
            }
        }
    }
`;
