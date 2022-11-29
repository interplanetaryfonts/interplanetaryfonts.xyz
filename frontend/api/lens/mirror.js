export const mirror = gql`
    mutation CreateMirrorTypedData(
        $profileId: ProfileId!
        $publicationId: InternalPublicationId!
    ) {
        createMirrorTypedData(
            request: {
                profileId: $profileId
                publicationId: $publicationId
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
