import { useContext, useEffect, useState } from "react";
import Modal from "./Modal";
import { AuthContext } from "../context/AuthContext";
import "../styles/ModalForms.css";

function ReviewFormModal({ game, libraryEntry, review, onClose, onSubmit, onDelete }) {
  const { user } = useContext(AuthContext);
  const isEditing = Boolean(review);

  const [form, setForm] = useState({
    rating: review?.rating || 5,
    comment: review?.comment || "",
    recommended: review?.recommended ?? true,
    difficulty: review?.difficulty || "Medium",
    timeplayed: libraryEntry?.timeplayed || review?.timeplayed || 0,
  });

  useEffect(() => {
    if (libraryEntry && !isEditing) {
      setForm((f) => ({ ...f, timeplayed: libraryEntry.timeplayed }));
    }
  }, [libraryEntry, isEditing]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      onDelete && onDelete(review);
    }
  };

  return (
    <Modal onClose={onClose} title={isEditing ? "Edit Review" : "Add Review"}>
      <form className="modal-form" onSubmit={(e) => e.preventDefault()}>
        <h3>{isEditing ? `Editing ${game.title}` : `New Review for ${game.title}`}</h3>

        <label>Rating</label>
        <input
          type="number"
          min="1"
          max="5"
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
        />

        <label>Comment</label>
        <textarea
          value={form.comment}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
        />

        <label>Recommended</label>
        <select
          value={form.recommended}
          onChange={(e) => setForm({ ...form, recommended: e.target.value === "true" })}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <label>Difficulty</label>
        <select
          value={form.difficulty}
          onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <label>Time Played (auto-sync from Library)</label>
        <input
          type="number"
          value={form.timeplayed}
          onChange={(e) => setForm({ ...form, timeplayed: Number(e.target.value) })}
        />

        <div className="modal-buttons">
          {isEditing && (
            <button type="button" className="delete" onClick={handleDelete}>
              🗑 Delete
            </button>
          )}
          <button type="button" onClick={() => onSubmit(form)}>
            {isEditing ? "Save Changes" : "Submit Review"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default ReviewFormModal;
