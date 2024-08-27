import './Inns.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getAllInns, selectInnsArray } from '../../store/inns';
import { SlMagicWand } from 'react-icons/sl';

export default function Inns() {
  const dispatch = useDispatch();
  const inns = useSelector(selectInnsArray);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllInns()).then(() => setIsLoading(false));
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div id='inns-grid'>
      {inns?.map(inn => (
        <Link key={inn.id} to={`inns/${inn.id}`}>
          <div
            className='inn-card'
          >
            <div className='inn-image-container'>
              <img
                className='inn-card-image'
                src={inn.previewImage}
                alt={inn.name}
              />
            </div>

            <div className='inn-card-info'>
              <div className='inn-card-location'>
                {inn.city}, {inn.state}
              </div>

              <div className='inn-card-rating'>
                {inn.avgRating ? inn.avgRating.toFixed(2) : '*New*'}{' '}
                <SlMagicWand style={{ color: '#6a0dad', fontSize: '0.9em' }} />
              </div>

              <div className='inn-card-price'>${inn.price} night</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
