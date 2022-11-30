import {
  ApolloClient,
  InMemoryCache,
  gql,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const authLink = setContext((_, { headers }) => {
  const token = window.localStorage.getItem('lens-auth-token');
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : '',
    },
  };
});

const API_URL = 'https://api-mumbai.lens.dev/';

const httpLink = createHttpLink({
  uri: API_URL,
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export * from './lens/authenticate';
export * from './lens/challenge';
export * from './lens/createProfile';
export * from './lens/exploreProfiles';
export * from './lens/getDefaultProfile';
export * from './lens/getProfileByHandle';
export * from './lens/getProfileByAddress';
export * from './lens/getPublications';
export * from './lens/mirror';
export * from './lens/refresh';

export * from './ipfonts/createIPFontsUser';