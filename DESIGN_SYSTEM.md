# Digital Dock — Visual Design System Specification

**Version:** 1.1.0  
**Status:** Implemented in pure CSS Custom Properties (`src/styles/tokens.css` & `src/styles/app.css`)  
**Target:** Web (Mobile 320px, Tablet 768px, Laptop 1024px, Desktop 1440px+)

---

## 1. Visual Identity & Brand Direction

Digital Dock is styled in a focused, authoritative **Navy & Teal** aesthetic. The deep navy foundation conveys trust, structure, and academic rigor, while vibrant teal accents bring clarity and interactive prominence to search actions and external navigation links.

Each discovery channel retains a distinctive thematic accent to support rapid spatial orientation:
- **Movie Dock:** Indigo / Sky Blue (`theme-movie`)
- **Study Dock:** Forest / Emerald Green (`theme-study`)
- **Game Dock:** Royal Violet / Purple (`theme-game`)

---

## 2. Color Palette & Design Tokens

### 2.1 Brand Navy & Slate
| Token | Value | Role |
| :--- | :--- | :--- |
| `--color-navy-950` | `#071524` | Primary hero background, brand title |
| `--color-navy-900` | `#0c2035` | Dominant brand navy, primary action buttons |
| `--color-navy-800` | `#122d4a` | Secondary buttons, headers |
| `--color-navy-700` | `#1a3d63` | Subtitle text, active filters |
| `--color-navy-100` | `#e8f1f8` | Icon box backgrounds, active nav pill |
| `--color-navy-50`  | `#f0f5fa` | Nav hover state, table row hover |

### 2.2 Brand Teal & Cyan Accents
| Token | Value | Role |
| :--- | :--- | :--- |
| `--color-teal-700` | `#006070` | Section category tags, high-contrast headings |
| `--color-teal-600` | `#00778a` | Interactive primary hover, active icon tint |
| `--color-teal-500` | `#008f9e` | Focus ring accent, border highlights |
| `--color-teal-400` | `#05abc0` | Hero eyebrow highlight |
| `--color-teal-100` | `#e2f6f8` | Channel submission CTA background |

### 2.3 Neutrals & WCAG Text Tokens
| Token | Value | Contrast on White | WCAG 2.1 AA Compliance |
| :--- | :--- | :--- | :--- |
| `--color-text-primary` | `#0f1f2e` | 15.2 : 1 | Pass (AAA) |
| `--color-text-secondary` | `#3b4e61` | 8.4 : 1 | Pass (AAA) |
| `--color-text-muted` | `#5a6e82` | 5.2 : 1 | Pass (AA) |
| `--color-bg-app` | `#f4f7fb` | — | Background |
| `--color-bg-surface` | `#ffffff` | — | Card surface |
| `--color-border-subtle` | `#e2e8f0` | — | Dividers, card borders |
| `--color-border-strong` | `#cbd5e1` | — | Form field borders |

### 2.4 Semantic Status Tokens
- **Approved / Success:**
  - Background: `#eaf7ee`
  - Text: `#0e623b` (WCAG 7.2:1)
  - Border: `#a8e2bc`
- **Pending / Warning:**
  - Background: `#fff8e6`
  - Text: `#875a00` (WCAG 5.8:1)
  - Border: `#fcd98c`
- **Rejected / Danger:**
  - Background: `#fdf0f0`
  - Text: `#9e2a2b` (WCAG 6.4:1)
  - Border: `#f7b4b6`

---

## 3. Typography Scale

Digital Dock uses standard web fonts loaded cleanly from Google Fonts:
- **Headings & Brand:** `Manrope` (Weights: 500, 600, 700, 800)
- **Body & Controls:** `DM Sans` (Weights: 400, 500, 600, 700)

```css
--font-size-xs:   0.75rem;    /* 12px - strict minimum for metadata, badges */
--font-size-sm:   0.8125rem;  /* 13px - table cells, card metadata */
--font-size-base: 0.875rem;   /* 14px - standard body, form inputs */
--font-size-md:   0.9375rem;  /* 15px - lead paragraphs */
--font-size-lg:   1.0625rem;  /* 17px - card headings, subheadings */
--font-size-xl:   1.25rem;    /* 20px - section headings */
--font-size-2xl:  1.5rem;     /* 24px - stat numbers, sub-hero titles */
--font-size-3xl:  1.875rem;   /* 30px - page titles */
--font-size-4xl:  2.25rem;    /* 36px - hero display */
```

*Note on Accessibility:* Previous sub-10px font sizes (9px, 10px) have been completely eliminated. All metadata, category badges, and tags render at a minimum of `12px` (`0.75rem`), satisfying WCAG AA legibility criteria.

---

## 4. Spacing, Elevation & Radii

### 4.1 Spacing Scale
- `var(--space-1)`: 4px (tight groupings, icon gaps)
- `var(--space-2)`: 8px (compact padding, button gaps)
- `var(--space-3)`: 12px (card footer padding, tag margins)
- `var(--space-4)`: 16px (standard container padding, grid gaps)
- `var(--space-6)`: 24px (section margins, panel padding)
- `var(--space-8)`: 32px (page gutters, hero margins)
- `var(--space-10)`: 40px (hero padding, desktop header gutters)

### 4.2 Radii & Elevation
- **Input & Buttons:** `var(--radius-sm)` (6px) or `var(--radius-md)` (10px)
- **Cards & Dialogs:** `var(--radius-lg)` (14px)
- **Badges & Filter Pills:** `var(--radius-pill)` (9999px)
- **Shadows:**
  - Resting Card: `0 1px 2px 0 rgba(15, 31, 46, 0.05)`
  - Hover Card: `0 10px 24px -4px rgba(15, 31, 46, 0.1)`
  - Active Focus Ring: `0 0 0 3px rgba(0, 143, 158, 0.35)`

---

## 5. Reusable Component Specs

### 5.1 Resource Card (`ResourceCard.jsx`)
- **Header Art Area:** 100px fixed height with channel-specific gradient and icon.
- **Channel Badge:** Positioned in bottom-left corner of art area with 92% translucent white background.
- **Body Area:** Category tag (uppercase tracking), bold title (`<h3>`), and 3-line truncated description.
- **Footer:** Displayed domain name (e.g. `godotengine.org`) on left; outbound source link button with external link icon on right.
- **Link Attributes:** `target="_blank"`, `rel="noopener noreferrer"`, with `.sr-only` "(opens in new tab)" annotation for screen readers.

### 5.2 Navigation Sidebar (`Sidebar.jsx`)
- **Desktop:** Fixed 248px left rail with full vertical height (`100vh`).
- **Mobile (< 768px):** Transformed off-canvas (`translateX(-100%)`). Toggled via accessible hamburger button. Includes full-screen semi-transparent backdrop overlay, internal close button (`X`), and auto-closing upon link click or `Escape` key press.

### 5.3 Community Submission Form (`SubmitPage.jsx`)
- **Layout:** Two columns on desktop (Form 1.4fr, Guidelines 0.9fr); single column stacked on mobile.
- **Field Controls:** Channel dropdown, Title input (max 100 chars with live counter), Category picker (standard list or custom entry), Canonical URL input with protocol validation, and Description textarea (10–500 chars with live counter).
- **Validation Feedback:** Field-level error messages (`role="alert"`) paired with `aria-invalid="true"`.

### 5.4 Moderation Dashboard (`AdminPage.jsx`)
- **Stat Cards:** 4 summary counters (*Pending*, *Approved*, *Rejected*, *Total*) that serve as interactive filter switches.
- **Table:** Accessible HTML `<table>` with `scope="col"` headers, scrollable responsive wrapper, domain extraction, and status badges.
- **Confirmation Protection:** Modal dialog prompts for confirmation prior to rejecting a resource.
- **Undo Action:** Status changes surface a temporary banner allowing immediate one-click restoration of previous state.

---

## 6. Accessibility & Responsiveness Strategy

1. **Semantic HTML:** Replaced unsemantic `<label>` headings with `<div className="nav-section-title">`, wrapped resource cards in `<article>`, and organized navigation under `<nav aria-label="...">`.
2. **Keyboard Navigation:** Ensured every interactive element is a native `<button>`, `<input>`, `<select>`, `<textarea>`, or `<a>`. Suppressed raw outlines only when replaced with distinct `:focus-visible` custom outlines and shadows.
3. **Screen Readers:** Added explicit `aria-label`, `aria-expanded`, `aria-invalid`, `aria-describedby`, and `.sr-only` descriptions where visual cues are insufficient.
4. **Motion Sensitivity:** Enforced `@media (prefers-reduced-motion: reduce)` to disable transitions and smooth scrolling for users with vestibular conditions.
