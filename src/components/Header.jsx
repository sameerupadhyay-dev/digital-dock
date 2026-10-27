import React from 'react';
import { Menu, UserRound, ShieldAlert } from 'lucide-react';

export function Header({ page, currentChannel, onToggleMobileNav, isMobileOpen }) {
  const getPageTitle = () => {
    if (page === 'Channel') return currentChannel;
    if (page === 'Admin') return 'Admin Moderation Dashboard';
    if (page === 'Submit') return 'Submit Resource';
    if (page === 'About') return 'About Digital Dock';
    if (page === 'Rules') return 'Community Rules & Guidelines';
    if (page === 'Contact') return 'Contact & Academic Feedback';
    return 'Digital Resource Hub';
  };

  return (
    <header className="top-header">
      <div className="header-left">
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={onToggleMobileNav}
          aria-label={isMobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileOpen}
        >
          <Menu size={20} aria-hidden="true" />
        </button>
        <span className="page-breadcrumb" aria-current="page">
          {getPageTitle()}
        </span>
      </div>

      <div className="header-right">
        <span className="prototype-pill" title="This prototype operates with client-side session data and no external database">
          <ShieldAlert size={14} aria-hidden="true" />
          <span>Demo Environment</span>
        </span>
        <div className="user-status" title="Anonymous session (Assignment 2 prototype spec)">
          <UserRound size={16} aria-hidden="true" />
          <span>Anonymous</span>
        </div>
      </div>
    </header>
  );
}
