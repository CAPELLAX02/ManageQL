import ClientRow, { IClient } from './ClientRow.tsx';
import Spinner from './Spinner.tsx';
import { useQuery } from '@apollo/client';
import { GET_CLIENTS } from '../queries/clientQueries.ts';

/**
 * Renders a list of clients in a table format.
 * Fetches the clients data using a GraphQL query and displays it.
 * Shows a spinner while loading and an error message if the query fails.
 *
 * @returns {JSX.Element} The table of clients or an appropriate message.
 */
export default function Clients() {
  // Execute the GET_CLIENTS query to fetch the clients data
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <Spinner />;
  if (error) return <p>Soemthing went wrong.</p>;

  return (
    <>
      {!loading && !error && (
        <table className='table table-stripe mt-3'>
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
              return <ClientRow key={client.id} client={client} />;
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
