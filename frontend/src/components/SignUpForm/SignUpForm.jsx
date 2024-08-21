import './SignUpForm.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { signUp } from '../../store/session';

export default function SignUpForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

    if (password === confirmPassword) {
      setErrors({});

      return dispatch(
        signUp({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      ).catch(async res => {
        const data = await res.json();
        if (data?.errors) {
          setErrors(data.errors);
        }
      });
    }

    return setErrors({
      confirmPassword:
        'Confirm Password field must be the same as the Password field',
    });
  };

  return (
    <main id='signup-content'>
      <h1 id='signup-header'>Sign Up</h1>

      <form
        className='signup-form'
        onSubmit={handleSubmit}
      >
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

        {errors.email && <p>{errors.email}</p>}

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

        {errors.username && <p>{errors.username}</p>}

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

        {errors.firstName && <p>{errors.firstName}</p>}

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

        {errors.lastName && <p>{errors.lastName}</p>}

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

        {errors.password && <p>{errors.password}</p>}

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

        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}

        <div className='button-container'>
          <button
            id='signup-button'
            type='submit'
          >
            Sign Up
          </button>
        </div>
      </form>
    </main>
  );
}
