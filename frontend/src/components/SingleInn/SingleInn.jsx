import './SingleInn.css';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectInnById, getInnById } from '../../store/innsSlice';
import { useEffect } from 'react';
import NotFound from '../404';
import Reviews from '../Reviews';
import { SlMagicWand } from 'react-icons/sl';
// import AvgRating from '../Reviews/AvgRating';

export default function SingleInn() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const inn = useSelector(selectInnById(id));

  // Get non-preview images
  const images = inn?.SpotImages?.filter(image => image.preview === false);

  // Get user ID for comparison in Reviews component
  const user = useSelector(state => state.session.user) || null;
  // Have to null check because of how state is
  const userId = user ? user.id : null;

  const handleClick = e => {
    e.preventDefault();

    alert('Feature coming soon!');
  };

  useEffect(() => {
    dispatch(getInnById(id));
  }, [id, dispatch]);

  return (
    <div id='view-container'>
      {inn ? (
        <div className='content-container'>
          <div id='inn-container'>
            <div id='inn-header'>
              <h1 id='inn-title'>{inn.name}</h1>

              <div id='inn-location'>
                <h3 id='inn-country'>{inn.country}</h3>
                {inn.city}, {inn.state}
              </div>
            </div>

            <div id='images'>
              <div
                className='preview'
                id='preview-container'
              >
                <img
                  className='preview'
                  id='preview-image'
                  src={inn.previewImage}
                  alt={inn.name}
                  title={inn.name}
                />
              </div>

              <div id='image-grid'>
                {images?.map(image => (
                  <img
                    key={image.id}
                    className='inn-image'
                    src={`${image.url}`}
                    alt=''
                  />
                ))}
              </div>
            </div>

            <div id='info-container'>
              <div id='text-container'>
                <h3 id='hosted'>
                  Hosted by {inn?.Owner?.firstName} {inn?.Owner?.lastName}
                </h3>

                <div id='inn-description'>{inn.description}.</div>
              </div>

              <div id='callout-container'>
                <div id='price'>{inn.price} Gold / Night</div>

                <div id='rating'>
                  <div id='avg-rating'>
                    {inn?.avgStarRating && <>Rating: {inn?.avgStarRating.toFixed(2)}</>}

                    <SlMagicWand style={{ color: '#6a0dad' }} />

                    {inn?.numReviews ? (
                      <>
                        {inn?.numReviews === 1
                          ? `• ${inn?.numReviews} Review`
                          : `• ${inn?.numReviews} Reviews`}{' '}
                      </>
                    ) : (
                      '*New*'
                    )}
                  </div>
                </div>

                <button
                  onClick={handleClick}
                  id='reserve-button'
                >
                  Reserve
                </button>
              </div>
            </div>
          </div>

          <hr />

          <Reviews
            userId={userId}
            inn={inn}
          />
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
}
