# Digital Dock — Design Registration Preparation Note (India)

**Document Date:** 2026-10-27  
**Project:** Digital Dock (Assignment 3 Prototype)  
**Authorship / Creator:** Sameer Upadhyay (`sameer.upadhyay@avantika.edu.in`)  
**Context:** Advisory documentation on documenting visual design expressions for potential future intellectual property evaluation under Indian design law.

---

## 1. Important Legal Disclaimer

> [!CAUTION]
> **Not Legal Advice & No Representation:**  
> This document is strictly for internal academic record-keeping and technical documentation. It does **not** constitute legal advice, an assessment of patentability/registrability, or a formal filing of any kind. No claim is made herein that the graphical user interface (GUI) or layout is legally novel, registrable, or eligible under the Indian Designs Act, 2000.  
> 
> Before filing any application or making public representations, the applicant must consult a qualified Indian Patent & Trademark Attorney / Intellectual Property Professional to assess current statutory criteria, judicial precedents regarding GUI eligibility in India, classification under the Locarno Classification (e.g. Class 14-04), and prior-publication risks.

---

## 2. Separation of Visual Appearance from Functional Architecture

Under the Indian Designs Act, 2000, a "design" refers only to features of shape, configuration, pattern, ornament, or composition of lines or colors applied to an article, judged solely by the eye, and does not include any mode or principle of construction or anything which is in substance a mere mechanical device (Section 2(d)).

To maintain strict boundaries between visual appearance and functional code:

### 2.1 Protectable Visual Elements (Aesthetic / Eye Appeal)
- **Visual Composition & Layout Geometry:**
  - Unique arrangement of the three-dock channel card grid with rounded corner proportions (`var(--radius-lg)` = 14px).
  - Spatial layout of the top navigation header with integrated breadcrumbs and inline status pills.
  - Distinctive two-tiered card visual layout featuring an upper thematic iconography banner (100px) seamlessly conjoined with a structured lower metadata body.
- **Colorway & Contrast Harmonization:**
  - Original palette pairing of deep oceanic navy (`#071524`, `#0c2035`) with teal accents (`#008f9e`, `#05abc0`) and channel-specific pastel visual identifiers (Movie Blue `#e0f2fe`, Study Green `#dcfce7`, Game Purple `#f3e8ff`).
- **Typography & Proportional Hierarchy:**
  - Specific typographic weight hierarchy between `Manrope` display elements and `DM Sans` interface controls.

### 2.2 Excluded Functional & Non-Registrable Elements (Must NOT Be Claimed)
- **Underlying Code & Software Algorithms:** React JSX source code, JavaScript filtering logic, and Vite build configuration.
- **Third-Party Icons & Packages:** Standard icons sourced from the open-source `lucide-react` package (MIT/ISC license).
- **External URLs & Content:** The sample educational, open movie, and game links indexed in the demo dataset.
- **Browser Functional Mechanics:** Browser URL routing, scroll mechanics, and native DOM APIs.

---

## 3. Record of Authorship & Design Provenance

| Milestone / Artifact | Date | Author | Description / Evidence |
| :--- | :--- | :--- | :--- |
| **Initial Wireframes** | Assignment 2 | Sameer Upadhyay | Four hand-drawn conceptual wireframes establishing 3-channel layout, search, submission form, and moderation flow. |
| **Prototype v1.0** | 2026-10-22 | Sameer Upadhyay | First operational React + Vite build (`commit 4e093e40d5`). |
| **Prototype v1.1 Upgrade** | 2026-10-27 | Sameer Upadhyay | In-place architectural upgrade: tokens system, modular components, accessible navigation, verified dataset, unit tests. |

---

## 4. Prior-Publication & Disclosure Risks

Under Indian design law, a design must be **new or original** and must not have been disclosed to the public anywhere in India or abroad by publication in tangible form or by use or in any other way prior to the filing date (Section 4(b)).

- **Public Repository Notice:** The Git repository is hosted publicly at `https://github.com/sameerupadhyay-dev/digital-dock` and the live site is deployed at `https://digital-dock.vercel.app/`.
- **Impact of Public Disclosure:** Because academic assignment submissions and public internet hosting constitute prior publication, an IP professional must evaluate whether public access has created a novelty bar prior to filing, or whether design registration remains feasible within any applicable grace periods or international convention priority filings.

---

## 5. Checklist for Future Professional IP Review

If formal design protection is pursued:
1. [ ] **Class Search & Locarno Classification:** Evaluate Class 14-04 (Screen Displays and Icons) under the Design Rules. Note that the Indian Patent Office historically scrutinizes GUI registrability and whether the screen display is applied to an "article of manufacture".
2. [ ] **Representation Sheets:** Prepare formal orthographic / screen representation drawings showing the visual interface on a display screen, with solid lines for the claimed UI and broken/dashed lines for non-claimed device hardware.
3. [ ] **Novelty Clearance:** Conduct a comprehensive design search of existing registered Indian and international designs in Class 14-04.
4. [ ] **Statement of Novelty:** Draft precise novelty claims limited strictly to the visual surface ornamentation and layout arrangement of the interface.
