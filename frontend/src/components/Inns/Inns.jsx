import './Inns.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getAllInns, selectInnsArray } from '../../store/inns';

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
          <Link to={`inns/${inn.id}`}>{inn.name}</Link>
        </li>
      ))}
    </ul>
  );
}
