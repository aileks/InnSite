import './Inns.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllInns, selectInnsArray } from '../../store/inns';
import InnCard from './InnCard';
import { Link } from 'react-router-dom';

export default function Inns() {
  const dispatch = useDispatch();
  const inns = useSelector(selectInnsArray);

  useEffect(() => {
    dispatch(getAllInns());
  }, [dispatch]);

  return (
    <>
      <h3 id='landing-header'>Every adventurer needs their rest.</h3>

      <div className='inns-grid'>
        {inns?.map(inn => (
          <Link to={`/inns/${inn.id}`} key={inn.id}>
            <InnCard inn={inn} />
          </Link>
        ))}
      </div>
    </>
  );
}
