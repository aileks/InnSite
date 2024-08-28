import './DeleteModal.css';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { IoIosCloseCircle } from 'react-icons/io';
import { deleteInn } from '../../store/inns';
import { useState } from 'react';

export default function DeleteModal({ id }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [message, setMessage] = useState('');

  const destroy = async e => {
    e.preventDefault();

    const res = await dispatch(deleteInn(id));

    if (res.message) {
      setMessage(res.message);
    }

    closeModal();
  };

  console.log(message);

  return (
    <>
      <span
        onClick={closeModal}
        id='close-button'
      >
        <IoIosCloseCircle />
      </span>

      <div id='confirm-container'>
        <div id='confirm-header'>
          <h1>Are you sure?</h1>

          <h3>Think of all the gold!</h3>
        </div>

        <div id='button-container'>
          <button
            id='yes'
            className='confirm-button'
            onClick={destroy}
          >
            Yes (Into the nether realm...)
          </button>

          <button
            id='no'
            className='confirm-button'
            onClick={closeModal}
          >
            No (How merciful you are!)
          </button>
        </div>
      </div>
    </>
  );
}
