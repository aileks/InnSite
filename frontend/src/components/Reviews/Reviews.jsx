import './Reviews.css';
import timestamp from '../../utils/timestamp';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllReviews, selectReviewsArray } from '../../store/reviews';
import { useParams } from 'react-router-dom';
import StarRating from './StarRating';
import { SlMagicWand } from 'react-icons/sl';

export default function Reviews({ userId, inn }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const reviews = useSelector(selectReviewsArray).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );
  const { ownerId } = inn || null;

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  useEffect(() => {
    dispatch(getAllReviews(id));
  }, [id, dispatch]);

  return (
    <div id='reviews-container'>
      <h2 id='reviews-header'>
        Reviews {' • '} {inn?.avgStarRating.toFixed(2)} <SlMagicWand style={{ color: '#6a0dad' }} />
      </h2>
      {reviews.length ? (
        reviews?.map(review => (
          <div key={review.id}>
            <h3 className='review-title'>
              {review.User.firstName}
              {' • '}{' '}
              <span className='date'>
                posted {months[new Date(review.createdAt).getMonth()]}{' '}
                {new Date(review.createdAt).getFullYear()}
              </span>
              <span className='time-ago'> ({timestamp(review.createdAt)})</span>
            </h3>

            <StarRating rating={review.stars} />

            <p className='review-body'>{review.review}</p>
          </div>
        ))
      ) : userId !== ownerId ? (
        <p>Be the first to post review!</p>
      ) : (
        ''
      )}
    </div>
  );
}
