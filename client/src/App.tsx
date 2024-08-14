import Header from './components/Header.tsx';
import Clients from './components/Clients.tsx';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import AddClientModal from './components/AddClientModal.tsx';

/**
 * Configures the Apollo Client's in-memory cache with custom type policies.
 * Specifically, it defines the merge behavior for the 'clients' and 'projects' fields,
 * ensuring that incoming data always replaces the existing cache data.
 *
 * @type {InMemoryCache}
 */
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

/**
 * Configures the Apollo Client's in-memory cache with custom type policies.
 * The 'clients' and 'projects' fields are set to always replace the existing cache data
 * with incoming data by defining custom merge functions.
 *
 * Creates an Apollo Client instance with the specified GraphQL server URI and the configured cache.
 *
 * @type {ApolloClient}
 */
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache,
});

/**
 * The root App component that wraps the entire application in the ApolloProvider.
 * It provides the Apollo Client to the React component tree, enabling GraphQL queries and mutations.
 *
 * @returns {JSX.Element} The main application component.
 */
export default function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className='App'>
          <AddClientModal />
          <Clients />
        </div>
      </ApolloProvider>
    </>
  );
}
