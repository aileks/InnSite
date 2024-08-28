import './InnForm.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createInn, addNewImage } from '../../store/inns';

export default function InnForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.session.user);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [previewImage, setPreviewImage] = useState({ preview: true, url: '' });
  const [errors, setErrors] = useState({});

  if (!user) {
    navigate('/');
  }

  const handleImageChange = (idx, value) => {
    const newImages = [...images];
    newImages[idx] = value;
    setImages(newImages);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!country) newErrors.country = 'Country is required';
    if (!address) newErrors.address = 'Address is required';
    if (!city) newErrors.city = 'City is required';
    if (!state) newErrors.state = 'State is required';
    if (!lat) newErrors.lat = 'Latitude is required';
    if (!lng) newErrors.lng = 'Longitude is required';
    if (!name) newErrors.name = 'Name is required';
    if (!description || description.length < 30)
      newErrors.description = 'Description needs a minimum of 30 characters';
    if (!price || price <= 0) newErrors.price = 'Price is required';
    if (!previewImage.url) newErrors.previewImage = 'Preview image is required';

    if (images.length > 0) {
      images.forEach((image, idx) => {
        if (image && !/\.(jpg|jpeg|png)$/.test(image)) {
          newErrors[`image${idx}`] = 'Image URL must end in .png, .jpg, or .jpeg';
        }
      });
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateForm()) return;

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

      await dispatch(addNewImage(createdInn.id, previewImage));

      if (images.length > 0) {
        for (const image of images) {
          await dispatch(addNewImage(createdInn.id, image));
        }
      }

      navigate(`/inns/${createdInn.id}`);
    } catch (err) {
      console.error('Error creating new inn:', err);
    }
  };

  console.log(errors);

  return (
    <div id='form-container'>
      <div id='form-header'>
        <h1 id='form-title'>Create a new Inn</h1>
        <p>(We also accept Taverns...)</p>
      </div>
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

          {errors.country && <p className='error'>{errors.country}</p>}
          <label className='form-label'>Country</label>
          <input
            type='text'
            className='form-input'
            value={country}
            placeholder='Country'
            onChange={e => setCountry(e.target.value)}
          />

          {errors.address && <p className='error'>{errors.address}</p>}
          <label
            id='street-address'
            className='form-label'
          >
            Street Address:
          </label>
          <input
            type='text'
            className='form-input'
            value={address}
            placeholder='Street Address'
            onChange={e => setAddress(e.target.value)}
          />

          <div className='stacked-inputs'>
            <div className='inner-container'>
              {errors.city && <p className='error'>{errors.city}</p>}

              <label className='form-label'>City:</label>

              <input
                id='city'
                type='text'
                className='form-input'
                value={city}
                placeholder='City'
                onChange={e => setCity(e.target.value)}
              />
            </div>

            <div className='label-container'>
              {errors.state && <p className='error'>{errors.state}</p>}

              <label className='form-label'>State:</label>

              <input
                type='text'
                className='form-input'
                value={state}
                placeholder='STATE'
                onChange={e => setState(e.target.value)}
              />
            </div>
          </div>

          <div className='stacked-inputs'>
            <div className='label-container'>
              {errors.lat && <p className='error'>{errors.lat}</p>}

              <label className='form-label'>Latitude:</label>

              <input
                type='number'
                step='any'
                className='form-input'
                value={lat || ''}
                placeholder='Latitude'
                onChange={e => setLat(e.target.value)}
              />
            </div>

            <div className='label-container'>
              {errors.lng && <p className='error'>{errors.lng}</p>}

              <label className='form-label'>Longitude:</label>

              <input
                type='number'
                step='any'
                className='form-input'
                value={lng || ''}
                placeholder='Longitude'
                onChange={e => setLng(e.target.value)}
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

          {errors.description && <p className='error'>{errors.description}</p>}

          <textarea
            className='form-textarea'
            value={description}
            placeholder='Please enter at least 30 characters'
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        <hr className='line' />

        <div className='form-group'>
          <label className='form-label'>
            <h2>Give your Inn a name</h2>
          </label>

          <p className='label-subheading'>Every name has its place! Err...wait...</p>

          {errors.name && <p className='error'>{errors.name}</p>}

          <input
            type='text'
            className='form-input'
            value={name}
            placeholder='Name of your Inn'
            onChange={e => setName(e.target.value)}
          />
        </div>

        <hr className='line' />

        <div className='form-group'>
          <label className='form-label'>
            <h2>Set a base price for your Inn</h2>
          </label>

          <p className='label-subheading'>Will that be cash or credit?</p>

          {errors.price && <p className='error'>{errors.price}</p>}

          <input
            type='number'
            className='form-input'
            value={price || ''}
            placeholder='Price per night (Gold)'
            onChange={e => setPrice(e.target.value)}
          />
        </div>

        <hr className='line' />

        <div className='form-group'>
          <label className='form-label'>
            <h2>Show off your Inn</h2>
          </label>
          <p className='label-subheading'>
            A picture is worth a thousand words, they say... Now imagine five of them!
          </p>
          <input
            type='text'
            className='form-input image-input'
            value={previewImage.url}
            placeholder='Preview Image URL'
            onChange={e => setPreviewImage({ ...previewImage, url: e.target.value })}
          />
          {errors.previewImage && <p className='error'>{errors.previewImage}</p>}

          {Array.from({ length: 4 }, (_, idx) => (
            <>
              <input
                key={idx}
                type='text'
                className='form-input image-input'
                value={images[idx] || ''}
                placeholder={`Image URL`}
                onChange={e => handleImageChange(idx, e.target.value)}
              />
              {errors[`image${idx}`] && <p className='error'>{errors[`image${idx}`]}</p>}
            </>
          ))}
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
