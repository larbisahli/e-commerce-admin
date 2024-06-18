import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';
import { RetryLink } from '@apollo/client/link/retry';
import { apiURL } from '@utils/utils';
import { sha256 } from 'crypto-hash';
import isEmpty from 'lodash/isEmpty';

const httpLink = new HttpLink({
  uri: `${apiURL}/graphql`,
  credentials: 'include'
});

const retryLink = new RetryLink({
  delay: {
    initial: 1000,
    max: 5000,
    jitter: true
  },
  attempts: {
    max: 2,
    retryIf: (error, _operation) => {
      console.log(`retryIf`, { error, _operation });
      return !isEmpty(error);
    }
  }
});

const persistedQueriesLink = createPersistedQueryLink({
  sha256,
  useGETForHashedQueries: true
});

const apolloClient = new ApolloClient({
  link: from([retryLink, persistedQueriesLink.concat(httpLink)]),
  // link: from([retryLink, httpLink]),
  cache: new InMemoryCache({
    addTypename: false
  })
});

export default apolloClient;
