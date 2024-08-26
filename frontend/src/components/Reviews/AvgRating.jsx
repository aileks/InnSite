import { SlMagicWand } from 'react-icons/sl';

export default function AvgRating({ inn }) {
  const { avgStarRating, numReviews } = inn || null;

  return (
    <div id='avg-rating'>
      {avgStarRating && <div>Rating: {avgStarRating.toFixed(2)}</div>}

      {numReviews ? (
        <div>
          {numReviews === 1 ? `• ${numReviews} Review` : `• ${numReviews} Reviews`}
          <SlMagicWand style={{ color: '#6a0dad', fontSize: '0.9em' }} />
        </div>
      ): '*New*' }

    </div>
  );
}
