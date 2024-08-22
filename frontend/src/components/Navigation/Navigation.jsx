import './Navigation.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignUpFormModal';

export default function Navigation({ isLoaded }) {
  const user = useSelector(state => state.session.user);

  let navLinks;
  if (user) {
    navLinks = (
      <li className='nav-link'>
        <ProfileButton user={user} />
      </li>
    );
  } else {
    navLinks = (
      <>
        <li className='nav-link'>
          <OpenModalButton
            buttonText='Log In'
            modalComponent={<LoginFormModal />}
          />
        </li>
        <li className='nav-link'>
          <OpenModalButton
            buttonText='Sign Up'
            modalComponent={<SignUpFormModal />}
          />
        </li>
      </>
    );
  }

  return (
    <ul id='nav'>
      <li id='home-link' className='nav-link'>
        <NavLink to='/'>Home</NavLink>
      </li>
      {isLoaded && navLinks}
    </ul>
  );
}
