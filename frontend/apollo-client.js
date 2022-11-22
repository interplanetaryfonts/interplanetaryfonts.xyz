import { ApolloClient, InMemoryCache, gql, createHttpLink  } from "@apollo/client";

// Use ipfontsSubgraph when the subgraph is deployed
//const ipfontsSubgraph = 'https://api.thegraph.com/subgraphs/name/interplanetaryfonts/fontproject';
const localhostURI = "http://localhost:4000";

const client = new ApolloClient({
  uri: localhostURI,
  cache: new InMemoryCache(),
});

export default client;
