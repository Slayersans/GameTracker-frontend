import { useState } from "react";
import Modal from "./Modal";
import "../styles/ModalForms.css";

function ProgressFormModal({ entry, onClose, onSubmit, isView }) {
  const [form, setForm] = useState({
    timeplayed: entry.timeplayed,
    state: entry.state,
    favorite: entry.favorite,
  });

  const handleChange = (field, value) => {
    if (isView) return;
    setForm({ ...form, [field]: value });
  };

  return (
    <Modal onClose={onClose} title={isView ? "View Progress" : "Edit Progress"}>
      <form className="modal-form" onSubmit={(e) => e.preventDefault()}>
        <label>Hours Played</label>
        <input
          type="number"
          value={form.timeplayed}
          disabled={isView}
          onChange={(e) => handleChange("timeplayed", e.target.value)}
        />

        <label>State</label>
        <select
          value={form.state}
          disabled={isView}
          onChange={(e) => handleChange("state", e.target.value)}
        >
          <option>Playing</option>
          <option>Completed</option>
          <option>Plan to Play</option>
        </select>

        <label>
          <input
            type="checkbox"
            checked={form.favorite}
            disabled={isView}
            onChange={(e) => handleChange("favorite", e.target.checked)}
          />
          Favorite
        </label>

        {!isView && (
          <div className="modal-buttons">
            <button type="button" onClick={() => onSubmit(form)}>Save Changes</button>
          </div>
        )}
      </form>
    </Modal>
  );
}

export default ProgressFormModal;
