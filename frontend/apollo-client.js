import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/interplanetaryfonts/fontproject',
    cache: new InMemoryCache(),
});

console.log(client);

export default client;
