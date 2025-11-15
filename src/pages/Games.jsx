import { useEffect, useState, useContext } from "react";
import { apiFetch } from "../api";
import GameCard from "../components/GameCard";
import { AuthContext } from "../context/AuthContext";
import GameFormModal from "../components/GameFormModal";
import { useNavigate } from "react-router-dom";
import "../styles/Pages.css";

function Games() {
  const { user } = useContext(AuthContext);
  const [games, setGames] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [editingGame, setEditingGame] = useState(null);
  const navigate = useNavigate();

  const refresh = () => apiFetch("games").then(setGames);

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="page-container">
      <h2>🎮 Game Store</h2>
      <button className="button" onClick={() => setShowAdd(true)}>➕ Add New Game</button>

      {games.length === 0 ? (
        <p className="empty-state">No games available.</p>
      ) : (
        games.map((game) => {
          const isOwned = game.userId === user.id;
          return (
            <GameCard
              key={game._id}
              game={game}
              isOwned={isOwned}
              onEdit={() => setEditingGame(game)}
              onDetails={() => navigate(`/games/${game.title}`)}
            />
          );
        })
      )}

      {showAdd && (
        <GameFormModal
          onClose={() => setShowAdd(false)}
          onSubmit={async (form) => {
            await apiFetch("games", { method: "POST", body: JSON.stringify(form) });
            setShowAdd(false);
            refresh();
          }}
        />
      )}

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
    </div>
  );
}

export default Games;
