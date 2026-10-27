import React, { useEffect } from 'react';
import {
  Anchor,
  House,
  Film,
  BookOpen,
  Gamepad2,
  Info,
  ShieldCheck,
  Mail,
  PlusCircle,
  ShieldAlert,
  X
} from 'lucide-react';

export function Sidebar({ page, currentChannel, onNavigate, isMobileOpen, onCloseMobile }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileOpen) {
        onCloseMobile();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileOpen, onCloseMobile]);

  const handleNavClick = (targetPage, channel) => {
    onNavigate(targetPage, channel);
    if (isMobileOpen) {
      onCloseMobile();
    }
  };

  const isChannelActive = (ch) => page === 'Channel' && currentChannel === ch;

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          className="drawer-backdrop"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar ${isMobileOpen ? 'mobile-open' : ''}`} aria-label="Main Navigation">
        <button
          type="button"
          className="sidebar-close-btn"
          onClick={onCloseMobile}
          aria-label="Close navigation sidebar"
        >
          <X size={20} />
        </button>

        {/* Brand Header */}
        <button
          type="button"
          className="brand-btn"
          onClick={() => handleNavClick('Home')}
          aria-label="Digital Dock Home"
        >
          <div className="brand-icon-wrapper">
            <Anchor size={24} aria-hidden="true" />
          </div>
          <div className="brand-text">
            <span className="brand-title">Digital Dock</span>
            <span className="brand-subtitle">Central Resource Hub</span>
          </div>
        </button>

        {/* Primary Navigation */}
        <nav aria-label="Explore Channels">
          <div className="nav-section-title">Explore</div>
          <ul className="nav-list">
            <li>
              <button
                type="button"
                className={`nav-item-btn ${page === 'Home' ? 'active' : ''}`}
                onClick={() => handleNavClick('Home')}
              >
                <House size={18} aria-hidden="true" />
                <span>Home</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`nav-item-btn ${isChannelActive('Movie Dock') ? 'active' : ''}`}
                onClick={() => handleNavClick('Channel', 'Movie Dock')}
              >
                <Film size={18} aria-hidden="true" />
                <span>Movie Dock</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`nav-item-btn ${isChannelActive('Study Dock') ? 'active' : ''}`}
                onClick={() => handleNavClick('Channel', 'Study Dock')}
              >
                <BookOpen size={18} aria-hidden="true" />
                <span>Study Dock</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`nav-item-btn ${isChannelActive('Game Dock') ? 'active' : ''}`}
                onClick={() => handleNavClick('Channel', 'Game Dock')}
              >
                <Gamepad2 size={18} aria-hidden="true" />
                <span>Game Dock</span>
              </button>
            </li>
          </ul>

          <hr className="sidebar-divider" />

          <div className="nav-section-title">Information</div>
          <ul className="nav-list">
            <li>
              <button
                type="button"
                className={`nav-item-btn ${page === 'About' ? 'active' : ''}`}
                onClick={() => handleNavClick('About')}
              >
                <Info size={18} aria-hidden="true" />
                <span>About</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`nav-item-btn ${page === 'Rules' ? 'active' : ''}`}
                onClick={() => handleNavClick('Rules')}
              >
                <ShieldCheck size={18} aria-hidden="true" />
                <span>Rules & Policies</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`nav-item-btn ${page === 'Contact' ? 'active' : ''}`}
                onClick={() => handleNavClick('Contact')}
              >
                <Mail size={18} aria-hidden="true" />
                <span>Contact & Review</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Sidebar Footer Controls */}
        <div className="sidebar-bottom">
          <div className="sidebar-status-tag">
            <span className="status-dot" aria-hidden="true" />
            <span>Anonymous Browsing</span>
          </div>

          <button
            type="button"
            className="submit-nav-btn"
            onClick={() => handleNavClick('Submit')}
          >
            <PlusCircle size={16} aria-hidden="true" />
            <span>Submit Resource</span>
          </button>

          <button
            type="button"
            className={`admin-nav-link ${page === 'Admin' ? 'active' : ''}`}
            onClick={() => handleNavClick('Admin')}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <ShieldAlert size={14} aria-hidden="true" />
              <span>Admin moderation (demo)</span>
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
