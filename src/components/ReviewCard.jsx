import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/Card.css";

function ReviewCard({ review, onEdit }) {
  const { user } = useContext(AuthContext);
  const mine = review.userId?._id === user.id;

  return (
    <div className="card" style={{ position: "relative" }}>
      {mine && (
        <button className="card-edit-btn" onClick={onEdit}>
          ✏️ Edit
        </button>
      )}

      <p><strong>{review.userId?.name || "Unknown User"}</strong></p>
      <p><strong>⭐ {review.rating}</strong></p>
      <p>{review.comment}</p>
      <p><em>Time Played:</em> {review.timeplayed ? `${review.timeplayed}h` : "0h"}</p>
      <p><em>Recommended:</em> {review.recommended ? "👍 Yes" : "👎 No"}</p>
      <p><em>Difficulty:</em> {review.difficulty || "Not specified"}</p>
    </div>
  );
}

export default ReviewCard;
