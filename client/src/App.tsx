import Header from './components/Header.tsx';
import Clients from './components/Clients.tsx';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache: new InMemoryCache(),
});

export default function App() {
    return (
        <>
            <ApolloProvider client={client}>
                <Header />
                <div className='App'>
                    <Clients />
                </div>
            </ApolloProvider>
        </>
    );
}
