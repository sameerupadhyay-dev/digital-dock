import React, { useEffect, useRef } from 'react';
import { AlertTriangle } from 'lucide-react';

export function ConfirmationModal({ isOpen, title, message, confirmText = 'Confirm', onConfirm, onCancel }) {
  const cancelBtnRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Focus the cancel button when opened for safe keyboard interaction
      cancelBtnRef.current?.focus();

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onCancel();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onCancel}
    >
      <div
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <AlertTriangle color="#b91c1c" size={22} aria-hidden="true" />
          <h3 id="modal-title">{title}</h3>
        </div>
        <p>{message}</p>
        <div className="modal-actions-row">
          <button
            ref={cancelBtnRef}
            type="button"
            className="btn-secondary-cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-action-reject"
            style={{ padding: '8px 16px', fontSize: '14px' }}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
