import React from 'react';
import { Film, BookOpen, Gamepad2, ExternalLink } from 'lucide-react';
import { extractHostname } from '../utils/url.js';

export function ResourceCard({ item }) {
  const getChannelTheme = (ch) => {
    switch (ch) {
      case 'Study Dock':
        return 'theme-study';
      case 'Game Dock':
        return 'theme-game';
      case 'Movie Dock':
      default:
        return 'theme-movie';
    }
  };

  const getChannelIcon = (ch) => {
    switch (ch) {
      case 'Study Dock':
        return <BookOpen size={28} aria-hidden="true" />;
      case 'Game Dock':
        return <Gamepad2 size={28} aria-hidden="true" />;
      case 'Movie Dock':
      default:
        return <Film size={28} aria-hidden="true" />;
    }
  };

  const themeClass = getChannelTheme(item.channel);
  const hostname = extractHostname(item.url);

  return (
    <article className="resource-card">
      <div className={`card-header-art ${themeClass}`}>
        {getChannelIcon(item.channel)}
        <span className="card-channel-badge">{item.channel}</span>
      </div>

      <div className="card-body">
        {item.category && (
          <span className="card-category-tag">{item.category}</span>
        )}
        <h3 className="card-title">{item.title}</h3>
        <p className="card-description">{item.desc}</p>

        <div className="card-footer">
          <span className="card-domain" title={item.url}>
            {hostname}
          </span>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="card-outbound-link"
            aria-label={`Open ${item.title} from source ${hostname} (opens in new tab)`}
          >
            <span>Open source</span>
            <ExternalLink size={13} aria-hidden="true" />
            <span className="sr-only">(opens in new tab)</span>
          </a>
        </div>
      </div>
    </article>
  );
}
