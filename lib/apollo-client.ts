import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';
import { apiURL } from '@utils/utils';

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
  link: from([retryLink, httpLink]),
  cache: new InMemoryCache({
    addTypename: false
  })
});

export default apolloClient;
