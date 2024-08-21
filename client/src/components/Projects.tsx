import Spinner from './Spinner.tsx';
import ProjectCard, { IProject } from './ProjectCard.tsx';
import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../queries/projectQueries.ts';

export default function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong.</p>;

  return (
    <>
      {data.projects.length > 0 ? (
        <div className='row mt-4'>
          {data.projects.map((project: IProject) => {
            return <ProjectCard key={project.id} project={project} />;
          })}
        </div>
      ) : (
        <p>No Projects.</p>
      )}
    </>
  );
}
