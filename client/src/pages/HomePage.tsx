import Clients from '../components/Clients.tsx';
import Projects from '../components/Projects.tsx';
import AddClientModal from '../components/AddClientModal.tsx';
import AddProjectModal from '../components/AddProjectModal.tsx';

export default function HomePage() {
  return (
    <>
      <div className='d-flex gap-3 mb-4'>
        <AddClientModal />
        <AddProjectModal />
      </div>
      <Projects />
      <Clients />
    </>
  );
}
