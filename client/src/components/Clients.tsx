import ClientRow, { IClient } from './ClientRow.tsx';
import Spinner from './Spinner.tsx';
import { useQuery } from '@apollo/client';
import { GET_CLIENTS } from '../queries/clientQueries.ts';

export default function Clients() {
    const { loading, error, data } = useQuery(GET_CLIENTS);

    if (loading) return <Spinner />;
    if (error) return <p>Soemthing went wrong.</p>;

    return (
        <>
            {!loading && !error && (
                <table className='table table-hover mt-3'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.clients.map((client: IClient) => {
                            return (
                                <ClientRow key={client.id} client={client} />
                            );
                        })}
                    </tbody>
                </table>
            )}
        </>
    );
}
