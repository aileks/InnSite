import { useModal } from '../../context/Modal';

export default function OpenReviewModal({
  modalComponent,
  itemText,
  onItemClick,
  onModalClose,
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onItemClick === 'function') onItemClick();
  };

  return (
    <button id='review-button'
      onClick={onClick}
    >
      {itemText}
    </button>
  );
}
