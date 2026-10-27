import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { validateResourceForm } from '../src/utils/validation.js';

describe('Resource Form Validation', () => {
  const validData = {
    channel: 'Study Dock',
    title: 'MDN Web Docs',
    category: 'Documentation',
    url: 'https://developer.mozilla.org/',
    desc: 'Comprehensive web standards documentation and guides.'
  };

  it('passes on completely valid input', () => {
    const result = validateResourceForm(validData);
    assert.equal(result.isValid, true);
    assert.deepEqual(result.errors, {});
  });

  it('catches missing or invalid channel', () => {
    const invalidChannel = validateResourceForm({ ...validData, channel: 'Invalid Dock' });
    assert.equal(invalidChannel.isValid, false);
    assert.match(invalidChannel.errors.channel, /valid channel/i);

    const missingChannel = validateResourceForm({ ...validData, channel: '' });
    assert.equal(missingChannel.isValid, false);
    assert.match(missingChannel.errors.channel, /valid channel/i);
  });

  it('validates title constraints (required, length 2-100, whitespace trimming)', () => {
    const emptyTitle = validateResourceForm({ ...validData, title: '   ' });
    assert.equal(emptyTitle.isValid, false);
    assert.match(emptyTitle.errors.title, /required/i);

    const shortTitle = validateResourceForm({ ...validData, title: 'A' });
    assert.equal(shortTitle.isValid, false);
    assert.match(shortTitle.errors.title, /at least 2/i);

    const longTitle = validateResourceForm({ ...validData, title: 'A'.repeat(101) });
    assert.equal(longTitle.isValid, false);
    assert.match(longTitle.errors.title, /cannot exceed 100/i);
  });

  it('validates category requirements', () => {
    const emptyCat = validateResourceForm({ ...validData, category: '   ' });
    assert.equal(emptyCat.isValid, false);
    assert.match(emptyCat.errors.category, /choose or specify/i);

    const longCat = validateResourceForm({ ...validData, category: 'C'.repeat(45) });
    assert.equal(longCat.isValid, false);
    assert.match(longCat.errors.category, /cannot exceed 40/i);
  });

  it('validates URL syntax and protocol', () => {
    const badProtocol = validateResourceForm({ ...validData, url: 'javascript:alert(1)' });
    assert.equal(badProtocol.isValid, false);
    assert.match(badProtocol.errors.url, /valid web URL/i);

    const notAUrl = validateResourceForm({ ...validData, url: 'example' });
    assert.equal(notAUrl.isValid, false);
    assert.match(notAUrl.errors.url, /valid web URL/i);
  });

  it('validates description minimum and maximum lengths', () => {
    const shortDesc = validateResourceForm({ ...validData, desc: 'Too short' });
    assert.equal(shortDesc.isValid, false);
    assert.match(shortDesc.errors.desc, /at least 10/i);

    const longDesc = validateResourceForm({ ...validData, desc: 'D'.repeat(505) });
    assert.equal(longDesc.isValid, false);
    assert.match(longDesc.errors.desc, /cannot exceed 500/i);
  });
});
