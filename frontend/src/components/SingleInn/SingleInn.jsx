import "./SingleInn.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { selectInnById, getInnById } from "../../store/inns";
import { useEffect } from "react";
import NotFound from "../404";
import Reviews from "../Reviews";
import AvgRating from "../Reviews/AvgRating";

export default function SingleInn() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const inn = useSelector(selectInnById(id));

  // Get non-preview images
  const images = inn?.SpotImages?.filter((image) => image.preview === false);

  // Get user ID for comparison in Reviews component
  const user = useSelector((state) => state.session.user) || null;
  // Have to null check because of how state is
  const userId = user ? user.id : null;

  const handleClick = (e) => {
    e.preventDefault();

    alert("Feature coming soon!");
  };

  useEffect(() => {
    dispatch(getInnById(id));
  }, [id, dispatch]);

  return (
    <>
      {inn ? (
        <div className="content-container">
          <div id="inn-container">
            <div id="inn-header">
              <h1 id="inn-title">{inn.name}</h1>

              <div id="inn-location">
                <h3 id="inn-country">{inn.country}</h3>
                {inn.city}, {inn.state}
              </div>
            </div>

            <span id="images">
              <div className="preview" id="preview-container">
                <img
                  className="preview"
                  id="preview-image"
                  src={inn.previewImage}
                  alt={inn.name}
                  title={inn.name}
                />
              </div>

              <div id="image-grid">
                {images?.map((image) => (
                  <img
                    key={image.id}
                    className="inn-image"
                    src={`${image.url}`}
                    alt=""
                  />
                ))}
              </div>
            </span>

            <div id="info-container">
              <div id="text-container">
                <h3 id="hosted">
                  Hosted by {inn?.Owner?.firstName} {inn?.Owner?.lastName}
                </h3>

                <p id="inn-description">{inn.description}.</p>
              </div>

              <div id="callout-container">
                <div id="price">{inn.price} Gold / Night</div>

                <div id="rating">
                  <AvgRating inn={inn} />
                </div>

                <button onClick={handleClick} id="reserve-button">
                  Reserve
                </button>
              </div>
            </div>
          </div>

          <hr />

          <Reviews userId={userId} inn={inn} />
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
}
