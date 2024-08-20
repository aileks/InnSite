import './LoginForm.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = () => {
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
    <main>
      <h1>Log In</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type='text'
            value={credential}
            onChange={e => setCredential(e.target.value)}
            required
          />
        </label>

        <label id='password'>
          Password
          <input
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>

        {errors.credential && <p>{errors.credential}</p>}

        <button type='submit'>Log In</button>
      </form>
    </main>
  );
};

export default LoginForm;
