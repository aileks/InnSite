import './Profile.css';
import { selectInnsArray, getUserInns } from '../../store/inns';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import InnCard from '../Inns/InnCard';

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.session.user);
  const allInns = useSelector(selectInnsArray);
  const userInns = allInns?.filter(inn => inn.ownerId === user?.id);

  useEffect(() => {
    dispatch(getUserInns());
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className='content-container'>
      {userInns.length ? (
        <>
          <h1 id='profile-header'>Manage Inns</h1>
          <div className='inns-grid'>
            {userInns.map(inn => (
              <Link
                to={`/inns/${inn.id}`}
                key={inn.id}
              >
                <InnCard
                  key={inn.id}
                  inn={inn}
                />
              </Link>
            ))}
          </div>
        </>
      ) : (
        <div id='profile-container'>
          <h2>You don&apos;t have any inns yet!</h2>

          <Link
            className='create-inn-button'
            id='profile-create-inn'
            to='/inns/new'
          >
            Create a New Inn
          </Link>
        </div>
      )}
    </div>
  );
}
