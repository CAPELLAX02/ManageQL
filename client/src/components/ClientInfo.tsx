import { FaEnvelope, FaPhone, FaIdBadge } from 'react-icons/fa';
import { IClient } from './ClientRow';

export default function ClientInfo({ client }: { client: IClient }) {
  return (
    <>
      <h5 className='mt-5'>Client Information</h5>

      <ul className='list-group list-group-flush mt-2'>
        <li className='list-group-item'>
          <FaIdBadge className='icon' /> {client.name}
        </li>
        <li className='list-group-item'>
          <FaEnvelope className='icon' /> {client.email}
        </li>
        <li className='list-group-item'>
          <FaPhone className='icon' /> {client.phone}
        </li>
      </ul>
    </>
  );
}
