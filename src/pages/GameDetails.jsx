import { useEffect, useState, useContext } from "react";
import { apiFetch } from "../api";
import { useParams } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";
import ReviewFormModal from "../components/ReviewFormModal";
import { AuthContext } from "../context/AuthContext";
import "../styles/Pages.css";

function GameDetails() {
  const { user } = useContext(AuthContext);
  const { title } = useParams();
  const [game, setGame] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [libraryEntry, setLibraryEntry] = useState(null);
  const [editingReview, setEditingReview] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const refresh = async () => {
    const dataGame = await apiFetch(`games/title/${title}`);
    setGame(dataGame);

    const dataReviews = await apiFetch(`reviews/title/${title}`);
    setReviews(dataReviews.reviews || []);

    const dataLibs = await apiFetch(`library/title/${title}`);
    if (dataLibs && !dataLibs.message) setLibraryEntry(dataLibs);
  };

  useEffect(() => {
    refresh();
  }, [title]);

  const handleToggleLibrary = async () => {
    if (!game) return;

    if (libraryEntry) {
      const confirmRemove = window.confirm("Are you sure you want to remove this game from your library?");
      if (!confirmRemove) return;
      await apiFetch(`library/${libraryEntry._id}`, { method: "DELETE" });
      setLibraryEntry(null);
    } else {
      await apiFetch(`library`, {
        method: "POST",
        body: JSON.stringify({ gameId: game._id }),
      });
      setLibraryEntry(game);
    }
  };

  if (!game) return <div className="page-container">Loading...</div>;

  return (
    <div className="page-container">
      <div className="game-details">
        <h2>{game.title}</h2>
        <p><strong>Genre:</strong> {game.genre}</p>
        <p><strong>Platform:</strong> {game.platform}</p>
        <p><strong>Developer:</strong> {game.developer}</p>
        {game.cover && <img src={game.cover} alt={game.title} />}
        <p>{game.description}</p>
        <button onClick={handleToggleLibrary}>
          {libraryEntry ? "In Library" : "Add to Library"}
        </button>
      </div>

      <div className="reviews-section">
        <h2>⭐ Reviews of {game.title}</h2>
        <button className="button" onClick={() => setShowForm(true)}>➕ Add Review</button>

        {reviews.length === 0 ? (
          <p className="empty-state">No reviews yet.</p>
        ) : (
          reviews.map((r) => (
            <ReviewCard key={r._id} review={r} onEdit={() => setEditingReview(r)} />
          ))
        )}
      </div>

      {showForm && (
        <ReviewFormModal
          game={game}
          libraryEntry={libraryEntry}
          onClose={() => setShowForm(false)}
          onSubmit={async (form) => {
            await apiFetch("reviews", {
              method: "POST",
              body: JSON.stringify({ ...form, gameId: game._id }),
            });
            setShowForm(false);
            refresh();
          }}
        />
      )}

      {editingReview && (
        <ReviewFormModal
          game={game}
          libraryEntry={libraryEntry}
          review={editingReview}
          onClose={() => setEditingReview(null)}
          onSubmit={async (form) => {
            await apiFetch(`reviews/${editingReview._id}`, {
              method: "PUT",
              body: JSON.stringify(form),
            });
            setEditingReview(null);
            refresh();
          }}
          onDelete={async () => {
            await apiFetch(`reviews/${editingReview._id}`, { method: "DELETE" });
            setEditingReview(null);
            refresh();
          }}
        />
      )}
    </div>
  );
}

export default GameDetails;
