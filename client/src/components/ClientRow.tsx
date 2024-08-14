import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from './mutations/clientMutations.ts';
import { useEffect } from 'react';

export interface IClient {
    id: string;
    name: string;
    email: string;
    phone: string;
}

export default function ClientRow({ client }: { client: IClient }) {
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: { id: client.id },
    });

    const deleteHandler = () => {
        if (window.confirm('Are you sure you want to delete this client?')) {
            deleteClient();
        }
    };

    useEffect(() => {}, [client]);

    return (
        <tr>
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>{client.phone}</td>
            <td>
                <button
                    className='btn btn-danger btn-sm'
                    onClick={deleteHandler}
                >
                    <FaTrash />
                </button>
            </td>
        </tr>
    );
}
