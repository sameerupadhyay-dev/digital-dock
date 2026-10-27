import React from 'react';
import { Search, X, ShieldCheck, ArrowRight, Film, BookOpen, Gamepad2, Compass } from 'lucide-react';
import { ResourceCard } from '../components/ResourceCard.jsx';
import { CHANNEL_METADATA } from '../data/initialResources.js';

export function HomePage({
  resources,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onSearchClear,
  onNavigate
}) {
  const channelList = [
    { name: 'Movie Dock', icon: Film, theme: 'theme-movie' },
    { name: 'Study Dock', icon: BookOpen, theme: 'theme-study' },
    { name: 'Game Dock', icon: Gamepad2, theme: 'theme-game' }
  ];

  // Filter approved resources for home display
  const q = searchQuery.trim().toLowerCase();
  const displayedResources = resources.filter(item => {
    if (item.status !== 'approved') return false;
    if (!q) return true;
    const haystack = `${item.title} ${item.desc} ${item.category} ${item.channel} ${item.domain || ''}`.toLowerCase();
    return haystack.includes(q);
  });

  return (
    <div className="content-wrapper">
      {/* Hero Section */}
      <section className="home-hero" aria-labelledby="home-hero-title">
        <h1 id="home-hero-title">
          Your central hub for <br />
          <span className="highlight">digital resources.</span>
        </h1>
        <p className="hero-description">
          Discover verified learning materials, creative media, and open-source tools directly from their original sources.
        </p>

        {/* Search Bar */}
        <form
          className="search-form"
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            if (onSearchSubmit) onSearchSubmit();
          }}
        >
          <Search size={20} className="search-icon" aria-hidden="true" />
          <label htmlFor="home-search-input" className="sr-only">
            Search resources across all docks
          </label>
          <input
            id="home-search-input"
            type="search"
            className="search-input"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search documentation, open tools, media archives..."
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={onSearchClear}
              aria-label="Clear search input"
            >
              <X size={16} />
            </button>
          )}
          <button type="submit" className="search-submit-btn">
            Search
          </button>
        </form>
      </section>

      {/* Channel Cards Section */}
      <section aria-labelledby="channels-heading" style={{ marginTop: 'var(--space-8)' }}>
        <div className="section-header">
          <div className="section-header-left">
            <h2 id="channels-heading">Explore Channels</h2>
          </div>
        </div>

        <div className="channel-grid">
          {channelList.map(({ name, icon: IconComponent, theme }) => {
            const meta = CHANNEL_METADATA[name];
            return (
              <button
                key={name}
                type="button"
                className="channel-card-btn"
                onClick={() => onNavigate('Channel', name)}
              >
                <div className={`channel-icon-box ${theme}`}>
                  <IconComponent size={26} aria-hidden="true" />
                </div>
                <h3>{name}</h3>
                <p>{meta.tagline}</p>
                <span className="channel-cta">
                  <span>Explore {name}</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Latest Resources Section */}
      <section aria-labelledby="resources-heading" style={{ marginTop: 'var(--space-8)' }}>
        <div className="section-header">
          <div className="section-header-left">
            <h2 id="resources-heading">
              {q ? `Search Results (${displayedResources.length})` : 'Featured Resources'}
            </h2>
            {q && (
              <p>Showing approved entries matching "{searchQuery}"</p>
            )}
          </div>
        </div>

        {displayedResources.length > 0 ? (
          <div className="resource-grid">
            {displayedResources.slice(0, 9).map((item) => (
              <ResourceCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="empty-state-box">
            <Compass size={40} className="empty-state-icon" aria-hidden="true" />
            <h3>No resources found</h3>
            <p>
              We couldn't find any resources matching "{searchQuery}". Try a different keyword or reset search.
            </p>
            <button
              type="button"
              className="empty-action-btn"
              onClick={onSearchClear}
            >
              Clear Search
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
