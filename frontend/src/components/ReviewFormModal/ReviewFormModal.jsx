import './ReviewFormModal.css';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { IoIosCloseCircle } from 'react-icons/io';
import { addReview } from '../../store/reviewsSlice';
import RatingInput from './RatingInput';

export default function ReviewFormModal({ innId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (review.length >= 10 && rating >= 1) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [review, rating]);

  const handleSubmit = async e => {
    e.preventDefault();

    setErrors({});

    const newReview = {
      review,
      stars: rating,
    };

    try {
      return dispatch(addReview(innId, newReview)).then(closeModal);
    } catch (res) {
      if (res.json) {
        const data = await res.json();

        if (data && data.message) {
          setErrors(data);
        }
      } else {
        console.error(res);
        setErrors({ message: 'An unexpected error occurred.' });
      }
    }
  };

  const onChange = newRating => {
    setRating(newRating);
  };

  return (
    <>
      <span
        onClick={closeModal}
        id='close-button'
      >
        <IoIosCloseCircle />
      </span>

      <div id='review-container'>
        <h1 id='review-header'>How was your stay?</h1>

        {errors.message && <p className='error'>{errors.message}</p>}
        <br />

        <form
          id='review-form'
          onSubmit={handleSubmit}
        >
          <label id='review-label'>
            <textarea
              id='review-textarea'
              type='text'
              value={review}
              placeholder='Leave your review here...'
              onChange={e => setReview(e.target.value)}
            />
          </label>

          <RatingInput
            rating={rating}
            onChange={onChange}
          />

          <div className='button-container'>
            <button
              id='post-button'
              type='submit'
              disabled={disabled}
            >
              <span id='post-text'>Submit Your Review</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
