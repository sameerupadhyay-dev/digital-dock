import React from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, Scale, Lock } from 'lucide-react';

export function RulesPage({ onNavigate }) {
  return (
    <div className="content-wrapper">
      <div className="page-intro-header">
        <small>COMMUNITY STANDARDS</small>
        <h1>Rules & Curation Policies</h1>
        <p>
          Standards and ethical practices governing resource submissions, link verification, and content moderation on Digital Dock.
        </p>
      </div>

      <div className="info-section-grid">
        {/* Guiding Principles */}
        <section className="info-card" aria-labelledby="rules-principles">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-2)' }}>
            <Scale size={22} color="var(--color-navy-700)" aria-hidden="true" />
            <h2 id="rules-principles" style={{ margin: 0 }}>Curation Standards</h2>
          </div>
          <p>
            Digital Dock adheres to ethical linking principles. To safeguard users and respect intellectual property rights, all submitted resources must comply with four core rules:
          </p>
          <ul>
            <li>
              <strong>1. Prefer Canonical & Official Sources:</strong> Direct links must point to the project author's official domain, primary code repository, or authorized distributor. Aggregator scraping websites are rejected.
            </li>
            <li>
              <strong>2. Lawful & Openly Licensed Content:</strong> Only resources available under permissive public licenses (e.g. MIT, Apache, GPL, Creative Commons) or verified public domain status are accepted.
            </li>
            <li>
              <strong>3. No Piracy, Paywall Bypasses, or Warez:</strong> Submissions facilitating unauthorized reproduction or distribution of copyrighted proprietary material are strictly prohibited and immediately rejected.
            </li>
            <li>
              <strong>4. Privacy & Zero Tracking:</strong> Contributors must never submit URLs containing tracking tokens, affiliate affiliate-referrals, internal employee links, or private Google Drive/Dropbox links.
            </li>
          </ul>
        </section>

        {/* Moderation Criteria */}
        <section className="info-card" aria-labelledby="rules-moderation">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-2)' }}>
            <ShieldCheck size={22} color="var(--color-teal-600)" aria-hidden="true" />
            <h2 id="rules-moderation" style={{ margin: 0 }}>Hybrid Moderation Criteria</h2>
          </div>
          <p>
            Under the proposed architecture (Assignment 2), user submissions are screened before publication. Reviewers apply the following checklist:
          </p>
          <ul>
            <li>
              <strong>URL Protocol:</strong> Must strictly be <code>https://</code> or <code>http://</code>.
            </li>
            <li>
              <strong>Metadata Accuracy:</strong> The title and category must accurately reflect the contents of the target site.
            </li>
            <li>
              <strong>Domain Health:</strong> Domains with expired TLS certificates, malware warnings, or deceptive redirects will not pass review.
            </li>
            <li>
              <strong>Relevance:</strong> The resource must provide genuine utility to students, creators, or developers in the chosen channel.
            </li>
          </ul>
        </section>

        {/* Outbound Linking Notice */}
        <section className="info-card" aria-labelledby="rules-disclaimer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-2)' }}>
            <Lock size={22} color="var(--color-text-muted)" aria-hidden="true" />
            <h2 id="rules-disclaimer" style={{ margin: 0 }}>External Platform Responsibility</h2>
          </div>
          <p>
            Digital Dock does not operate the servers of indexed resources. Users opening external resources should review the respective platform's terms of service, privacy policy, and license agreements prior to downloading or deploying code.
          </p>
          <div style={{ marginTop: 'var(--space-4)' }}>
            <button
              type="button"
              className="btn-primary-submit"
              onClick={() => onNavigate('Submit')}
            >
              <span>Submit a Verified Resource</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
