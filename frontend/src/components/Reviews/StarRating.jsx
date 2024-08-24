import { useState, useEffect } from 'react';
import { SlMagicWand } from "react-icons/sl";

export default function StarRating({ rating }) {
  const [activeRating, setActiveRating] = useState(rating);

  useEffect(() => {
    setActiveRating(rating);
  }, [rating]);

  return (
    <div id='wands'>
      {[1, 2, 3, 4, 5].map(idx => (
        <div
          key={idx}
          className={activeRating >= idx ? 'filled' : 'empty'}
        >
          <SlMagicWand />
        </div>
      ))}
    </div>
  );
}
