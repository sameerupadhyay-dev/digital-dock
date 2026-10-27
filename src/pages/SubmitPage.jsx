import React, { useState } from 'react';
import { PlusCircle, ShieldCheck, AlertCircle, ArrowLeft } from 'lucide-react';
import { VALID_CHANNELS, CHANNEL_CATEGORIES, validateResourceForm } from '../utils/validation.js';

export function SubmitPage({ initialChannel = 'Movie Dock', onSubmitResource, onNavigate }) {
  const [formData, setFormData] = useState({
    channel: initialChannel || 'Movie Dock',
    title: '',
    category: CHANNEL_CATEGORIES[initialChannel || 'Movie Dock']?.[0] || 'Tools',
    customCategory: '',
    url: '',
    desc: ''
  });

  const [useCustomCategory, setUseCustomCategory] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChannelChange = (newChannel) => {
    const defaultCat = CHANNEL_CATEGORIES[newChannel]?.[0] || 'Tools';
    setFormData((prev) => ({
      ...prev,
      channel: newChannel,
      category: defaultCat,
      customCategory: ''
    }));
    setUseCustomCategory(false);
  };

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field-level error on change if already touched
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const activeCategory = useCustomCategory ? formData.customCategory : formData.category;
    const validation = validateResourceForm({
      ...formData,
      category: activeCategory
    });
    if (validation.errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: validation.errors[field] }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const activeCategory = useCustomCategory
      ? formData.customCategory.trim()
      : formData.category;

    const dataToValidate = {
      channel: formData.channel,
      title: formData.title.trim(),
      category: activeCategory,
      url: formData.url.trim(),
      desc: formData.desc.trim()
    };

    const validation = validateResourceForm(dataToValidate);

    if (!validation.isValid) {
      setErrors(validation.errors);
      setTouched({
        channel: true,
        title: true,
        category: true,
        url: true,
        desc: true
      });
      return;
    }

    // Submit validated resource
    onSubmitResource(dataToValidate);

    // Reset form to clean state
    setFormData({
      channel: formData.channel,
      title: '',
      category: CHANNEL_CATEGORIES[formData.channel]?.[0] || 'Tools',
      customCategory: '',
      url: '',
      desc: ''
    });
    setErrors({});
    setTouched({});
  };

  const currentCategories = CHANNEL_CATEGORIES[formData.channel] || [];

  return (
    <div className="content-wrapper">
      <div className="page-intro-header">
        <small>COMMUNITY CONTRIBUTION</small>
        <h1>Submit a Resource</h1>
        <p>
          Suggest an authorized, openly licensed, or canonical digital resource to expand the Digital Dock directory.
        </p>
      </div>

      <div className="form-layout-grid">
        {/* Main Submission Form */}
        <section className="content-panel" aria-labelledby="form-heading">
          <h2 id="form-heading" style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-4)' }}>
            Resource Details
          </h2>

          <form className="resource-form" onSubmit={handleSubmit} noValidate>
            {/* Channel Selection */}
            <div className="form-group">
              <label htmlFor="res-channel" className="form-label">
                Select Destination Channel *
              </label>
              <select
                id="res-channel"
                className="form-select"
                value={formData.channel}
                onChange={(e) => handleChannelChange(e.target.value)}
                aria-invalid={!!errors.channel}
                aria-describedby={errors.channel ? 'res-channel-error' : undefined}
              >
                {VALID_CHANNELS.map((ch) => (
                  <option key={ch} value={ch}>
                    {ch}
                  </option>
                ))}
              </select>
              {errors.channel && (
                <span id="res-channel-error" className="field-error-text" role="alert">
                  {errors.channel}
                </span>
              )}
            </div>

            {/* Resource Title */}
            <div className="form-group">
              <div className="form-label">
                <label htmlFor="res-title">Resource Title *</label>
                <span className="form-char-count">{formData.title.length}/100</span>
              </div>
              <input
                id="res-title"
                type="text"
                className="form-input"
                placeholder="e.g. Official Godot Engine Documentation"
                maxLength={100}
                value={formData.title}
                onChange={(e) => handleFieldChange('title', e.target.value)}
                onBlur={() => handleBlur('title')}
                aria-invalid={!!errors.title}
                aria-describedby={errors.title ? 'res-title-error' : undefined}
                required
              />
              {errors.title && (
                <span id="res-title-error" className="field-error-text" role="alert">
                  {errors.title}
                </span>
              )}
            </div>

            {/* Category Selection */}
            <div className="form-group">
              <label htmlFor="res-category" className="form-label">
                Category *
              </label>
              {!useCustomCategory ? (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <select
                    id="res-category"
                    className="form-select"
                    style={{ flex: 1 }}
                    value={formData.category}
                    onChange={(e) => handleFieldChange('category', e.target.value)}
                  >
                    {currentCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="btn-secondary-cancel"
                    style={{ whiteSpace: 'nowrap' }}
                    onClick={() => setUseCustomCategory(true)}
                  >
                    + Custom Category
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    id="res-category-custom"
                    type="text"
                    className="form-input"
                    style={{ flex: 1 }}
                    placeholder="Enter custom category (e.g. Tutorials)"
                    maxLength={40}
                    value={formData.customCategory}
                    onChange={(e) => handleFieldChange('customCategory', e.target.value)}
                    onBlur={() => handleBlur('category')}
                    aria-label="Custom category input"
                  />
                  <button
                    type="button"
                    className="btn-secondary-cancel"
                    style={{ whiteSpace: 'nowrap' }}
                    onClick={() => setUseCustomCategory(false)}
                  >
                    Use Standard List
                  </button>
                </div>
              )}
              {errors.category && (
                <span id="res-category-error" className="field-error-text" role="alert">
                  {errors.category}
                </span>
              )}
            </div>

            {/* Canonical URL */}
            <div className="form-group">
              <label htmlFor="res-url" className="form-label">
                Canonical Source URL *
              </label>
              <input
                id="res-url"
                type="url"
                className="form-input"
                placeholder="https://example.org/resource"
                value={formData.url}
                onChange={(e) => handleFieldChange('url', e.target.value)}
                onBlur={() => handleBlur('url')}
                aria-invalid={!!errors.url}
                aria-describedby={errors.url ? 'res-url-error' : undefined}
                required
              />
              {errors.url && (
                <span id="res-url-error" className="field-error-text" role="alert">
                  {errors.url}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="form-group">
              <div className="form-label">
                <label htmlFor="res-desc">Description & Value to Learners *</label>
                <span className="form-char-count">{formData.desc.length}/500</span>
              </div>
              <textarea
                id="res-desc"
                className="form-textarea"
                rows={4}
                placeholder="Briefly explain what this resource provides and why it is valuable to community members."
                maxLength={500}
                value={formData.desc}
                onChange={(e) => handleFieldChange('desc', e.target.value)}
                onBlur={() => handleBlur('desc')}
                aria-invalid={!!errors.desc}
                aria-describedby={errors.desc ? 'res-desc-error' : undefined}
                required
              />
              {errors.desc && (
                <span id="res-desc-error" className="field-error-text" role="alert">
                  {errors.desc}
                </span>
              )}
            </div>

            {/* Prototype Transparency Notice */}
            <div className="form-privacy-card">
              <ShieldCheck size={20} aria-hidden="true" />
              <div>
                <strong>Prototype Submission Workflow:</strong> Submissions are placed into a local pending review queue. You can immediately examine and approve/reject them on the Admin Moderation Dashboard.
              </div>
            </div>

            {/* Action Buttons */}
            <div className="form-actions-row">
              <button type="submit" className="btn-primary-submit">
                <PlusCircle size={18} aria-hidden="true" />
                <span>Submit for Moderation</span>
              </button>
              <button
                type="button"
                className="btn-secondary-cancel"
                onClick={() => onNavigate('Home')}
              >
                Cancel
              </button>
            </div>
          </form>
        </section>

        {/* Guidelines Sidebar Panel */}
        <aside className="content-panel guidelines-card" aria-labelledby="guidelines-heading">
          <h3 id="guidelines-heading">Submission Standards</h3>
          <ul className="guidelines-list">
            <li>
              <strong>Original Canonical Sources:</strong> Prefer official documentation, primary project homepages, or institutional archives over re-uploaders.
            </li>
            <li>
              <strong>Open Licensing:</strong> Resources should be free-to-access, public domain, or licensed under recognized open terms (CC, MIT, GPL, Apache).
            </li>
            <li>
              <strong>Active & Accessible:</strong> Double check that the provided URL resolves and does not require behind-the-paywall logins.
            </li>
            <li>
              <strong>No Personal/Confidential Data:</strong> Do not submit private drives, internal credentials, or copyrighted materials without permission.
            </li>
          </ul>

          <div className="guidelines-demo-note">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <AlertCircle size={16} aria-hidden="true" />
              <strong>Demo Environment Limitation:</strong>
            </div>
            In this prototype, submissions are stored in browser session memory. No production database or automated background virus scanner is attached.
          </div>
        </aside>
      </div>
    </div>
  );
}
