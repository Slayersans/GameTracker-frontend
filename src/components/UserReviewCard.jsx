import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Card.css";

function UserReviewCard({ review, onEdit }) {
  const { user } = useContext(AuthContext);
  const mine = review.userId?._id === user.id;
  const navigate = useNavigate();

  return (
    <div className="card" style={{ position: "relative" }}>
      {mine && (
        <button className="card-edit-btn" onClick={onEdit}>
          ✏️ Edit
        </button>
      )}

      <h3
        style={{ 
          cursor: "pointer", 
          color: "#4b0082", 
          marginBottom: "0.4rem",
          textDecoration: "underline"
        }}
        onClick={() => navigate(`/games/${review.gameId.title}`)}
      >
        🎮 {review.gameId.title}
      </h3>

      <p><strong>⭐ {review.rating}</strong></p>
      <p>{review.comment}</p>
      <p><em>Time Played:</em> {review.timeplayed ? `${review.timeplayed}h` : "0h"}</p>
      <p><em>Recommended:</em> {review.recommended ? "👍 Yes" : "👎 No"}</p>
      <p><em>Difficulty:</em> {review.difficulty || "Not specified"}</p>
    </div>
  );
}

export default UserReviewCard;
