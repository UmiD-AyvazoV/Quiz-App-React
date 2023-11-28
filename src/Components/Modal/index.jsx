import './Modal.css';

const Modal = ({ score }) => {
  return (
    <div className="modal">
      <div className="modal-title">Score: {score}</div>
      <div className="modal-btn" onClick={() => (window.location = "/")}>
        Try Again
      </div>
    </div>
  );
};

export default Modal;