import React from 'react';
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react';

export function NotificationBanner({ notice, onDismiss }) {
  if (!notice) return null;

  const type = notice.type || 'info';
  const message = typeof notice === 'string' ? notice : notice.message;

  const IconComponent = {
    success: CheckCircle,
    warning: AlertTriangle,
    danger: AlertCircle,
    info: Info
  }[type] || Info;

  return (
    <div
      className={`notice-banner notice-${type}`}
      role={type === 'danger' ? 'alert' : 'status'}
      aria-live="polite"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <IconComponent size={18} aria-hidden="true" />
        <span>{message}</span>
      </div>
      <button
        type="button"
        className="notice-dismiss-btn"
        onClick={onDismiss}
        aria-label="Dismiss notification"
      >
        <X size={16} />
      </button>
    </div>
  );
}
