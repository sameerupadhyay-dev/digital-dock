import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { isValidWebUrl, extractHostname, normalizeUrl } from '../src/utils/url.js';

describe('URL Utility Functions', () => {
  it('validates legitimate HTTPS and HTTP URLs', () => {
    assert.equal(isValidWebUrl('https://developer.mozilla.org/'), true);
    assert.equal(isValidWebUrl('http://example.com/test?q=1'), true);
    assert.equal(isValidWebUrl('https://godotengine.org/download'), true);
  });

  it('rejects unsafe protocols (javascript:, data:, file:)', () => {
    assert.equal(isValidWebUrl('javascript:alert(1)'), false);
    assert.equal(isValidWebUrl('data:text/html,<html>hello</html>'), false);
    assert.equal(isValidWebUrl('file:///etc/passwd'), false);
    assert.equal(isValidWebUrl('ftp://mirror.example.org'), false);
  });

  it('rejects malformed strings and non-URL inputs', () => {
    assert.equal(isValidWebUrl(''), false);
    assert.equal(isValidWebUrl('   '), false);
    assert.equal(isValidWebUrl(null), false);
    assert.equal(isValidWebUrl(undefined), false);
    assert.equal(isValidWebUrl('not a url'), false);
    assert.equal(isValidWebUrl('http://'), false);
  });

  it('safely extracts clean hostname without throwing', () => {
    assert.equal(extractHostname('https://www.freecodecamp.org/news/'), 'freecodecamp.org');
    assert.equal(extractHostname('https://peach.blender.org/'), 'peach.blender.org');
    assert.equal(extractHostname('invalid-string'), 'source-link');
    assert.equal(extractHostname(null), 'source-link');
  });

  it('normalizes and trims URL strings', () => {
    assert.equal(normalizeUrl('  https://blender.org/  '), 'https://blender.org/');
    assert.equal(normalizeUrl(''), '');
  });
});
