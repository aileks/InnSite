import './Inns.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getAllInns } from '../../store/inns';

export default function Inns() {
  const dispatch = useDispatch();
  const inns = useSelector(state => state.inns);
  const innsArr = Object.values(inns);

  useEffect(() => {
    dispatch(getAllInns());
  }, [dispatch]);

  return (
    <ul>
      {innsArr.map(inn => (
        <li key={inn.id}>
          <Link to={`inns/${inn.id}`}>{inn.name}</Link>
        </li>
      ))}
    </ul>
  );
}
