import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { loadResources, isSessionStorageAvailable, resetResourcesToDefault } from '../src/utils/storage.js';
import { INITIAL_RESOURCES } from '../src/data/initialResources.js';

describe('Storage Layer Fallback & Safety', () => {
  it('safely detects absence of window.sessionStorage in non-browser environments', () => {
    assert.equal(isSessionStorageAvailable(), false);
  });

  it('safely falls back to INITIAL_RESOURCES when sessionStorage is absent', () => {
    const data = loadResources();
    assert.ok(Array.isArray(data));
    assert.equal(data.length, INITIAL_RESOURCES.length);
    assert.equal(data[0].title, INITIAL_RESOURCES[0].title);
  });

  it('resets to clean copy of INITIAL_RESOURCES', () => {
    const data = resetResourcesToDefault();
    assert.equal(data.length, INITIAL_RESOURCES.length);
  });
});
