import './Navigation.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';

export default function Navigation({ isLoaded }) {
  const user = useSelector(state => state.session.user);

  return (
    <nav id='nav'>
      <div id='logo'>
        <div className='nav-item'>
          <NavLink to='/'>
            <span id='logo-link'>
              <img
                id='logo-image'
                src='/logo.jpeg'
                alt='InnSite logo'
              />
              <h1 id='title'>InnSite</h1>
            </span>
          </NavLink>
        </div>
      </div>

      {isLoaded && (
        <div id='right-items'>
          {user && (
            <NavLink
              className='create-inn-button'
              to='/inns/new'
            >
              Create a New Inn
            </NavLink>
          )}

          <div className='nav-item'>
            <ProfileButton user={user} />
          </div>
        </div>
      )}
    </nav>
  );
}
