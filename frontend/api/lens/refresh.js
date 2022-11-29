export const refresh = gql`
    mutation Refresh($refreshToken: Jwt!) {
        refresh(request: { refreshToken: $refreshToken }) {
            accessToken
            refreshToken
        }
    }
`;
