import './InnForm.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createInn } from '../../store/inns';

export default function InnForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  const handleSubmit = async e => {
    e.preventDefault();

    const newInn = {
      address,
      city,
      state,
      country,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      name,
      description,
      price: parseFloat(price),
    };

    try {
      const createdInn = await dispatch(createInn(newInn));
      console.log(createdInn);
      navigate(`/inns/${createdInn.id}`)
    } catch (err) {
      console.error('Error creating new Inn:', err);
    }
  };

  return (
    <div id='form-container'>
      <h1 id='form-title'>Create a New Inn</h1>

      <form
        className='inn-form'
        onSubmit={handleSubmit}
      >
        <div className='form-group'>
          <label className='form-label'>Address:</label>

          <input
            type='text'
            className='form-input'
            value={address}
            onChange={e => setAddress(e.target.value)}
            required
          />
        </div>

        <div className='form-group'>
          <label className='form-label'>City:</label>
          <input
            type='text'
            className='form-input'
            value={city}
            onChange={e => setCity(e.target.value)}
            required
          />
        </div>

        <div className='form-group'>
          <label className='form-label'>State:</label>
          <input
            type='text'
            className='form-input'
            value={state}
            onChange={e => setState(e.target.value)}
            required
          />
        </div>

        <div className='form-group'>
          <label className='form-label'>Country:</label>
          <input
            type='text'
            className='form-input'
            value={country}
            onChange={e => setCountry(e.target.value)}
            required
          />
        </div>

        <div className='form-group'>
          <label className='form-label'>Latitude:</label>
          <input
            type='number'
            step='any'
            className='form-input'
            value={lat}
            onChange={e => setLat(e.target.value)}
            required
          />
        </div>

        <div className='form-group'>
          <label className='form-label'>Longitude:</label>
          <input
            type='number'
            step='any'
            className='form-input'
            value={lng}
            onChange={e => setLng(e.target.value)}
            required
          />
        </div>

        <div className='form-group'>
          <label className='form-label'>Name:</label>
          <input
            type='text'
            className='form-input'
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>

        <div className='form-group'>
          <label className='form-label'>Description:</label>
          <textarea
            className='form-textarea'
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
        </div>

        <div className='form-group'>
          <label className='form-label'>Price:</label>
          <input
            type='number'
            className='form-input'
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
          />
        </div>

        <button
          type='submit'
          className='form-button'
        >
          Create Inn
        </button>
      </form>
    </div>
  );
}
