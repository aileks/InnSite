import './Navigation.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';

export default function Navigation({ isLoaded }) {
  const user = useSelector(state => state.session.user);

  const navLinks =
    user ?
      <li className='nav-link'>
        <ProfileButton user={user} />
      </li>
    : <>
        <li className='nav-link'>
          <NavLink to='/login'>Log In</NavLink>
        </li>

        <li className='nav-link'>
          <NavLink to='/signup'>Sign Up</NavLink>
        </li>
      </>;

  return (
    <ul id='nav'>
      <li id='home-link' className='nav-link'>
        <NavLink to='/'>Home</NavLink>
      </li>

      {isLoaded && navLinks}
    </ul>
  );
}
