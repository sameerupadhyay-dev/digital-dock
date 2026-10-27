import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

// Components
import { Header } from './components/Header.jsx';
import { Sidebar } from './components/Sidebar.jsx';
import { Footer } from './components/Footer.jsx';
import { NotificationBanner } from './components/NotificationBanner.jsx';

// Pages
import { HomePage } from './pages/HomePage.jsx';
import { ChannelPage } from './pages/ChannelPage.jsx';
import { SubmitPage } from './pages/SubmitPage.jsx';
import { AdminPage } from './pages/AdminPage.jsx';
import { AboutPage } from './pages/AboutPage.jsx';
import { RulesPage } from './pages/RulesPage.jsx';
import { ContactPage } from './pages/ContactPage.jsx';

// Utilities & Data
import { loadResources, saveResources, resetResourcesToDefault } from './utils/storage.js';
import { extractHostname } from './utils/url.js';

export function App() {
  const [page, setPage] = useState('Home');
  const [currentChannel, setCurrentChannel] = useState('Movie Dock');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [resources, setResources] = useState(() => loadResources());
  const [notification, setNotification] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [lastAction, setLastAction] = useState(null);

  // Sync resources to session storage whenever they change
  useEffect(() => {
    saveResources(resources);
  }, [resources]);

  // Navigation handler
  const handleNavigate = (targetPage, channel) => {
    setPage(targetPage);
    if (channel) {
      setCurrentChannel(channel);
    }
    // Reset page-level category filter when navigating
    setActiveCategory('All');
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Start submission pre-configured for a channel
  const handleStartSubmitForChannel = (channel) => {
    setCurrentChannel(channel);
    setPage('Submit');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Resource submission handler
  const handleSubmitResource = (resourceData) => {
    const newEntry = {
      ...resourceData,
      id: Date.now(),
      domain: extractHostname(resourceData.url),
      status: 'pending',
      submittedAt: new Date().toISOString()
    };

    const updatedList = [newEntry, ...resources];
    setResources(updatedList);
    setNotification({
      type: 'success',
      message: `"${resourceData.title}" submitted to the demo queue. Visit the Admin Dashboard to review and approve it!`
    });
  };

  // Moderation status update handler with undo tracking
  const handleUpdateStatus = (id, newStatus) => {
    const targetItem = resources.find((item) => item.id === id);
    if (!targetItem) return;

    const previousStatus = targetItem.status;
    const updatedList = resources.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );

    setResources(updatedList);
    setLastAction({ id, previousStatus, newStatus, title: targetItem.title });

    setNotification({
      type: newStatus === 'approved' ? 'success' : 'warning',
      message: `Status of "${targetItem.title}" changed to ${newStatus}.`
    });
  };

  // Undo last moderation action
  const handleUndo = () => {
    if (!lastAction) return;
    const { id, previousStatus, title } = lastAction;
    const updatedList = resources.map((item) =>
      item.id === id ? { ...item, status: previousStatus } : item
    );
    setResources(updatedList);
    setLastAction(null);
    setNotification({
      type: 'info',
      message: `Undid change for "${title}". Restored to ${previousStatus}.`
    });
  };

  // Reset to initial sample dataset
  const handleResetData = () => {
    const defaultData = resetResourcesToDefault();
    setResources(defaultData);
    setLastAction(null);
    setNotification({
      type: 'info',
      message: 'Demo dataset reset to initial sample state.'
    });
  };

  return (
    <div className="app-container">
      {/* Navigation Sidebar */}
      <Sidebar
        page={page}
        currentChannel={currentChannel}
        onNavigate={handleNavigate}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Main View Area */}
      <div className="main-area">
        <Header
          page={page}
          currentChannel={currentChannel}
          isMobileOpen={isMobileOpen}
          onToggleMobileNav={() => setIsMobileOpen((prev) => !prev)}
        />

        {/* Global Notification Banner */}
        {notification && (
          <div style={{ position: 'relative' }}>
            <NotificationBanner
              notice={notification}
              onDismiss={() => setNotification(null)}
            />
            {lastAction && (
              <div className="undo-action-wrapper">
                <button
                  type="button"
                  className="section-link-btn"
                  style={{ fontSize: 'var(--font-size-xs)' }}
                  onClick={handleUndo}
                >
                  ↺ Undo status change for "{lastAction.title}"
                </button>
              </div>
            )}
          </div>
        )}

        {/* Dynamic Pages */}
        <main id="main-content">
          {page === 'Home' && (
            <HomePage
              resources={resources}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSearchSubmit={() => {
                const section = document.getElementById('resources-heading');
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              onSearchClear={() => setSearchQuery('')}
              onNavigate={handleNavigate}
            />
          )}

          {page === 'Channel' && (
            <ChannelPage
              channelName={currentChannel}
              resources={resources}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSearchClear={() => setSearchQuery('')}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              onNavigate={handleNavigate}
              onStartSubmitForChannel={handleStartSubmitForChannel}
            />
          )}

          {page === 'Submit' && (
            <SubmitPage
              initialChannel={currentChannel}
              onSubmitResource={handleSubmitResource}
              onNavigate={handleNavigate}
            />
          )}

          {page === 'Admin' && (
            <AdminPage
              resources={resources}
              onUpdateStatus={handleUpdateStatus}
              onResetData={handleResetData}
              onNavigate={handleNavigate}
            />
          )}

          {page === 'About' && <AboutPage onNavigate={handleNavigate} />}
          {page === 'Rules' && <RulesPage onNavigate={handleNavigate} />}
          {page === 'Contact' && <ContactPage onNavigate={handleNavigate} />}
        </main>

        <Footer onNavigate={handleNavigate} />
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
