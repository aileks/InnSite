import { SlMagicWand } from "react-icons/sl";

export default function AvgRating({ inn }) {
  const { avgStarRating, numReviews } = inn || null;

  return (
    <div id="avg-rating">
      {avgStarRating && <>Rating: {avgStarRating.toFixed(2)}</>}

      <SlMagicWand style={{ color: "#6a0dad" }} />

      {numReviews ? (
        <>
          {numReviews === 1
            ? `• ${numReviews} Review`
            : `• ${numReviews} Reviews`}{" "}
        </>
      ) : (
        "*New*"
      )}
    </div>
  );
}
