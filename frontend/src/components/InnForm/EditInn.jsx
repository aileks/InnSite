import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectInnById, getInnById, updateInn } from "../../store/inns";
import { useToast } from "../../context/Toast";

export default function EditInn() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inn = useSelector(selectInnById(id));
  const { showToast } = useToast();
  const user = useSelector((state) => state.session.user);

  const [address, setAddress] = useState(inn?.address);
  const [city, setCity] = useState(inn?.city);
  const [state, setState] = useState(inn?.state);
  const [country, setCountry] = useState(inn?.country);
  const [lat, setLat] = useState(inn?.lat);
  const [lng, setLng] = useState(inn?.lng);
  const [name, setName] = useState(inn?.name);
  const [description, setDescription] = useState(inn?.description);
  const [price, setPrice] = useState(inn?.price);
  // const [images, setImages] = useState([]);
  // const [previewImage, setPreviewImage] = useState({ preview: true, url: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (lat > 90) {
      setLat(90);
    } else if (lat < -90) {
      setLat(-90);
    }

    if (lng > 180) {
      setLng(180);
    } else if (lng < -180) {
      setLng(-180);
    }
  }, [lat, lng]);

  useEffect(() => {
    dispatch(getInnById(id)).then((data) => {
      setAddress(data.address);
      setCity(data.city);
      setState(data.state);
      setCountry(data.country);
      setLat(data.lat);
      setLng(data.lng);
      setName(data.name);
      setDescription(data.description);
      setPrice(data.price);
    });
  }, [id, dispatch]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  // const handleImageChange = (idx, value) => {
  //   const newImages = [...images];
  //   newImages[idx] = value;
  //   setImages(newImages);
  // };

  const validateForm = () => {
    const newErrors = {};

    if (!country) newErrors.country = "Country is required";
    if (!address) newErrors.address = "Address is required";
    if (!city) newErrors.city = "City is required";
    if (!state) newErrors.state = "State is required";
    if (!lat) newErrors.lat = "Latitude is required";
    if (!lng) newErrors.lng = "Longitude is required";
    if (!name) newErrors.name = "Name is required";
    if (!description || description.length < 30)
      newErrors.description = "Description needs a minimum of 30 characters";
    if (description.length > 250)
      newErrors.description = "Description cannot exceed 250 characters";
    if (!price || price <= 0) newErrors.price = "Price is required";
    // if (!previewImage.url) newErrors.previewImage = 'Preview image is required';

    // if (images.length > 0) {
    //   images.forEach((image, idx) => {
    //     if (image && !/\.(jpg|jpeg|png)$/.test(image)) {
    //       newErrors[`image${idx}`] = 'Image URL must end in .png, .jpg, or .jpeg';
    //     }
    //   });
    // }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setErrors({});

    const updatedInn = {
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
      await dispatch(updateInn(id, updatedInn));

      // await dispatch(updateImage(inn.id, previewImage));

      // if (images.length > 0) {
      //   for (const image of images) {
      //     await dispatch(updateImage(inn.id, image));
      //   }
      // }

      navigate(`/inns/${id}`);

      showToast("Inn successfully updated");
    } catch (err) {
      console.error("Error creating new inn:", err);
    }
  };

  return (
    <div id="form-container">
      <div id="form-header">
        <h1 id="form-title">Update Your Inn</h1>

        <p>(Or Tavern...)</p>
      </div>

      <form className="inn-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">
            <h2>
              Where is your inn located <em>now</em>?
            </h2>
          </label>

          <p className="label-subheading">
            I didn&apos;t know you could move a whole building like that...
          </p>

          <label className="form-label">Country</label>

          <input
            type="text"
            className="form-input"
            value={country}
            placeholder="Country"
            onChange={(e) => setCountry(e.target.value)}
          />

          {errors.country && <p className="error">{errors.country}</p>}

          <label id="street-address" className="form-label">
            Street Address:
          </label>

          <input
            type="text"
            className="form-input"
            value={address}
            placeholder="Street Address"
            onChange={(e) => setAddress(e.target.value)}
          />

          {errors.address && <p className="error">{errors.address}</p>}

          <div className="stacked-inputs">
            <div className="inner-container">
              <label className="form-label">City:</label>

              <input
                id="city"
                type="text"
                className="form-input"
                value={city}
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
              />

              {errors.city && <p className="error">{errors.city}</p>}
            </div>

            <div className="label-container">
              <label className="form-label">State:</label>

              <input
                type="text"
                className="form-input"
                value={state}
                placeholder="STATE"
                onChange={(e) => setState(e.target.value)}
              />

              {errors.state && <p className="error">{errors.state}</p>}
            </div>
          </div>

          <div className="stacked-inputs">
            <div className="label-container">
              <label className="form-label">Latitude:</label>

              <input
                type="number"
                max={90}
                min={-90}
                step="any"
                className="form-input"
                value={lat || ""}
                placeholder="Latitude"
                onChange={(e) => setLat(e.target.value)}
              />

              {errors.lat && <p className="error">{errors.lat}</p>}
            </div>

            <div className="label-container">
              <label className="form-label">Longitude:</label>

              <input
                type="number"
                max={180}
                min={-180}
                step="any"
                className="form-input"
                value={lng || ""}
                placeholder="Longitude"
                onChange={(e) => setLng(e.target.value)}
              />

              {errors.lng && <p className="error">{errors.lng}</p>}
            </div>
          </div>
        </div>

        <hr className="line" />

        <div className="form-group">
          <label className="form-label">
            <h2>Describe your Inn to your guests</h2>
          </label>

          <p className="label-subheading">
            An update to the menu, eh? Or perhaps the Dwarves got too rowdy...
          </p>

          {errors.description && <p className="error">{errors.description}</p>}

          <textarea
            className="form-textarea"
            value={description}
            placeholder="Please enter at least 30 characters"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <hr className="line" />

        <div className="form-group">
          <label className="form-label">
            <h2>Give your Inn a name</h2>
          </label>

          <p className="label-subheading">
            Memory potion needed? An Elixir of Greater Intellect, perhaps?
          </p>

          {errors.name && <p className="error">{errors.name}</p>}

          <input
            type="text"
            className="form-input"
            value={name}
            placeholder="Name of your Inn"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <hr className="line" />

        <div className="form-group">
          <label className="form-label">
            <h2>Set a base price for your Inn</h2>
          </label>

          <p className="label-subheading">
            When times are tough...or maybe not-so-tough!
          </p>

          {errors.price && <p className="error">{errors.price}</p>}

          <input
            type="number"
            className="form-input"
            value={price || ""}
            placeholder="Price per night (Gold)"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        {/* <hr className='line' /> */}

        {/* <div className='form-group'> */}
        {/*   <label className='form-label'> */}
        {/*     <h2>Show off your Inn</h2> */}
        {/*   </label> */}
        {/*   <p className='label-subheading'> */}
        {/*     A picture is worth a thousand words, they say... Now imagine five of them! */}
        {/*   </p> */}
        {/* <input */}
        {/*   type='text' */}
        {/*   className='form-input image-input' */}
        {/*   value={previewImage.url} */}
        {/*   placeholder='Preview Image URL' */}
        {/*   onChange={e => setPreviewImage({ ...previewImage, url: e.target.value })} */}
        {/* /> */}

        {/* {Array.from({ length: 4 }, (_, idx) => ( */}
        {/*   <> */}
        {/*     <input */}
        {/*       key={idx} */}
        {/*       type='text' */}
        {/*       className='form-input image-input' */}
        {/*       value={images[idx] || ''} */}
        {/*       placeholder={`Image URL`} */}
        {/*       onChange={e => handleImageChange(idx, e.target.value)} */}
        {/*     /> */}
        {/* </> */}
        {/* ))} */}
        {/* </div> */}

        <hr className="line" />

        <button type="submit" className="form-button">
          Update Inn
        </button>
      </form>
    </div>
  );
}
