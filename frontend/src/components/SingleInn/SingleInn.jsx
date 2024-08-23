import './SingleInn.css';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { selectInnById, getInnById } from '../../store/inns';
import { useEffect } from 'react';
import NotFound from '../404';

export default function SingleInn() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const inn = useSelector(selectInnById(id));

  useEffect(() => {
    dispatch(getInnById(id));
  }, [id, dispatch]);

  return (
    <>
      {inn ?
        <div id='inn-container'>
          <Link to='/'>Go Back</Link>

          <div id='inn-content'>
            <img
              id='inn-image'
              src={`${inn.previewImage}`}
              alt={`${inn.name}`}
              title={`${inn.name}`}
            />

            <h1 id='inn-title'>{inn.name}</h1>

            <h3 id='inn-country'>{inn.country}</h3>

            <h2 id='inn-description'>{inn.description}</h2>

            <div id='inn-price'>${inn.price} per night</div>

            <div id='inn-location'>
              Located in {inn.city}, {inn.state}
              <br />
            </div>
          </div>
        </div>
      : <NotFound />}
    </>
  );
}
