import './Navigation.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';

export default function Navigation({ isLoaded }) {
  const user = useSelector(state => state.session.user);

  return (
    <ul id='nav'>
      <span id='left-items'>
        <li className='nav-link'>
          <NavLink to='/'>
            <img
              id='logo'
              src='/logo.jpeg'
              alt='InnSite logo'
            />
          </NavLink>
        </li>

        <li className='nav-link'></li>
      </span>

      {isLoaded && (
        <li className='nav-link'>
          <ProfileButton user={user} />
        </li>
      )}
    </ul>
  );
}
