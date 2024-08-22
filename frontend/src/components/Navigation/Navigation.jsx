import './Navigation.css';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import { logout } from '../../store/session';

export default function Navigation({ isLoaded }) {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const destroy = e => {
    e.preventDefault();

    dispatch(logout());
  };

  const sessionLinks =
    user ?
      <>
        <li className='nav-link'>
          <ProfileButton user={user} />
        </li>

        <li className='nav-link'>
          <button
            id='nav-logout'
            onClick={destroy}
          >
            Log Out
          </button>
        </li>
      </>
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
      <li className='nav-link' id='home-link'>
        <NavLink to='/'>Home</NavLink>
      </li>

      {isLoaded && sessionLinks}
    </ul>
  );
}
