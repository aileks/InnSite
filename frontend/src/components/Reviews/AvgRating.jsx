import { SlMagicWand } from 'react-icons/sl';

export default function AvgRating({ inn }) {
  const { avgStarRating, numReviews } = inn || null;

  return (
    <div id='avg-rating'>
      {avgStarRating && <span>Rating: {avgStarRating.toFixed(2)}</span>}

      {numReviews ? (
        <span>
          {numReviews === 1 ? `• ${numReviews} Review` : `• ${numReviews} Reviews`}
          <SlMagicWand style={{ color: '#6a0dad', fontSize: '0.9em' }} />
        </span>
      ): '*New*' }

    </div>
  );
}
