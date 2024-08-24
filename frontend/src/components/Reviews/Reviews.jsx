import './Reviews.css';
import timestamp from '../../utils/timestamp';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllReviews, selectReviewsArray } from '../../store/reviews';
import { useParams } from 'react-router-dom';
import StarRating from './StarRating';

export default function Reviews() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const reviews = useSelector(selectReviewsArray);


  useEffect(() => {
    dispatch(getAllReviews(id));
  }, [id, dispatch]);

  return (
    <>
      {reviews?.map(review => (
        <div
          id='reviews-container'
          key={review.id}
        >
          <h3 className='review-heading'>
            {review.User.firstName} {review.User.lastName}
            <span className='timestamp'> {timestamp(review.createdAt)}</span>
          </h3>

          <StarRating rating={review.stars} />

          <p className='review-body'>{review.review}</p>
        </div>
      ))}
    </>
  );
}
