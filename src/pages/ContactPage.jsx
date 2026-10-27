import React from 'react';
import { Mail, GitFork, ExternalLink, MessageSquare, BookOpen, Bug } from 'lucide-react';

export function ContactPage({ onNavigate }) {
  return (
    <div className="content-wrapper">
      <div className="page-intro-header">
        <small>EVALUATION & COLLABORATION</small>
        <h1>Contact & Academic Feedback</h1>
        <p>
          Information on peer evaluation, feedback channels, and open-source project tracking for the Digital Dock prototype.
        </p>
      </div>

      <div className="info-section-grid">
        {/* Academic Prototype Context */}
        <section className="info-card" aria-labelledby="contact-academic">
          <h2 id="contact-academic">Academic Context & Evaluation</h2>
          <p>
            Digital Dock is developed as an interactive front-end prototype for <strong>Assignment 3</strong>. It builds upon the interaction wireframes and architecture proposed in Assignment 2.
          </p>
          <p>
            Because this is an active prototype running in an academic sandbox, there is no automated email dispatch daemon or customer helpdesk connected. Instead, all feedback and bug reports are tracked directly via the project's source repository and course peer review sessions.
          </p>
        </section>

        {/* Channels for Reviewers & Instructors */}
        <section className="info-card" aria-labelledby="contact-channels">
          <h2 id="contact-channels">Evaluation & Feedback Channels</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
            <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--color-bg-app)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-2)' }}>
                <GitFork size={20} color="var(--color-navy-900)" aria-hidden="true" />
                <h3 style={{ margin: 0 }}>GitHub Repository</h3>
              </div>
              <p style={{ fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-3)' }}>
                Inspect source code, file an issue, or review commit history and release tags.
              </p>
              <a
                href="https://github.com/sameerupadhyay-dev/digital-dock"
                target="_blank"
                rel="noopener noreferrer"
                className="card-outbound-link"
                style={{ display: 'inline-flex' }}
              >
                <span>View on GitHub</span>
                <ExternalLink size={13} aria-hidden="true" />
              </a>
            </div>

            <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--color-bg-app)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-2)' }}>
                <Bug size={20} color="var(--color-teal-600)" aria-hidden="true" />
                <h3 style={{ margin: 0 }}>Bug Reports</h3>
              </div>
              <p style={{ fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-3)' }}>
                If you encounter a responsive layout issue, broken filter, or keyboard trap during evaluation, record it in the peer evaluation rubric.
              </p>
              <button
                type="button"
                className="section-link-btn"
                style={{ padding: 0 }}
                onClick={() => onNavigate('Rules')}
              >
                Review Quality Criteria →
              </button>
            </div>
          </div>
        </section>

        {/* Future Architecture Roadmap */}
        <section className="info-card" aria-labelledby="contact-roadmap">
          <h2 id="contact-roadmap">Production Roadmap (Final Project Phase)</h2>
          <p>
            Transitioning Digital Dock from this front-end prototype to a multi-user production service entails the following planned milestones:
          </p>
          <ul>
            <li>
              <strong>Relational Database Layer:</strong> Transitioning session state to a persistent PostgreSQL/Supabase database with Row-Level Security (RLS).
            </li>
            <li>
              <strong>Authenticated Admin Dashboard:</strong> Role-Based Access Control (RBAC) via secure JWT / OAuth authentication for verified moderators.
            </li>
            <li>
              <strong>Automated Safety Scanner:</strong> Server-side Google Safe Browsing / VirusTotal API integration for automated domain health inspection prior to human review.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
