import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { LuUserCircle } from 'react-icons/lu';
import { logout } from '../../store/session';

export default function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const ulClassName = 'profile-dropdown' + (showMenu ? '' : ' hidden');

  const destroy = e => {
    e.preventDefault();
    dispatch(logout());
  };

  const toggleMenu = e => {
    e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  return (
    <>
      <button
        style={{ color: 'black', fontSize: '2.2rem' }}
        onClick={toggleMenu}
      >
        <LuUserCircle />
      </button>

      <ul className={ulClassName}>
        <li>{user.username}</li>

        <li>
          {user.firstName} {user.lastName}
        </li>

        <li>{user.email}</li>

        <li>
          <button
            id='nav-logout'
            onClick={destroy}
          >
            Log Out
          </button>
        </li>
      </ul>
    </>
  );
}
