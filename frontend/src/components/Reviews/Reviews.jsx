import './Reviews.css';
import timestamp from '../../utils/timestamp';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllReviews, selectReviewsArray } from '../../store/reviewsSlice';
import { useParams } from 'react-router-dom';
import StarRating from './StarRating';
import ReviewFormModal from '../ReviewFormModal';
import { SlMagicWand } from 'react-icons/sl';
import OpenReviewModal from '../ReviewFormModal/OpenReviewModal';
import OpenDeleteModal from '../DeleteModal/OpenDeleteModal';
import DeleteModal from '../DeleteModal';

export default function Reviews({ userId, inn }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const reviews = useSelector(selectReviewsArray).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );
  const ownerId = inn?.ownerId;
  const userHasReview = reviews.some(review => review.userId === userId);

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
            {inn?.avgStarRating?.toFixed(2)} <SlMagicWand style={{ color: '#6a0dad' }} />
            {inn?.numReviews === 1
              ? `• ${inn?.numReviews} Review`
              : `• ${inn?.numReviews} Reviews`}{' '}
          </>
        ) : (
          <>
            <SlMagicWand style={{ color: '#6a0dad' }} /> *New*
          </>
        )}
      </h2>

      {reviews?.length ? (
        <>
          {userId && !userHasReview && ownerId !== userId ? (
            <OpenReviewModal
              modalComponent={<ReviewFormModal innId={id} />}
              itemText='Post Your Review!'
            />
          ) : (
            ''
          )}

          {reviews?.map(review => (
            <div
              className='review-card'
              key={review?.id}
            >
              <h3 className='review-title'>
                {review?.User?.firstName}
                {' • '}{' '}
                <span className='date'>
                  {months[new Date(review?.createdAt).getMonth()]}{' '}
                  {new Date(review?.createdAt).getFullYear()}
                </span>
                <span className='time-ago'> ({timestamp(review?.createdAt)})</span>
              </h3>

              <StarRating rating={review?.stars} />

              <p className='review-body'>{review?.review}</p>

              {review?.userId === userId && (
                <div className='modal-container'>
                  <OpenDeleteModal
                    itemText='Delete'
                    modalComponent={
                      <DeleteModal
                        inn={inn}
                        review={review}
                      />
                    }
                  />
                </div>
              )}
            </div>
          ))}
        </>
      ) : userId && userId !== ownerId ? (
        <div className='add-review'>
          <p>Be the first to post a review!</p>

          <OpenReviewModal
            modalComponent={<ReviewFormModal innId={id} />}
            itemText='Post Your Review!'
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
