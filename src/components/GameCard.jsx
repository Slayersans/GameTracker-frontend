import "../styles/Card.css";

function GameCard({ game, isOwned, onEdit, onDetails, onButton }) {
  return (
    <div className="card" style={{ position: "relative" }}>
      {isOwned && (
        <button className="card-edit-btn" onClick={onEdit}>
          ✏️ Edit
        </button>
      )}

      <h3>{game.title}</h3>
      <p><strong>Genre:</strong> {game.genre}</p>
      <p><strong>Platform:</strong> {game.platform}</p>

      {game.cover && (
        <img src={game.cover} alt={game.title} />
      )}

      <div className="card-buttons">
        {onDetails && (
          <button className="card-button" onClick={onDetails}>
            View Details
          </button>
        )}
        {onButton && (
          <button className="card-button" onClick={onButton.onClick}>
            {onButton.title}
          </button>
        )}
      </div>
    </div>
  );
}

export default GameCard;
