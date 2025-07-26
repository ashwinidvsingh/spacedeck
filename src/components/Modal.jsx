import React from 'react';
import './Modal.css';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>❌</button>
        <div className="modal-content">
            {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
