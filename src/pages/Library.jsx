import { useEffect, useState } from "react";
import { apiFetch } from "../api";
import GameCard from "../components/GameCard";
import ProgressFormModal from "../components/ProgressFormModal";
import { useNavigate } from "react-router-dom";
import "../styles/Pages.css";

function Library() {
  const [library, setLibrary] = useState([]);
  const [editing, setEditing] = useState(null);
  const [details, setDetails] = useState(null);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const refresh = () => apiFetch("library").then(setLibrary);

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="page-container">
      <h2>📚 My Library</h2>

      {library.length === 0 ? (
        <p className="empty-state">Your library is empty.</p>
      ) : (
        library.map((entry) => (
          <GameCard
            key={entry._id}
            game={entry.gameId}
            isOwned={true}
            onEdit={() => {
              setEditing(entry);
              setForm(entry);
            }}
            onDetails={() => navigate(`/games/${entry.gameId.title}`)}
            onButton={{ title: "View Progress", onClick: () => setDetails(entry) }}
          />
        ))
      )}

      {details && (
        <ProgressFormModal
          entry={details}
          isView={true}
          onClose={() => setDetails(null)}
          onSubmit={async (form) => {
            await apiFetch(`library/${details.gameId._id}`, {
              method: "PUT",
              body: JSON.stringify(form),
            });
            setDetails(null);
            refresh();
          }}
        />
      )}

      {editing && (
        <ProgressFormModal
          entry={editing}
          onClose={() => setEditing(null)}
          onSubmit={async (form) => {
            await apiFetch(`library/${editing.gameId._id}`, {
              method: "PUT",
              body: JSON.stringify(form),
            });
            setEditing(null);
            refresh();
          }}
        />
      )}
    </div>
  );
}

export default Library;
