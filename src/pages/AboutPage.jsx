import React from 'react';
import { Anchor, Compass, CheckCircle2, Layers, ShieldCheck, ArrowRight } from 'lucide-react';

export function AboutPage({ onNavigate }) {
  return (
    <div className="content-wrapper">
      <div className="page-intro-header">
        <small>PROJECT OVERVIEW</small>
        <h1>About Digital Dock</h1>
        <p>
          A centralized, channel-based discovery system created to organize verified digital learning materials, open media, and creative development tools.
        </p>
      </div>

      <div className="info-section-grid">
        {/* Core Rationale */}
        <section className="info-card" aria-labelledby="about-rationale">
          <h2 id="about-rationale">The Problem & Core Concept</h2>
          <p>
            The internet contains an immense wealth of open-source software, educational courses, public domain films, and developer references. However, discovery remains fragmented across search engines bloated with sponsored placements, content scrapers, and unverified re-uploaders.
          </p>
          <p>
            <strong>Digital Dock</strong> was conceived as a curated "docking station" that routes users directly to original canonical sources rather than hosting third-party assets locally. By dividing discovery into three distinct functional channels—<strong>Movie Dock</strong>, <strong>Study Dock</strong>, and <strong>Game Dock</strong>—users can navigate directly to the specific tools and media they need.
          </p>
        </section>

        {/* Three Dock Channels */}
        <section className="info-card" aria-labelledby="about-channels">
          <h2 id="about-channels">Channel Architecture</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
            <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--color-bg-app)', borderRadius: 'var(--radius-md)' }}>
              <h3 style={{ marginTop: 0, color: '#075985' }}>Movie Dock</h3>
              <p style={{ fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-3)' }}>
                Indexes open-source animation projects (such as Blender Open Movies), Creative Commons media repositories, and public domain archives.
              </p>
              <button
                type="button"
                className="section-link-btn"
                onClick={() => onNavigate('Channel', 'Movie Dock')}
              >
                <span>Visit Movie Dock</span>
                <ArrowRight size={14} aria-hidden="true" />
              </button>
            </div>

            <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--color-bg-app)', borderRadius: 'var(--radius-md)' }}>
              <h3 style={{ marginTop: 0, color: '#166534' }}>Study Dock</h3>
              <p style={{ fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-3)' }}>
                Collects foundational open courseware, official standards documentation (such as MDN), and free interactive programming platforms.
              </p>
              <button
                type="button"
                className="section-link-btn"
                onClick={() => onNavigate('Channel', 'Study Dock')}
              >
                <span>Visit Study Dock</span>
                <ArrowRight size={14} aria-hidden="true" />
              </button>
            </div>

            <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--color-bg-app)', borderRadius: 'var(--radius-md)' }}>
              <h3 style={{ marginTop: 0, color: '#6b21a8' }}>Game Dock</h3>
              <p style={{ fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-3)' }}>
                Catalogs open-source game engines (like Godot), 3D asset creation suites, community game asset repositories, and indie prototypes.
              </p>
              <button
                type="button"
                className="section-link-btn"
                onClick={() => onNavigate('Channel', 'Game Dock')}
              >
                <span>Visit Game Dock</span>
                <ArrowRight size={14} aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>

        {/* Prototype Scope and Future Roadmap */}
        <section className="info-card" aria-labelledby="about-prototype">
          <h2 id="about-prototype">Academic Prototype Scope</h2>
          <p>
            This application is an academic assignment prototype. Key distinctions between this front-end prototype and a production release include:
          </p>
          <ul>
            <li>
              <strong>Client-Side Session State:</strong> Resource submissions and moderation decisions are saved to browser session storage. Refreshing or opening in a new private window does not affect other users.
            </li>
            <li>
              <strong>Demo Moderation:</strong> The moderation dashboard simulates the hybrid human-in-the-loop review pipeline proposed in Assignment 2, without requiring server-side administrative credentials.
            </li>
            <li>
              <strong>Outbound Safe Linking:</strong> Digital Dock only stores URLs and metadata pointing directly to verified official platforms.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
