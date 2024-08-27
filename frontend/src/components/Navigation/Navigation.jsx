import './Navigation.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';

export default function Navigation({ isLoaded }) {
  const user = useSelector(state => state.session.user);

  return (
    <nav id='nav'>
      <div id='logo'>
        <div className='nav-link'>
          <NavLink to='/'>
            <img
              id='logo-image'
              src='/logo.jpeg'
              alt='InnSite logo'
            />
          </NavLink>
        </div>
      </div>

      <h1 id='title'>InnSite</h1>

      {isLoaded && (
        <div id='right-items'>
          {user && (
            <NavLink
              to='inns/new'
              id='create-inn-button'
            >
              Create Inn
            </NavLink>
          )}

          <div className='nav-link'>
            <ProfileButton user={user} />
          </div>
        </div>
      )}
    </nav>
  );
}
