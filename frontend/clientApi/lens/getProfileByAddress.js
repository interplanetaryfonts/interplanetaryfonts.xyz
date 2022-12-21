import { gql } from '@apollo/client';

export const getProfileByAddress = gql`
    query Profiles($owner: EthereumAddress!) {
        profiles(request: { ownedBy: [$owner] }) {
            items {
                id
                handle
            }
        }
    }
`;
