import logo from './assets/logo.png';

export default function Header() {
  return (
    <nav className='navbar bg-light-subtle mb-5 py-3 shadow'>
      <div className='container'>
        <a href='/' className='navbar-brand m-auto' style={{ zoom: 1.3 }}>
          <div className='d-flex'>
            <img src={logo} alt='logo' className='mr-2' />
            <div className='fw-bold'>
              Manage<span className='text-primary'>QL</span>
            </div>
          </div>
        </a>
      </div>
    </nav>
  );
}
