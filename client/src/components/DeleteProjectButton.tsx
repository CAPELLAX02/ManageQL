import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { GET_PROJECTS } from '../queries/projectQueries.ts';
import { DELETE_PROJECT } from './mutations/projectMutations.ts';
import { useMutation } from '@apollo/client';

interface IProjectIdProps {
  projectId: number;
}

export default function DeleteProjectButton({ projectId }: IProjectIdProps) {
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => navigate('/'),
    // Instead of updating cache, this time we are refetching the query just for a change
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  const handleDeleteProject = () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject();
    }
  };

  return (
    <div className='d-flex mt-5 ms-auto'>
      <button
        className='btn btn-danger m-2 shadow-lg'
        onClick={handleDeleteProject}
      >
        <FaTrash className='icon' /> Delete Project
      </button>
    </div>
  );
}
