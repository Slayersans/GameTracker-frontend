import { useEffect, useState, useContext } from "react";
import { apiFetch } from "../api";
import { AuthContext } from "../context/AuthContext";
import GameCard from "../components/GameCard";
import GameFormModal from "../components/GameFormModal";
import UserReviewCard from "../components/UserReviewCard";
import ReviewFormModal from "../components/ReviewFormModal";
import { useNavigate } from "react-router-dom";
import "../styles/Pages.css";

function Home() {
  const { user } = useContext(AuthContext);
  const [myGames, setMyGames] = useState([]);
  const [myReviews, setMyReviews] = useState([]);
  const [editingGame, setEditingGame] = useState(null);
  const [editingReview, setEditingReview] = useState(null);
  const [libraryEntry, setLibraryEntry] = useState(null);
  const navigate = useNavigate();

  const refresh = () => {
    apiFetch(`games/user/`).then(setMyGames);
    apiFetch(`reviews`).then(setMyReviews);
  };

  useEffect(() => {
    refresh();
  }, [user]);

  return (
    <div className="page-container">
      <h2>👤 My Dashboard</h2>

      <section>
        <h3>🎮 Games You Created</h3>
        {myGames.length === 0 ? (
          <p className="empty-state">No games created yet.</p>
        ) : (
          myGames.map((g) => (
            <GameCard
              key={g._id}
              game={g}
              isOwned={true}
              onEdit={() => setEditingGame(g)}
              onDetails={() => navigate(`/games/${g.title}`)}
            />
          ))
        )}
      </section>

      {editingGame && (
        <GameFormModal
          game={editingGame}
          onClose={() => setEditingGame(null)}
          onSubmit={async (form) => {
            await apiFetch(`games/${editingGame._id}`, {
              method: "PUT",
              body: JSON.stringify(form),
            });
            setEditingGame(null);
            refresh();
          }}
          onDelete={async () => {
            await apiFetch(`games/${editingGame._id}`, { method: "DELETE" });
            setEditingGame(null);
            refresh();
          }}
        />
      )}

      <section>
        <h3>⭐ Your Reviews</h3>
        {myReviews.length === 0 ? (
          <p className="empty-state">No reviews written yet.</p>
        ) : (
          myReviews.map((r) => (
            <UserReviewCard 
              key={r._id} 
              review={r} 
              onEdit={() => {
                setEditingReview(r);
                apiFetch(`library/title/${r.gameId.title}`).then(setLibraryEntry);
              }} 
            />)
          )
        )}
      </section>

      {editingReview && (
        <ReviewFormModal
          game={editingReview.gameId}
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

export default Home;
