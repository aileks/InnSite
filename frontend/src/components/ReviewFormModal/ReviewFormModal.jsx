import './ReviewFormModal.css';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { IoIosCloseCircle } from 'react-icons/io';
import { addReview } from '../../store/reviews';
import RatingInput from './RatingInput';

export default function ReviewFormModal({ id }) {
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

  const handleSubmit = e => {
    e.preventDefault();

    setErrors({});

    const newReview = {
      review,
      stars: rating,
    };

    return dispatch(addReview(id, newReview))
      .then(closeModal)
      .catch(async res => {
        const data = await res.json();

        if (data && data.message) {
          setErrors(data);
        }
      });
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

          {errors.message && <p className='error'>You already have a review for this spot!</p>}

          <div className='button-container'>
            <button
              id='post-button'
              type='submit'
              disabled={disabled}
            >
              <span id='post-text'>Post</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
