import React from 'react';
import { Anchor } from 'lucide-react';

export function Footer({ onNavigate }) {
  return (
    <footer className="app-footer">
      <div className="footer-top-row">
        <div className="footer-brand">
          <Anchor size={18} aria-hidden="true" />
          <span>Digital Dock — Central Resource Discovery</span>
        </div>

        <ul className="footer-links-list">
          <li>
            <button
              type="button"
              className="footer-nav-btn"
              onClick={() => onNavigate('About')}
            >
              About
            </button>
          </li>
          <li>
            <button
              type="button"
              className="footer-nav-btn"
              onClick={() => onNavigate('Rules')}
            >
              Rules & Ethics
            </button>
          </li>
          <li>
            <button
              type="button"
              className="footer-nav-btn"
              onClick={() => onNavigate('Contact')}
            >
              Feedback & Contact
            </button>
          </li>
          <li>
            <button
              type="button"
              className="footer-nav-btn"
              onClick={() => onNavigate('Admin')}
            >
              Demo Moderation
            </button>
          </li>
        </ul>
      </div>

      <div className="footer-disclaimer">
        <strong>Academic Prototype Notice:</strong> Digital Dock is a front-end prototype. All sample cards point directly to official external sources. No remote database, user credential management, or server-side URL scanning is currently attached. Moderation and submissions operate locally within the active browser session.
      </div>
    </footer>
  );
}
