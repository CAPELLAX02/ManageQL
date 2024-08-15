export interface IProject {
  id: string;
  name: string;
  description: string;
  status: string;
  clientId: string;
}

export interface IProjects {
  projects: IProject[];
}

export default function ProjectCard({ project }: { project: IProject }) {
  return (
    <div className='col-md-4'>
      <div className='card mb-3 shadow border-0 rounded-1'>
        <div className='card-body'>
          <div className='d-flex justify-content-between align-items-center'>
            <h5 className='card-title'>{project.name}</h5>
            <a
              className='btn btn-light shadow'
              href={`/projects/${project.id}`}
            >
              View
            </a>
          </div>
          <p className='small'>
            Status: <strong>{project.status}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
