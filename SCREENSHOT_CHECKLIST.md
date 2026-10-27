# Digital Dock — Screenshot Capture & Verification Checklist

**Purpose:** Guide for capturing genuine, un-fabricated application screenshots for assignment submissions, design portfolios, and design registration documentation.

> **Instruction for Reviewers & Authors:**  
> Start the application locally using `npm run dev` and navigate to `http://localhost:5173/`. Capture genuine screenshots directly from your browser viewport at the specified dimensions. Never use mockups or fabricated graphics.

---

## 1. Desktop Viewport (1280px × 800px or 1440px × 900px)

### Screen 1: Homepage & Discovery
- [ ] **Viewport:** Full desktop window (at least 1200px width).
- [ ] **Elements to verify:**
  - Sidebar rail visible on left with "Digital Dock" anchor brand, "Explore" section, and "Information" section.
  - Sticky top header showing "Digital Resource Hub" and "Demo Environment" badge.
  - Home hero banner with gradient, bold headline, subline, and search form.
  - Three channel destination cards (*Movie Dock*, *Study Dock*, *Game Dock*) with distinct icons and theme colors.
  - Curated resources grid displaying approved cards with badges and outbound links.
  - App footer with disclaimer.

### Screen 2: Channel Page (Study Dock or Game Dock)
- [ ] **Navigation:** Click "Study Dock" or "Game Dock" in sidebar.
- [ ] **Elements to verify:**
  - Channel hero with channel badge, description, and canonical link counter.
  - In-channel search input.
  - "Channel Principles" guidance banner with "View Guidelines" button.
  - Category filter pills (e.g. *All*, *Documentation*, *Interactive Learning*, *Academic*, *Foundational Study*).
  - Selected filter highlighted in solid navy.
  - Responsive resource card grid matching the selected channel.

### Screen 3: Community Resource Submission Page
- [ ] **Navigation:** Click "Submit resource" in sidebar.
- [ ] **Elements to verify:**
  - Left panel: Resource Details form with Destination Channel dropdown, Title input (`0/100` char counter), Category selector, Canonical Source URL, and Description textarea (`0/500` char counter).
  - Right panel: Submission Standards sidebar and demo disclaimer note.
  - Inline error validation states (trigger by submitting an empty form or invalid URL to demonstrate accessible field errors).

### Screen 4: Admin Moderation Dashboard
- [ ] **Navigation:** Click "Admin moderation (demo)" at bottom of sidebar.
- [ ] **Elements to verify:**
  - Prominent yellow warning banner explaining demo status and non-production boundary.
  - Four stat cards: *Pending Review (1)*, *Approved Public (12)*, *Rejected (1)*, *Total Submissions (14)*.
  - Moderation toolbar with search input, status filter dropdown, and "Reset Demo Data" button.
  - Submissions table showing resource title/description, channel/category, source domain, status badge, and Approve/Reject buttons.
  - Reject action confirmation dialog modal.

---

## 2. Mobile Viewport (375px × 812px — iPhone / Android standard)

### Screen 5: Mobile Navigation Drawer & Hamburger
- [ ] **Setup:** Open Chrome DevTools (`Cmd + Option + I`), toggle device toolbar (`Cmd + Shift + M`), select iPhone 12/14 (375px width).
- [ ] **Elements to verify:**
  - Sidebar collapses off-screen cleanly without horizontal overflow.
  - Hamburger icon button (`Menu`) visible in top header.
  - Clicking hamburger slides drawer into view over a semi-transparent dark backdrop overlay.
  - "X" close button inside drawer.
  - Clicking a link navigates and automatically closes the drawer.

### Screen 6: Mobile Homepage & Resource Grid
- [ ] **Setup:** Mobile viewport (375px width).
- [ ] **Elements to verify:**
  - Hero banner paddings and typography scales down smoothly without clipped text.
  - Search input fills viewport cleanly.
  - Channel cards stack into a clean single-column layout.
  - Resource cards stack into a single-column layout with legible typography (all body text >= 13px, badges >= 12px).

---

## 3. Interactive State & Accessibility Evidence

### Screen 7: Form Inline Validation Errors
- [ ] Navigate to `/Submit`. Click "Submit for Moderation" with blank fields.
- [ ] Verify red inline error messages below each required control with `aria-invalid="true"`.

### Screen 8: Search Empty State
- [ ] On Homepage or Channel page, type `nonexistentqueryxyz999` into search.
- [ ] Verify the centered Compass icon empty state with "No resources found" and the "Clear Search" button.

### Screen 9: Status Update & Undo Toast Banner
- [ ] On Admin dashboard, click "Approve" or "Reject" on any submission.
- [ ] Verify the notification banner appearing at the top with the message and the "↺ Undo status change" button.
