# Digital Dock — Central Resource Discovery Platform

> **Academic Front-End Prototype (Assignment 3)**  
> **Repository:** [https://github.com/sameerupadhyay-dev/digital-dock](https://github.com/sameerupadhyay-dev/digital-dock)  
> **Deployment (Live Demo):** [https://digital-dock.vercel.app/](https://digital-dock.vercel.app/)  
> **Author & Lead Developer:** Sameer Upadhyay (`sameer.upadhyay@avantika.edu.in`)

---

## 1. Project Overview & Problem Statement

**Digital Dock** is a centralized, channel-based discovery platform engineered to organize verified digital learning materials, open media, and developer tools. 

Modern internet discovery is increasingly fragmented across ad-saturated search engines, content scrapers, and unverified re-uploaders. Digital Dock addresses this through curated "docks" that connect students, creators, and developers directly with canonical project sources without hosting third-party assets locally.

### The Three Discovery Channels
- **Movie Dock:** Curated index of open-source cinema projects (such as Blender Foundation films), Creative Commons media repositories, and public domain historical archives.
- **Study Dock:** Structured catalog of foundational open courseware (MIT OCW, Khan Academy), official web standards documentation (MDN), and interactive programming curricula (freeCodeCamp).
- **Game Dock:** Specialized directory of open-source game engines (Godot), 3D asset creation suites (Blender 3D), and free asset repositories (OpenGameArt, itch.io).

---

## 2. Technology Stack

Digital Dock is built purely on modern, standard web technologies without heavyweight external UI frameworks:

- **Core UI Framework:** React 19 (ESM)
- **Bundler & Build Tool:** Vite 8 (powered by Rolldown & LightningCSS)
- **Iconography:** Lucide React (`lucide-react`)
- **Styling Architecture:** Pure Vanilla CSS with CSS Custom Properties (Design Tokens), zero runtime CSS overhead, full WCAG AA contrast compliance, and responsive CSS Grid/Flexbox layouts.
- **Testing Engine:** Node.js native test runner (`node:test` & `node:assert/strict`) — zero additional testing dependencies required.
- **State Management & Persistence:** Modular React state coupled with safe `sessionStorage` serialization and memory fallback for prototype demonstrations.

---

## 3. Implemented Features

### 3.1 Global & Channel Discovery
- **Global Search:** Fast client-side search across titles, descriptions, categories, channels, and source domains.
- **Channel-Specific Views:** Dedicated landing pages for Movie Dock, Study Dock, and Game Dock featuring contextual search and channel principles.
- **Dynamic Category Filtering:** Dynamic category pills derived from approved entries with active visual states and real-time result counts.
- **Standardized Resource Cards:** Unified card components displaying category badge, title, clipped description, verified hostname, and outbound canonical link (`rel="noopener noreferrer"` with `target="_blank"`).
- **Graceful Empty States:** Informative fallback cards with one-click search and category reset buttons.

### 3.2 Submission-to-Moderation Pipeline (Prototype)
- **Community Submission Form:**
  - Accessible `<label>` controls with `htmlFor` and `aria-invalid` bindings.
  - Channel selector, title input with live character counter (100 char limit), category selector with custom category support, URL input with protocol validation (`http:`/`https:`), and description textarea (10–500 chars).
  - Field-level inline validation error messages.
  - Submissions immediately enter the local review queue as `status: 'pending'`.
- **Admin Moderation Dashboard (Demo Workflow):**
  - Prominent demo warning banner highlighting that the screen is not secured by server credentials.
  - 4 Interactive status counters: *Pending Review*, *Approved Public*, *Rejected*, and *Total Submissions* that double as quick filters.
  - Searchable submission table with domain extraction and status badges.
  - Action buttons for Approve and Reject with confirmation protection for destructive rejections.
  - One-click **Undo** mechanism to revert accidental status changes.
  - **Reset Demo Data** button to restore seed state at any time.

### 3.3 Information & Educational Pages
- **About Digital Dock:** In-depth explanation of the project's background, taxonomy, and prototype boundaries.
- **Rules & Policies:** Clear community contribution guidelines, intellectual property compliance, and ethical linking standards.
- **Contact & Feedback:** Academic peer evaluation instructions, bug reporting criteria, and GitHub repository links without fabricated contact details.

### 3.4 Accessibility & UX Engineering
- Fully responsive from 320px mobile screens up to 4K displays.
- High-contrast visual design tokens conforming to WCAG 2.1 AA standards (minimum 4.5:1 text contrast).
- Accessible mobile navigation drawer with backdrop overlay, close button, focus trapping, and `Escape` key dismissal.
- High-contrast keyboard focus indicators (`:focus-visible`).
- Accessible semantic markup (`<nav>`, `<header>`, `<main>`, `<footer>`, `<article>`, `<section>`, `<aside>`).
- Built-in support for `prefers-reduced-motion`.

---

## 4. Honest Prototype Limitations

As outlined in Assignment 2 and Assignment 3 specifications, this application is a **front-end prototype**:

1. **No Production Database:** Submissions and moderation actions persist only in the active browser's `sessionStorage`. Opening the site in a private window or clearing session data resets to initial seed resources.
2. **Demo-Only Admin Screen:** The admin dashboard is an unsecured demonstration of the hybrid moderation workflow. No JWT authentication, session tokens, or RBAC (Role-Based Access Control) are connected.
3. **Client-Side URL Validation:** URL checks occur in browser JavaScript (`URL` constructor and protocol check). In a production release, server-side URL resolution, anti-malware scanning (Google Safe Browsing), and domain trust scoring are required.
4. **No Remote Background Services:** No external mailer daemon, automated notification webhook, or CAPTCHA service is active in this front-end release.

---

## 5. Local Setup & Verification

### Prerequisites
- Node.js LTS (v18, v20, v22, or v24)
- npm (v9+)

### Installation & Execution
```bash
# 1. Clone repository
git clone https://github.com/sameerupadhyay-dev/digital-dock.git
cd digital-dock

# 2. Install dependencies
npm install

# 3. Run automated test suite
npm test

# 4. Start local development server
npm run dev

# 5. Build for production
npm run build
```

Once `npm run dev` is running, open the local URL displayed in the terminal (typically `http://localhost:5173/`).

---

## 6. Testing Summary

Automated tests are located in the `tests/` directory and run via Node's native test runner (`node --test tests/*.test.js`):

- `tests/url.test.js`: Validates legitimate HTTP/S protocols, rejects dangerous schemes (`javascript:`, `data:`, `file:`), and tests hostname extraction resilience.
- `tests/validation.test.js`: Validates required fields, string boundary limits (title length, description length), and category selection logic.
- `tests/filter.test.js`: Validates combined channel and category filtering, case-insensitive keyword searching, and status filtering.
- `tests/storage.test.js`: Validates safe fallback when `sessionStorage` is unavailable (e.g. server-side/headless runtimes) and reset functionality.

To execute tests:
```bash
npm test
```

---

## 7. Third-Party Packages & Licensing

| Package | Version | Purpose | License |
| :--- | :--- | :--- | :--- |
| `react` | 19.x | Component runtime & state | MIT |
| `react-dom` | 19.x | DOM rendering | MIT |
| `lucide-react` | 1.x | Lightweight SVG iconography | ISC / MIT |
| `vite` | 8.x | Frontend build tool & bundler | MIT |
| `@vitejs/plugin-react` | 6.x | Fast Refresh & JSX transform | MIT |

All sample resources indexed in the seed dataset link exclusively to official public websites and open-content initiatives (Blender Institute, MDN Web Docs, freeCodeCamp, MIT OCW, Godot Engine, OpenGameArt, itch.io).

---

## 8. Authorship & Intellectual Property Notice

- **Author / Concept Lead:** Sameer Upadhyay (`sameer.upadhyay@avantika.edu.in`)
- **Coursework:** Academic Assignment 3 Interactive Prototype
- **Design Registration Consideration:** The visual interface layout, iconography compositions, and channel dashboard designs are original prototype expressions. Prior to any formal design registration filing under the Indian Designs Act, 2000, formal legal consultation and novelty/prior-disclosure clearance are required. See [DESIGN_REGISTRATION_NOTE.md](./DESIGN_REGISTRATION_NOTE.md) for full details.
