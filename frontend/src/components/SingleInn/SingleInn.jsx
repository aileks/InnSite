import './SingleInn.css';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { selectInnById, getInnById } from '../../store/inns';
import { useEffect } from 'react';
import NotFound from '../404';
import Reviews from '../Reviews';
import AvgRating from '../Reviews/AvgRating';

export default function SingleInn() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const inn = useSelector(selectInnById(id));

  // Get non-preview images
  const images = inn?.SpotImages?.filter(image => image.preview === false);

  // Get user ID for comparison in Reviews component
  const user = useSelector(state => state.session.user) || null;
  const userId = user ? user.id : null;

  const handleClick = e => {
    e.preventDefault();

    alert('Feature coming soon!');
  };

  useEffect(() => {
    dispatch(getInnById(id));
  }, [id, dispatch]);

  return (
    <>
      {inn ? (
        <>
          <div id='inn-container'>
            <Link to='/'>Go Back</Link>

            <div id='inn-content'>
              <span id='images'>
                <img
                  id='preview-image'
                  src={inn.previewImage}
                  alt={inn.name}
                  title={inn.name}
                />

                {images?.map(image => (
                  <img
                    key={image.id}
                    className='inn-image'
                    src={`${image.url}`}
                    alt=''
                  />
                ))}
              </span>

              <h1 id='inn-title'>{inn.name}</h1>

              <div id='inn-location'>
                <h3 id='inn-country'>{inn.country}</h3>
                {inn.city}, {inn.state}
              </div>

              <h2 id='inn-description'>{inn.description}.</h2>

              <div id='hosted'>
                Hosted by {inn?.Owner?.firstName} {inn?.Owner?.lastName}
              </div>
            </div>
          </div>

          <div id='callout-container'>
            <div id='price'>${inn.price} / night</div>

            <div id='rating'>
              <AvgRating inn={inn} />
            </div>

            <button
              onClick={handleClick}
              id='reserve-button'
            >
              Reserve
            </button>
          </div>

          <Reviews
            ownerId={inn.ownerId}
            userId={userId}
          />
        </>
      ) : (
        <NotFound />
      )}
    </>
  );
}
