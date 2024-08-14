import AddClientModal from '../components/AddClientModal.tsx';
import Clients from '../components/Clients.tsx';
import Projects from '../components/Projects.tsx';

export default function HomePage() {
  return (
    <>
      <div className='d-flex gap-3 mb-4'>
        <AddClientModal />
      </div>
      <Projects />
      <hr />
      <Clients />
    </>
  );
}
