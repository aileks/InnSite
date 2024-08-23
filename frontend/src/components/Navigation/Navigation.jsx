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
          <img
            id='logo'
            src='logo.jpeg'
            alt='InnSite logo'
          />
        </li>

        <li className='nav-link'>
          <NavLink to='/'>Home</NavLink>
        </li>
      </span>

      {isLoaded && (
        <li className='nav-link'>
          <ProfileButton user={user} />
        </li>
      )}
    </ul>
  );
}
