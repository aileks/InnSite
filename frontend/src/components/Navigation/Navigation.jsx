import './Navigation.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';

export default function Navigation({ isLoaded }) {
  const user = useSelector(state => state.session.user);

  return (
    <ul id='nav'>
      <li id='home-link' className='nav-link'>
        <NavLink to='/'>Home</NavLink>
      </li>
      {isLoaded && (
        <li className='nav-link'>
          <ProfileButton user={user} />
        </li>
      )}
    </ul>
  );
}
