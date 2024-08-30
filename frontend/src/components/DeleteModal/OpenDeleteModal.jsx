import { useModal } from "../../context/Modal";

export default function OpenDeleteModal({
  modalComponent,
  itemText,
  onModalClose,
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = e => {
    e.preventDefault()
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
  };

  return (
    <button className='delete' onClick={onClick}>
      {itemText}
    </button>
  );
}
