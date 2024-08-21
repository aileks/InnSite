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
        <li>
          <ProfileButton user={user} />
        </li>

        <li>
          <button
            id='nav-logout'
            onClick={destroy}
          >
            Log Out
          </button>
        </li>
      </>
    : <>
        <li>
          <NavLink to='/login'>Log In</NavLink>
        </li>

        <li>
          <NavLink to='/signup'>Sign Up</NavLink>
        </li>
      </>;

  return (
    <ul>
      <li id='home-link'>
        <NavLink to='/'>Home</NavLink>
      </li>

      {isLoaded && sessionLinks}
    </ul>
  );
}
