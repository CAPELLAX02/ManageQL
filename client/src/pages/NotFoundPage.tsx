import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center mt-5 bg-light py-5 rounded-4 w-75 m-auto px-5 text-center shadow-lg'>
      <FaExclamationTriangle
        className='text-warning mb-4 mt-5 p-1'
        size='5em'
      />
      <h1>404</h1>
      <p className='lead'>Sorry, this page does not exist.</p>
      <Link to='/' className='btn btn-secondary mb-5 shadow-lg'>
        Go Back
      </Link>
    </div>
  );
}
