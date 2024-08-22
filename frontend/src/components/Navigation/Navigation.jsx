import './Navigation.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';

export default function Navigation({ isLoaded }) {
  const user = useSelector(state => state.session.user);

  return (
    <ul>
      <li>
        <NavLink to='/'>Home</NavLink>
      </li>
      {isLoaded && (
        <li>
          <ProfileButton user={user} />
        </li>
      )}
    </ul>
  );
}
