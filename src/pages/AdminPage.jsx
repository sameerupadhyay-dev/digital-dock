import React, { useState } from 'react';
import {
  Check,
  X,
  Search,
  RotateCcw,
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  FolderOpen
} from 'lucide-react';
import { ConfirmationModal } from '../components/ConfirmationModal.jsx';
import { extractHostname } from '../utils/url.js';

export function AdminPage({
  resources,
  onUpdateStatus,
  onResetData,
  onNavigate
}) {
  const [filterStatus, setFilterStatus] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [pendingRejectItem, setPendingRejectItem] = useState(null);

  // Compute status counts
  const pendingCount = resources.filter((x) => x.status === 'pending').length;
  const approvedCount = resources.filter((x) => x.status === 'approved').length;
  const rejectedCount = resources.filter((x) => x.status === 'rejected').length;
  const totalCount = resources.length;

  // Filter items based on active status filter and search term
  const q = searchTerm.trim().toLowerCase();
  const filteredList = resources.filter((item) => {
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    if (!matchesStatus) return false;
    if (!q) return true;
    const haystack = `${item.title} ${item.desc} ${item.url} ${item.channel} ${item.category || ''} ${item.domain || ''}`.toLowerCase();
    return haystack.includes(q);
  });

  const handleApprove = (id) => {
    onUpdateStatus(id, 'approved');
  };

  const handlePromptReject = (item) => {
    setPendingRejectItem(item);
  };

  const handleConfirmReject = () => {
    if (pendingRejectItem) {
      onUpdateStatus(pendingRejectItem.id, 'rejected');
      setPendingRejectItem(null);
    }
  };

  return (
    <div className="content-wrapper">
      <div className="page-intro-header">
        <small>HYBRID MODERATION WORKFLOW</small>
        <h1>Admin Moderation Dashboard</h1>
        <p>
          Simulate the community review pipeline. Inspect user submissions, verify canonical sources, and decide approval or rejection.
        </p>
      </div>

      {/* Warning banner highlighting prototype nature */}
      <div className="admin-warning-banner" role="alert" style={{ marginBottom: 'var(--space-6)' }}>
        <AlertTriangle size={20} aria-hidden="true" />
        <div>
          <strong>Demo Notice & Non-Production Boundary:</strong> This moderation dashboard is a client-side prototype. It is NOT protected by server authentication, session cookies, or access-control lists. Any actions taken persist only in your current session storage.
        </div>
      </div>

      {/* Interactive Stat Cards */}
      <div className="stats-cards-grid" role="group" aria-label="Status filter counters">
        <button
          type="button"
          className={`stat-card-btn ${filterStatus === 'pending' ? 'active' : ''}`}
          onClick={() => setFilterStatus('pending')}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <small>Pending Review</small>
            <Clock size={16} color="var(--color-warning-text)" aria-hidden="true" />
          </div>
          <b>{pendingCount}</b>
        </button>

        <button
          type="button"
          className={`stat-card-btn ${filterStatus === 'approved' ? 'active' : ''}`}
          onClick={() => setFilterStatus('approved')}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <small>Approved Public</small>
            <CheckCircle2 size={16} color="var(--color-success-text)" aria-hidden="true" />
          </div>
          <b>{approvedCount}</b>
        </button>

        <button
          type="button"
          className={`stat-card-btn ${filterStatus === 'rejected' ? 'active' : ''}`}
          onClick={() => setFilterStatus('rejected')}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <small>Rejected</small>
            <XCircle size={16} color="var(--color-danger-text)" aria-hidden="true" />
          </div>
          <b>{rejectedCount}</b>
        </button>

        <button
          type="button"
          className={`stat-card-btn ${filterStatus === 'all' ? 'active' : ''}`}
          onClick={() => setFilterStatus('all')}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <small>Total Submissions</small>
            <FolderOpen size={16} color="var(--color-navy-700)" aria-hidden="true" />
          </div>
          <b>{totalCount}</b>
        </button>
      </div>

      {/* Toolbar */}
      <div className="content-panel" style={{ padding: 'var(--space-4) var(--space-5)' }}>
        <div className="admin-toolbar">
          <div className="admin-search-wrapper">
            <Search size={16} className="admin-search-icon" aria-hidden="true" />
            <input
              type="search"
              className="admin-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, description, domain, or channel..."
              aria-label="Search moderation submissions"
            />
          </div>

          <label htmlFor="admin-status-select" className="sr-only">
            Filter by status
          </label>
          <select
            id="admin-status-select"
            className="admin-filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="pending">Pending Queue ({pendingCount})</option>
            <option value="approved">Approved Public ({approvedCount})</option>
            <option value="rejected">Rejected ({rejectedCount})</option>
            <option value="all">All Submissions ({totalCount})</option>
          </select>

          <button
            type="button"
            className="reset-demo-btn"
            onClick={onResetData}
            title="Restore default sample resource dataset"
          >
            <RotateCcw size={13} style={{ marginRight: '4px', verticalAlign: '-1px' }} aria-hidden="true" />
            <span>Reset Demo Data</span>
          </button>
        </div>

        {/* Table */}
        <div className="table-responsive-wrapper">
          <table className="moderation-table" aria-label="Resource moderation submissions">
            <thead>
              <tr>
                <th scope="col" style={{ width: '38%' }}>Resource Details</th>
                <th scope="col">Channel / Category</th>
                <th scope="col">Source Domain</th>
                <th scope="col">Status</th>
                <th scope="col" style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.length > 0 ? (
                filteredList.map((item) => {
                  const domain = extractHostname(item.url);
                  return (
                    <tr key={item.id}>
                      <td className="table-resource-cell">
                        <b>{item.title}</b>
                        <small>{item.desc}</small>
                      </td>
                      <td>
                        <span className="table-channel-badge">{item.channel}</span>
                        {item.category && (
                          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-teal-700)', fontWeight: 600 }}>
                            {item.category}
                          </div>
                        )}
                      </td>
                      <td>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ fontSize: 'var(--font-size-xs)' }}
                          title={`Open ${item.url} in new tab`}
                        >
                          {domain}
                        </a>
                      </td>
                      <td>
                        <span className={`status-badge ${item.status}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="table-actions-cell" style={{ textAlign: 'right' }}>
                        <button
                          type="button"
                          className="btn-action-approve"
                          disabled={item.status === 'approved'}
                          onClick={() => handleApprove(item.id)}
                          aria-label={`Approve ${item.title}`}
                          title="Approve resource to make it public"
                        >
                          <Check size={14} aria-hidden="true" />
                          <span>Approve</span>
                        </button>

                        <button
                          type="button"
                          className="btn-action-reject"
                          disabled={item.status === 'rejected'}
                          onClick={() => handlePromptReject(item)}
                          aria-label={`Reject ${item.title}`}
                          title="Reject submission"
                        >
                          <X size={14} aria-hidden="true" />
                          <span>Reject</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
                    <div style={{ color: 'var(--color-text-muted)' }}>
                      No submissions found matching the criteria.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal for Reject */}
      <ConfirmationModal
        isOpen={!!pendingRejectItem}
        title="Confirm Resource Rejection"
        message={`Are you sure you want to reject "${pendingRejectItem?.title}"? It will not appear in the public channel feeds.`}
        confirmText="Yes, Reject Resource"
        onConfirm={handleConfirmReject}
        onCancel={() => setPendingRejectItem(null)}
      />
    </div>
  );
}
