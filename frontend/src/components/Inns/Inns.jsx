import './Inns.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getAllInns, selectInnsArray } from '../../store/inns';
import { SlMagicWand } from 'react-icons/sl';
import InnCard from './InnCard';

export default function Inns() {
  const dispatch = useDispatch();
  const inns = useSelector(selectInnsArray);

  useEffect(() => {
    dispatch(getAllInns());
  }, [dispatch]);

  return (
    <>
      <h3 id='landing-header'>Every adventurer needs their rest.</h3>

      <div id='inns-grid'>
        {inns?.map(inn => (
          <InnCard inn={inn} />
        ))}
      </div>
    </>
  );
}
