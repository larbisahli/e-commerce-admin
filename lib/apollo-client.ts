import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';
import { RetryLink } from '@apollo/client/link/retry';
import { apiURL } from '@utils/utils';
import { sha256 } from 'crypto-hash';

const persistedQueriesLink = createPersistedQueryLink({
  sha256,
  useGETForHashedQueries: true
});

const httpLink = new HttpLink({
  uri: `${apiURL}/graphql`,
  credentials: 'include'
});

const retryLink = new RetryLink({
  delay: {
    initial: 1000,
    max: Infinity,
    jitter: true
  },
  attempts: {
    max: 5,
    retryIf: (error, _operation) => {
      console.log(`retryIf`, { error, _operation });
      return !!error;
    }
  }
});

const apolloClient = new ApolloClient({
  link: from([retryLink, persistedQueriesLink.concat(httpLink)]),
  cache: new InMemoryCache({
    addTypename: true
  })
});

export default apolloClient;
