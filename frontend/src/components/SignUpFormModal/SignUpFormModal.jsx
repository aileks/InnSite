import './SignUpFormModal.css';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { signup } from '../../store/session';
import { IoIosCloseCircle } from 'react-icons/io';

export default function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (!email || username.length < 4 || !firstName || !lastName || password && password.length < 6 || confirmPassword.length < 6) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [email, username, firstName, lastName, password, confirmPassword]);

  const handleSubmit = e => {
    e.preventDefault();

    if (password === confirmPassword) {
      setErrors({});

      return dispatch(
        signup({
          email,
          username,
          firstName,
          lastName,
          password,
        }),
      )
        .then(closeModal)
        .catch(async res => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }

    return setErrors({
      confirmPassword: 'Confirm Password field must be the same as the Password field',
    });
  };

  return (
    <>
      <span
        onClick={closeModal}
        id='close-button'
      >
        <IoIosCloseCircle />
      </span>

      <div id='signup-container'>
        <h1 id='signup-header'>Sign Up</h1>

        <form
          id='signup-form'
          onSubmit={handleSubmit}
        >
          <div>
            <label className='signup-label'>
              Email
              <input
                className='signup-input'
                type='text'
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </label>

            {errors.email && <p className='error'>{errors.email}</p>}
          </div>

          <div>
            <label className='signup-label'>
              Username
              <input
                className='signup-input'
                type='text'
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
            </label>

            {errors.username && <p className='error'>{errors.username}</p>}
          </div>

          <div>
            <label className='signup-label'>
              First Name
              <input
                className='signup-input'
                type='text'
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required
              />
            </label>

            {errors.firstName && <p className='error'>{errors.firstName}</p>}
          </div>

          <div>
            <label className='signup-label'>
              Last Name
              <input
                className='signup-input'
                type='text'
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                required
              />
            </label>

            {errors.lastName && <p className='error'>{errors.lastName}</p>}
          </div>

          <div>
            <label className='signup-label'>
              Password
              <input
                className='signup-input'
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </label>

            {errors.password && <p className='error'>{errors.password}</p>}
          </div>

          <div>
            <label className='signup-label'>
              Confirm Password
              <input
                className='signup-input'
                type='password'
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
            </label>

            {errors.confirmPassword && <p className='error'>{errors.confirmPassword}</p>}
          </div>

          <div className='button-container'>
            <button
              disabled={disabled}
              id='signup-button'
              type='submit'
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
