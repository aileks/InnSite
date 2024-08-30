import "./DeleteModal.css";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { IoIosCloseCircle } from "react-icons/io";
import { deleteInn } from "../../store/inns";
import { deleteReview } from "../../store/reviews";
import { useToast } from "../../context/Toast";

export default function DeleteModal({ inn, review }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const { showToast } = useToast();

  const destroy = async (e) => {
    e.preventDefault();

    let res = "";

    if (inn?.id) {
      if (review?.id) {
        res = await dispatch(deleteReview(review.id, inn.id));
      } else {
        res = await dispatch(deleteInn(inn.id));
      }
    }

    if (res.message) {
      showToast(res.message);
    }

    closeModal();
  };

  return (
    <>
      <span onClick={closeModal} id="close-button">
        <IoIosCloseCircle />
      </span>

      <div id="confirm-container">
        <div id="confirm-header">
          <h1>Are you sure?</h1>

          <h3>
            {inn?.id
              ? "Think of all the gold!"
              : "The people need your thoughts!"}
          </h3>
        </div>

        <div id="button-container">
          <button id="yes" className="confirm-button" onClick={destroy}>
            Into the nether realm... (Delete)
          </button>

          <button id="no" className="confirm-button" onClick={closeModal}>
            Not today! (Keep)
          </button>
        </div>
      </div>
    </>
  );
}
