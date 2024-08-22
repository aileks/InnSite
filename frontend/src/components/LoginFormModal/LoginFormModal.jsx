import './LoginFormModal.css';
import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';

export default function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = e => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async res => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
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

        {errors.credential && <p>{errors.credential}</p>}

        <button
          id='login-button'
          type='submit'
        >
          Log In
        </button>
      </form>
    </div>
  );
}
