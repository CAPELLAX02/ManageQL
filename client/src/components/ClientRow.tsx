import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from './mutations/clientMutations.ts';
import { GET_CLIENTS } from '../queries/clientQueries.ts';
import { GET_PROJECTS } from '../queries/projectQueries.ts';

export interface IClient {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface IClients {
  clients: IClient[];
}

/**
 * Renders a row for a client with options to delete the client.
 *
 * @param {IClient} client - The client data to display in the row.
 * @returns {JSX.Element} The table row displaying the client's details with a delete button.
 */
export default function ClientRow({ client }: { client: IClient }) {
  /**
   * Mutation hook to delete a client from the server.
   * It updates the Apollo cache by removing the deleted client from the clients list.
   */
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    /**
     * updating cache alternative: refetching the data (way more eaiser but the effieciency is debatable)
     */
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],

    /**
     * Updates the Apollo cache to remove the deleted client from the clients list.
     */
    // update(cache, { data: { deleteClient } }) {
    //   const data = cache.readQuery<IClients>({
    //     query: GET_CLIENTS,
    //   });

    //   if (data?.clients) {
    //     cache.writeQuery({
    //       query: GET_CLIENTS,
    //       data: {
    //         clients: data.clients.filter(
    //           (client: IClient) => client.id !== deleteClient.id
    //         ),
    //       },
    //     });
    //   }
    // },
  });

  /**
   * Handles the delete button click event.
   * Prompts the user for confirmation before deleting the client.
   */
  const deleteHandler = () => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      deleteClient();
    }
  };

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button
          className='btn btn-danger btn-sm shadow'
          onClick={deleteHandler}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
