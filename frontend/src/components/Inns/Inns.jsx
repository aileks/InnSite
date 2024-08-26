import './Inns.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getAllInns, selectInnsArray } from '../../store/inns';
import { SlMagicWand } from 'react-icons/sl';

export default function Inns() {
  const dispatch = useDispatch();
  const inns = useSelector(selectInnsArray);

  useEffect(() => {
    dispatch(getAllInns());
  }, [dispatch]);

  return (
    <ul>
      {inns?.map(inn => (
        <li key={inn.id}>
          <Link to={`inns/${inn.id}`}>
            <img
              className='landing-preview'
              src={inn.previewImage}
              alt=''
            />
          </Link>

          <div className='inn-info'>
            <Link to={`inns/${inn.id}`}>{inn.name}</Link>
            {' • '}
            {inn.city}, {inn.state}
            {' • '}
            {inn.avgRating ? inn.avgRating.toFixed(2) : '*New*'} <SlMagicWand style={{ color: '#6a0dad', fontSize: '0.9em' }} />
            {' • '}
            ${inn.price}/night
          </div>
        </li>
      ))}
    </ul>
  );
}
