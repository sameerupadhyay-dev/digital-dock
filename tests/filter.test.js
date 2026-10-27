import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { INITIAL_RESOURCES } from '../src/data/initialResources.js';

/**
 * Filter helper matching application filtering logic
 */
function filterResources(items, { channel = 'All', category = 'All', query = '', status = 'approved' }) {
  const q = query.trim().toLowerCase();
  return items.filter(item => {
    const matchesStatus = status === 'all' || item.status === status;
    const matchesChannel = channel === 'All' || item.channel === channel;
    const matchesCategory = category === 'All' || item.category === category;
    const haystack = `${item.title} ${item.desc} ${item.category} ${item.domain || ''}`.toLowerCase();
    const matchesQuery = !q || haystack.includes(q);
    return matchesStatus && matchesChannel && matchesCategory && matchesQuery;
  });
}

describe('Resource Filtering & Search Logic', () => {
  it('filters approved resources by default', () => {
    const approved = filterResources(INITIAL_RESOURCES, {});
    assert.ok(approved.length > 0);
    assert.ok(approved.every(item => item.status === 'approved'));
  });

  it('filters by channel accurately', () => {
    const movieOnly = filterResources(INITIAL_RESOURCES, { channel: 'Movie Dock' });
    assert.ok(movieOnly.length >= 4);
    assert.ok(movieOnly.every(x => x.channel === 'Movie Dock'));

    const studyOnly = filterResources(INITIAL_RESOURCES, { channel: 'Study Dock' });
    assert.ok(studyOnly.length >= 4);
    assert.ok(studyOnly.every(x => x.channel === 'Study Dock'));

    const gameOnly = filterResources(INITIAL_RESOURCES, { channel: 'Game Dock' });
    assert.ok(gameOnly.length >= 4);
    assert.ok(gameOnly.every(x => x.channel === 'Game Dock'));
  });

  it('combines channel and category filters correctly', () => {
    const studyDocs = filterResources(INITIAL_RESOURCES, {
      channel: 'Study Dock',
      category: 'Documentation'
    });
    assert.ok(studyDocs.length >= 1);
    assert.ok(studyDocs.some(x => x.title === 'MDN Web Docs'));
    assert.ok(studyDocs.every(x => x.channel === 'Study Dock' && x.category === 'Documentation'));
  });

  it('searches across title, description, category, and domain case-insensitively', () => {
    const searchBlender = filterResources(INITIAL_RESOURCES, { query: 'blender' });
    assert.ok(searchBlender.length >= 2); // Big Buck Bunny, Blender 3D Suite

    const searchDocs = filterResources(INITIAL_RESOURCES, { query: 'documentation' });
    assert.ok(searchDocs.length >= 2); // MDN, Godot Engine
  });

  it('returns empty array when search query matches nothing', () => {
    const noResults = filterResources(INITIAL_RESOURCES, { query: 'nonexistenttermxyz999' });
    assert.equal(noResults.length, 0);
  });

  it('filters moderation statuses correctly (pending, approved, rejected, all)', () => {
    const pending = filterResources(INITIAL_RESOURCES, { status: 'pending' });
    assert.ok(pending.length >= 1);
    assert.equal(pending[0].status, 'pending');

    const rejected = filterResources(INITIAL_RESOURCES, { status: 'rejected' });
    assert.ok(rejected.length >= 1);
    assert.equal(rejected[0].status, 'rejected');

    const all = filterResources(INITIAL_RESOURCES, { status: 'all' });
    assert.equal(all.length, INITIAL_RESOURCES.length);
  });
});
