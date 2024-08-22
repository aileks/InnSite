import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { LuUserCircle } from 'react-icons/lu';
import logout from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignUpFormModal';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
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

  const destroy = e => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = 'profile-dropdown' + (showMenu ? '' : ' hidden');

  return (
    <>
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
        {user ?
          <>
            <li>{user.username}</li>

            <li>
              {user.firstName} {user.lastName}
            </li>

            <li>{user.email}</li>

            <li>
              <button onClick={destroy}>Log Out</button>
            </li>
          </>
        : <>
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
        }
      </ul>
    </>
  );
}

export default ProfileButton;
