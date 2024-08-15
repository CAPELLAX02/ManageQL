import { FormEvent, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { ADD_CLIENT } from './mutations/clientMutations.ts';
import { GET_CLIENTS } from '../queries/clientQueries.ts';
import { IClient } from './ClientRow.tsx';

export default function AddClientModal() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [addClient] = useMutation<
    { addClient: IClient },
    { name: string; email: string; phone: string }
  >(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data }) {
      if (data?.addClient) {
        const existingClients = cache.readQuery<{ clients: IClient[] }>({
          query: GET_CLIENTS,
        });

        if (existingClients) {
          cache.writeQuery({
            query: GET_CLIENTS,
            data: {
              clients: [...existingClients.clients, data.addClient],
            },
          });
        }
      }
    },
  });

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if ((name || email || phone) === '') {
      return alert('Please fill in all fields.');
    }

    addClient({ variables: { name, email, phone } });

    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <>
      <button
        type='button'
        className='btn btn-secondary'
        data-bs-toggle='modal'
        data-bs-target='#addClientModal'
      >
        <div className='d-flex align-items-center'>
          <FaUser className='icon' />
          <div>Add Client</div>
        </div>
      </button>

      <div
        className='modal fade'
        id='addClientModal'
        aria-labelledby='addClientModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='addClientModalLabel'>
                Add Client
              </h1>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <form onSubmit={submitHandler}>
                <div className='mb-1'>
                  <label className='form-label'></label>
                  <input
                    className='form-control'
                    placeholder='Name'
                    type='text'
                    id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className='mb-1'>
                  <label className='form-label'></label>
                  <input
                    className='form-control'
                    placeholder='Email'
                    type='email'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className='mb-4'>
                  <label className='form-label'></label>
                  <input
                    className='form-control'
                    placeholder='Phone'
                    type='text'
                    id='name'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <button
                  className='btn btn-secondary'
                  type='submit'
                  data-bs-dismiss='modal'
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
