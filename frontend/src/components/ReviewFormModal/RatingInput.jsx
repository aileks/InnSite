import { useState, useEffect } from 'react';
import { SlMagicWand } from 'react-icons/sl';

export default function RatingInput({ rating, onChange }) {
  const [activeRating, setActiveRating] = useState(rating);

  const handleMouseEnter = idx => {
    setActiveRating(idx);
  };

  const handleMouseLeave = () => {
    setActiveRating(rating);
  };

  useEffect(() => {
    setActiveRating(rating);
  }, [rating]);

  const handleClick = idx => {
    onChange(idx);
  };

  return (
    <div id='wand-input'>
      {[1, 2, 3, 4, 5].map(idx => (
        <div
          key={idx}
          onClick={() => handleClick(idx)}
          className={activeRating >= idx ? 'filled' : 'empty'}
          onMouseEnter={() => handleMouseEnter(idx)}
          onMouseLeave={handleMouseLeave}
        >
          <SlMagicWand style={{ fontSize: '2rem', cursor: 'pointer' }} />
        </div>
      ))}
    </div>
  );
}
