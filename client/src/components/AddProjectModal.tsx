import { FormEvent, useState } from 'react';
import { FaList } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PROJECT } from './mutations/projectMutations.ts';
import { GET_PROJECTS } from '../queries/projectQueries.ts';
import { GET_CLIENTS } from '../queries/clientQueries.ts';
import { IClient } from './ClientRow.tsx';
import { IProject, IProjects } from './ProjectCard.tsx';

export default function AddProjectModal() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [clientId, setClientId] = useState('');
  const [status, setStatus] = useState('new');

  const [addProject] = useMutation<
    { addProject: IProject },
    { name: string; description: string; clientId: string; status: string }
  >(ADD_PROJECT, {
    update(cache, { data }) {
      if (data?.addProject) {
        const existingProjects = cache.readQuery<{ projects: IProject[] }>({
          query: GET_PROJECTS,
        });

        if (existingProjects) {
          cache.writeQuery({
            query: GET_PROJECTS,
            data: { projects: [...existingProjects.projects, data.addProject] },
          });
        }
      }
    },
  });

  const { loading, error, data } = useQuery<{ clients: IClient[] }>(
    GET_CLIENTS
  );

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name === '' || description === '' || clientId === '' || status === '') {
      return alert('Please fill in all fields.');
    }

    addProject({
      variables: { name, description, clientId, status },
    });

    setName('');
    setDescription('');
    setClientId('');
    setStatus('new');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong.</p>;

  return (
    <>
      {!loading && !error && (
        <>
          <button
            type='button'
            className='btn btn-primary'
            data-bs-toggle='modal'
            data-bs-target='#addProjectModal'
          >
            <div className='d-flex align-items-center'>
              <FaList className='icon' />
              <div>New Project</div>
            </div>
          </button>

          <div
            className='modal fade'
            id='addProjectModal'
            aria-labelledby='addProjectModalLabel'
            aria-hidden='true'
          >
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h1 className='modal-title fs-5' id='addProjectModalLabel'>
                    New Project
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
                    <div>
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
                    <div>
                      <label className='form-label'></label>
                      <textarea
                        className='form-control'
                        placeholder='Description'
                        id='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label className='form-label'></label>
                      <select
                        className='form-select'
                        id='status'
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value='new'>Not Started</option>
                        <option value='progress'>In Progress</option>
                        <option value='completed'>Completed</option>
                      </select>
                    </div>

                    <div className='mb-3'>
                      <label className='form-label'></label>
                      <select
                        className='form-select'
                        id='clientId'
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                      >
                        <option value=''>Select Client</option>
                        {data?.clients.map((client: any) => {
                          return (
                            <option key={client.id} value={client.id}>
                              {client.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <button
                      className='btn btn-primary'
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
      )}
    </>
  );
}
