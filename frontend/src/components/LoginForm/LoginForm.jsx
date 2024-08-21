import './LoginForm.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { login } from '../../store/session';

export default function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  if (sessionUser)
    return (
      <Navigate
        to='/'
        replace={true}
      />
    );

  const handleSubmit = e => {
    e.preventDefault();

    setErrors({});

    return dispatch(login({ credential, password })).catch(async res => {
      const data = await res.json();
      if (data?.errors) setErrors(data.errors);
    });
  };

  return (
    <main id='login-container'>
      <h1 id='login-header'>Log In</h1>

      <form
        className='login-form'
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

        <label
          className='login-label'
        >
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
    </main>
  );
}
