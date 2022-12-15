import { gql } from '@apollo/client';

export const createSetProfileWithMetadata = (profileId, metadata) => {
    return gql`
        mutation CreateSetProfileMetadataTypedData {
            createSetProfileMetadataTypedData(
                request: {
                    profileId: "${profileId}",
                    metadata: "${metadata}"
                }
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
};
