import { Link, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner.tsx';
import ClientInfo from '../components/ClientInfo.tsx';
import DeleteProjectButton from '../components/DeleteProjectButton.tsx';
import { useQuery } from '@apollo/client';
import { GET_PROJECT } from '../queries/projectQueries.ts';
import EditProjectForm from '../components/EditProjectForm.tsx';

export default function ProjectPage() {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong.</p>;

  return (
    <>
      {!loading && !error && (
        <div className='mx-auto mb-5 w-75 card p-5 border-0 shadow-lg'>
          <Link
            to='/'
            className='btn btn-light btn-sm w-25 d-inline ms-auto shadow'
          >
            Go Back
          </Link>

          <h1>{data.project.name}</h1>

          <p>{data.project.description}</p>

          <h5 className='mt-3'>Project Status</h5>
          <p className='lead'>{data.project.status}</p>

          <ClientInfo client={data.project.client} />

          <EditProjectForm project={data.project} />

          <DeleteProjectButton projectId={data.project.id} />
        </div>
      )}
    </>
  );
}
