import { gql } from "@apollo/client";

export const createSetDefaultProfile = gql`
  mutation CreateSetDefaultProfileTypedData(
    $request: CreateSetDefaultProfileRequest!
  ) {
    createSetDefaultProfileTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          SetDefaultProfileWithSig {
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
          wallet
          profileId
        }
      }
    }
  }
`;
