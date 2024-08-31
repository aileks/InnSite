import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { LuUserCircle } from 'react-icons/lu';
import { logout } from '../../store/sessionSlice';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignUpFormModal';
import { NavLink } from 'react-router-dom';
import { useToast } from '../../context/Toast';

export default function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = e => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = e => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const destroy = e => {
    e.preventDefault();

    dispatch(logout());

    closeMenu();

    showToast('See you next time!');
  };

  const ulClassName = 'profile-dropdown' + (showMenu ? '' : ' hidden');

  return (
    <div id='profile-button'>
      <button
        style={{ color: 'black', fontSize: '2.2rem' }}
        onClick={toggleMenu}
      >
        <LuUserCircle />
      </button>

      <ul
        className={ulClassName}
        ref={ulRef}
      >
        {user ? (
          <>
            <li>Hello, {user.firstName}</li>

            <li>{user.username}</li>

            <li>{user.email}</li>

            <NavLink
              onClick={closeMenu}
              to='/profile'
            >
              <li>Manage Inns</li>
            </NavLink>

            <li onClick={destroy}>Log Out</li>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText='Log In'
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalMenuItem
              itemText='Sign Up'
              onItemClick={closeMenu}
              modalComponent={<SignUpFormModal />}
            />
          </>
        )}
      </ul>
    </div>
  );
}
