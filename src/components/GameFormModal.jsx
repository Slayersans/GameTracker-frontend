import { useState } from "react";
import Modal from "./Modal";
import "../styles/ModalForms.css";

function GameFormModal({ game, onClose, onSubmit, onDelete }) {
  const isEditing = Boolean(game);

  const [form, setForm] = useState({
    title: game?.title || "",
    genre: game?.genre || "",
    platform: game?.platform || "",
    developer: game?.developer || "",
    cover: game?.cover || "",
    releaseDate: game?.releaseDate || "",
    description: game?.description || "",
  });

  const handleSubmit = () => onSubmit(form);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this game?")) {
      onDelete && onDelete(game);
    }
  };

  return (
    <Modal onClose={onClose} title={isEditing ? "Edit Game" : "Add New Game"}>
      <form className="modal-form" onSubmit={(e) => e.preventDefault()}>
        <label>Title</label>
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />

        <label>Genre</label>
        <input value={form.genre} onChange={(e) => setForm({ ...form, genre: e.target.value })} />

        <label>Platform</label>
        <input value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value })} />

        <label>Developer</label>
        <input value={form.developer} onChange={(e) => setForm({ ...form, developer: e.target.value })} />

        <label>Cover Image URL</label>
        <input value={form.cover} onChange={(e) => setForm({ ...form, cover: e.target.value })} />

        <label>Release Year</label>
        <input value={form.releaseDate} onChange={(e) => setForm({ ...form, releaseDate: e.target.value })} />

        <label>Description</label>
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />

        <div className="modal-buttons">
          {isEditing && <button type="button" className="delete" onClick={handleDelete}>🗑 Delete</button>}
          <button type="button" onClick={handleSubmit}>
            {isEditing ? "Save Changes" : "Create Game"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default GameFormModal;
