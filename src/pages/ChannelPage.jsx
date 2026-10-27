import React from 'react';
import { Search, X, Film, BookOpen, Gamepad2, ShieldCheck, Plus, Compass } from 'lucide-react';
import { ResourceCard } from '../components/ResourceCard.jsx';
import { CHANNEL_METADATA } from '../data/initialResources.js';

export function ChannelPage({
  channelName,
  resources,
  searchQuery,
  onSearchChange,
  onSearchClear,
  activeCategory,
  onSelectCategory,
  onNavigate,
  onStartSubmitForChannel
}) {
  const meta = CHANNEL_METADATA[channelName] || {
    title: channelName,
    badge: 'Channel',
    tagline: 'Discover curated digital resources.',
    description: 'Explore verified resources.'
  };

  const getChannelIcon = () => {
    switch (channelName) {
      case 'Study Dock':
        return <BookOpen size={30} aria-hidden="true" />;
      case 'Game Dock':
        return <Gamepad2 size={30} aria-hidden="true" />;
      case 'Movie Dock':
      default:
        return <Film size={30} aria-hidden="true" />;
    }
  };

  // Extract categories available in this channel among approved items
  const channelItems = resources.filter(
    (item) => item.channel === channelName && item.status === 'approved'
  );

  const categories = ['All', ...new Set(channelItems.map((item) => item.category).filter(Boolean))];

  // Apply search query and category filter
  const q = searchQuery.trim().toLowerCase();
  const filteredItems = channelItems.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    if (!matchesCategory) return false;
    if (!q) return true;
    const haystack = `${item.title} ${item.desc} ${item.category} ${item.domain || ''}`.toLowerCase();
    return haystack.includes(q);
  });

  return (
    <div className="content-wrapper">
      {/* Channel Hero Header */}
      <section className="channel-hero" aria-labelledby="channel-hero-title">
        <small className="channel-hero-eyebrow">CHANNEL</small>
        <h1 id="channel-hero-title">{meta.title}</h1>
        <p className="channel-hero-tagline">{meta.description}</p>
        <div className="channel-hero-meta">
          <span>✓ Canonical source links</span>
          <span>·</span>
          <span>Community vetted</span>
          <span>·</span>
          <span>{channelItems.length} verified sample resources</span>
        </div>
      </section>

      {/* Channel Search Form */}
      <form
        className="channel-search-form"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          const target = document.getElementById('channel-resources-heading');
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
      >
        <Search size={18} className="search-icon" aria-hidden="true" />
        <label htmlFor="channel-search-input" className="sr-only">
          Search resources in {channelName}
        </label>
        <input
          id="channel-search-input"
          type="search"
          className="search-input"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={`Search within ${channelName} (e.g. tools, tutorials, archives)...`}
        />
        {searchQuery && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={onSearchClear}
            aria-label="Clear channel search"
          >
            <X size={16} />
          </button>
        )}
        <button type="submit" className="search-submit-btn">
          Search
        </button>
      </form>

      {/* Channel Responsible Guide Banner */}
      <aside className="guidance-box" aria-labelledby="guidance-box-heading">
        <div className="guidance-icon">{getChannelIcon()}</div>
        <div className="guidance-text">
          <small>CURATION POLICY</small>
          <h3 id="guidance-box-heading">Direct Canonical Linking</h3>
          <p>
            Links point to original publishers. Verify licensing terms on target sites before using or distributing materials.
          </p>
        </div>
        <button
          type="button"
          className="guidance-btn"
          onClick={() => onNavigate('Rules')}
        >
          View Guidelines
        </button>
      </aside>

      {/* Category Filter Pills & Submit Button */}
      <div className="filter-bar" role="toolbar" aria-label="Category filters">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => onSelectCategory(cat)}
            aria-pressed={activeCategory === cat}
          >
            {cat}
          </button>
        ))}

        <button
          type="button"
          className="channel-submit-cta"
          onClick={() => onStartSubmitForChannel(channelName)}
        >
          <Plus size={15} aria-hidden="true" />
          <span>Submit to {channelName}</span>
        </button>
      </div>

      {/* Results Header */}
      <div className="section-header" id="channel-resources-heading">
        <div className="section-header-left">
          <h2>
            {activeCategory === 'All' ? 'All Resources' : activeCategory} ({filteredItems.length})
          </h2>
          <p>
            {q
              ? `Filtered by query "${searchQuery}"`
              : `Showing approved resources in ${channelName}`}
          </p>
        </div>
      </div>

      {/* Resource Cards Grid */}
      {filteredItems.length > 0 ? (
        <div className="resource-grid">
          {filteredItems.map((item) => (
            <ResourceCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="empty-state-box">
          <Compass size={40} className="empty-state-icon" aria-hidden="true" />
          <h3>No matching resources</h3>
          <p>
            No approved resources matched your current filter criteria in {channelName}. Try choosing a different category or clearing your search keywords.
          </p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            {searchQuery && (
              <button
                type="button"
                className="empty-action-btn"
                onClick={onSearchClear}
              >
                Clear Search
              </button>
            )}
            {activeCategory !== 'All' && (
              <button
                type="button"
                className="empty-action-btn"
                onClick={() => onSelectCategory('All')}
                style={{ backgroundColor: 'var(--color-navy-700)' }}
              >
                Reset Category Filter
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
