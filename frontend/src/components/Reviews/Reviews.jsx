import './Reviews.css';
import timestamp from '../../utils/timestamp';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllReviews, selectReviewsArray } from '../../store/reviews';
import { useParams } from 'react-router-dom';
import StarRating from './StarRating';
import ReviewFormModal from '../ReviewFormModal';
import { SlMagicWand } from 'react-icons/sl';
import OpenReviewModal from '../ReviewFormModal/OpenReviewModal';

export default function Reviews({ userId, inn }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const reviews = useSelector(selectReviewsArray).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );
  const { ownerId } = inn || null;

  const hasReview = reviews.some(review => review.userId === userId);

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
        {reviews?.length ? (
          <>
            {inn?.avgStarRating?.toFixed(2)}{' '}
            <SlMagicWand style={{ color: '#6a0dad' }} />
            {' • '}
            Reviews
          </>
        ) : (
          <>
            <SlMagicWand style={{ color: '#6a0dad' }} /> *New*
          </>
        )}
      </h2>

      {userId && !hasReview && (
        <OpenReviewModal
          modalComponent={<ReviewFormModal id={id} />}
          itemText='Post Your Review!'
        />
      )}

      {reviews?.length ? (
        reviews?.map(review => (
          <div
            className='review-card'
            key={review.id}
          >
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
        <div className='add-review'>
          <p>Be the first to post review!</p>

          <OpenReviewModal
            modalComponent={<ReviewFormModal />}
            itemText='Post Your Review!'
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
