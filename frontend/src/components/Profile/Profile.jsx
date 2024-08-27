import './Profile.css';
import { selectInnsArray, getUserInns } from '../../store/inns';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { InnCard } from '../Inns/InnCard';

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.session.user);
  const allInns = useSelector(selectInnsArray);
  const userInns = allInns?.filter(inn => inn.ownerId === user?.id);

  useEffect(() => {
    dispatch(getUserInns());
  }, [dispatch]);

  if (!user) {
    navigate('/');
  }

  return (
    <div className='content-container'>
      {userInns.length ? (
        userInns.map(inn => <InnCard inn={inn} />)
      ) : (
        <div id='profile-container'>
          <h2>You don't have any inns yet!</h2>

          <button
            className='create-inn-button'
            id='profile-create-inn'
          >
            <Link to='/inns/new'>Create a New Inn</Link>
          </button>
        </div>
      )}
    </div>
  );
}
