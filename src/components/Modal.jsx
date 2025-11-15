import "../styles/Modal.css";

function Modal({ children, onClose, title }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>
        {title && <h3>{title}</h3>}
        {children}
      </div>
    </div>
  );
}

export default Modal;
