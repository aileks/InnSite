import './LoginFormModal.css';
import { useState } from 'react';
import { login } from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { IoIosCloseCircle } from 'react-icons/io';

export default function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  console.log(errors);

  const handleSubmit = e => {
    e.preventDefault();

    setErrors({});

    return dispatch(login({ credential, password }))
      .then(closeModal)
      .catch(async res => {
        const data = await res.json();

        if (data && data.message) {
          setErrors(data);
        }
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

      <div id='login-container'>
        <h1 id='login-header'>Log In</h1>

        <form
          id='login-form'
          onSubmit={handleSubmit}
        >
          <label className='login-label'>
            Username or Email
            <input
              className='login-input'
              type='text'
              value={credential}
              onChange={e => setCredential(e.target.value)}
              required
            />
          </label>

          <label className='login-label'>
            Password
            <input
              className='login-input'
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </label>

          <div className='error'>{errors && <p>{errors.message}</p>}</div>

          <div className='button-container'>
            <button
              id='login-button'
              type='submit'
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
