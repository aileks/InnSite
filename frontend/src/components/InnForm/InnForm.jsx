import './InnForm.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createInn } from '../../store/inns';

export default function InnForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState();
  const [previewImage, setPreviewImage] = useState('');
  const [otherImages, setOtherImages] = useState([]);

  const user = useSelector(state => state.session.user);

  if (!user) {
    navigate('/');
  }

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
      navigate(`/inns/${createdInn.id}`);
    } catch (err) {
      console.error('Error creating new Inn:', err);
    }
  };

  return (
    <div id='form-container'>
      <h1 id='form-title'>Create a new Inn</h1>

      <form
        className='inn-form'
        onSubmit={handleSubmit}
      >
        <div className='form-group'>
          <label className='form-label'>
            <h2>Where is your spot located?</h2>
          </label>
          <p className='label-subheading'>
            Because, well, how else would adventurer&apos;s know there&apos;s a sweet Inn nearby!
          </p>

          <label className='form-label'>Country</label>
          <input
            type='text'
            className='form-input'
            value={country}
            placeholder='Country'
            onChange={e => setCountry(e.target.value)}
            required
          />

          <label className='form-label'>Street Address:</label>
          <input
            type='text'
            className='form-input'
            value={address}
            placeholder='Street Address'
            onChange={e => setAddress(e.target.value)}
            required
          />

          <div className='stacked-inputs'>
            <div className='inner-container'>
              <label className='form-label'>City:</label>
              <input
                id='city'
                type='text'
                className='form-input'
                value={city}
                placeholder='City'
                onChange={e => setCity(e.target.value)}
                required
              />
            </div>

            <div className='label-container'>
              <label className='form-label'>State:</label>
              <input
                type='text'
                className='form-input'
                value={state}
                placeholder='STATE'
                onChange={e => setState(e.target.value)}
                required
              />
            </div>
          </div>

          <div className='stacked-inputs'>
            <div className='label-container'>
              <label className='form-label'>Latitude:</label>
              <input
                type='number'
                step='any'
                className='form-input'
                value={lat}
                placeholder='Latitude'
                onChange={e => setLat(e.target.value)}
                required
              />
            </div>

            <div className='label-container'>
              <label className='form-label'>Longitude:</label>
              <input
                type='number'
                step='any'
                className='form-input'
                value={lng}
                placeholder='Longitude'
                onChange={e => setLng(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <hr className='line' />

        <div className='form-group'>
          <label className='form-label'>
            <h2>Describe your Inn to your guests</h2>
          </label>
          <p className='label-subheading'>
            Mention the best features of your Inn, any special amenities, like fire-brewed ale or
            free nights for Dwarves!
          </p>
          <textarea
            className='form-textarea'
            value={description}
            placeholder='Please enter at least 30 characters'
            onChange={e => setDescription(e.target.value)}
            required
          />
        </div>

        <hr className='line' />

        <div className='form-group'>
          <label className='form-label'>
            <h2>Give your Inn a name</h2>
          </label>
          <p className='label-subheading'>Every name has its place! Err...wait...</p>
          <input
            type='text'
            className='form-input'
            value={name}
            placeholder='Name of your Inn'
            onChange={e => setName(e.target.value)}
            required
          />
        </div>

        <hr className='line' />

        <div className='form-group'>
          <label className='form-label'>
            <h2>Set a base price for your Inn</h2>
          </label>
          <p className='label-subheading'>Make sure to account for any dragons in the area!</p>
          <input
            type='number'
            className='form-input'
            value={price}
            placeholder='Price per night (Gold)'
            onChange={e => setPrice(e.target.value)}
            required
          />
        </div>

        <hr className='line' />

        <div className='form-group'>
          <label className='form-label'>
            <h2>Show off your Inn</h2>
          </label>
          <p className='label-subheading'>A picture is worth a thousand words, they say... Now imagine five of them!</p>
          <input
            type='string'
            className='form-input'
            value={previewImage}
            placeholder='Preview Image URL'
            onChange={e => setPreviewImage(e.target.value)}
          />
          <input
            type='number'
            className='form-input'
            value={otherImages[0]}
            placeholder='Image URL'
            onChange={e => setOtherImages([...otherImages, e.target.value])}
          />
          <input
            type='number'
            className='form-input'
            value={otherImages[1]}
            placeholder='Image URL'
            onChange={e => setOtherImages([...otherImages, e.target.value])}
          />
          <input
            type='number'
            className='form-input'
            value={otherImages[2]}
            placeholder='Image URL'
            onChange={e => setOtherImages([...otherImages, e.target.value])}
          />
          <input
            type='number'
            className='form-input'
            value={otherImages[3]}
            placeholder='Image URL'
            onChange={e => setOtherImages([...otherImages, e.target.value])}
          />
        </div>

        <hr className='line' />

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
