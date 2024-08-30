import { Link } from 'react-router-dom';
import { SlMagicWand } from 'react-icons/sl';
import DeleteModal from '../DeleteModal';
import OpenDeleteModal from '../DeleteModal/OpenDeleteModal';

export default function InnCard({ inn }) {
  const isInProfile = window.location.href.includes('/profile');

  return (
    <>
      {inn && (
        <div id='tooltip-container'>
          <div id='tooltip-text'>{inn.name}</div>

          <div className='inn-card'>
            <div className='inn-image-container'>
              <img
                className='inn-card-image'
                src={inn.previewImage}
                alt={inn.name}
              />
            </div>

            <div className='inn-card-rating'>
              {inn.avgRating ? inn.avgRating.toFixed(2) : ' *New* '}

              <SlMagicWand style={{ color: '#6a0dad', fontSize: '0.9em' }} />
            </div>

            <div className='inn-card-info'>
              <div className='inn-card-location'>
                {inn.city}, {inn.state}
              </div>

              <div className='inn-card-price'>{inn.price} Gold / Night</div>
            </div>

            {isInProfile && (
              <div className='modify-buttons'>
                <Link
                  to={`/inns/${inn.id}/edit`}
                  className='edit'
                >
                  Update
                </Link>
                {' • '}
                <OpenDeleteModal
                  itemText={'Delete'}
                  modalComponent={<DeleteModal inn={inn} />}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
