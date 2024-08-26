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
  const reviews = useSelector(selectReviewsArray).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  console.log();

  useEffect(() => {
    dispatch(getAllReviews(id));
  }, [id, dispatch]);

  return (
    <div id='reviews-container'>
      {reviews?.map(review => (
        <div key={review.id}>
          <h3 className='review-heading'>
            {review.User.firstName} {review.User.lastName}
            <span className='timestamp'> {timestamp(review.createdAt)}</span>
          </h3>

          <StarRating rating={review.stars} />

          <p className='review-body'>{review.review}</p>
        </div>
      ))}
    </div>
  );
}
