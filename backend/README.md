# Backend

## Apollo GraphQL

You can interact with the schema using the Apollo Explorer

1.  Install the required dependencies for the backend
    ```Shell
    pnpm install
    ```
2.  Run the server
    -   From `interplanetaryfonts/interplanetaryfonts.xyz/backend/`
        ```Shell
        nodemon src/index
        ```
    -   From `interplanetaryfonts/`
        ```Shell
        pnpm run dev:backend
        ```
3.  Open [localhost:4000](http://localhost:4000)

    -   Press the `Query your server` button (if not automatic)

4.  Start querying
    ```graphql
    query Fonts {
        fontProjects {
            id
            name
            description
            perCharacterMintPrice
            creator {
                address
            }
            idaRoyaltyIndex
            launchDateTime
            createdAt
            updatedAt
            fontFilesCID
            mintings
            distributionToken
        }
    }
    ```
