import { FormEvent, useState } from 'react';
import { useMutation } from '@apollo/client';
import { GET_PROJECT } from '../queries/projectQueries.ts';
import { UPDATE_PROJECT } from './mutations/projectMutations.ts';
import { IProject } from './ProjectCard.tsx';

export default function EditProjectForm({ project }: { project: IProject }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateProject({
      variables: {
        name,
        description,
        status,
      },
    });
  };

  return (
    <div className='mt-5'>
      <h3>Update Project Details</h3>

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

        <button className='btn btn-success mt-4 ms-1 shadow' type='submit'>
          Update
        </button>
      </form>
    </div>
  );
}
