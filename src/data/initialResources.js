/**
 * Digital Dock — Verified Initial Resource Dataset
 * All resources point to recognized, lawful, official or open-source digital assets.
 * Clearly marked as sample data for prototype demonstration.
 */

export const INITIAL_RESOURCES = [
  // Study Dock (Approved)
  {
    id: 1,
    title: 'MDN Web Docs',
    channel: 'Study Dock',
    category: 'Documentation',
    desc: 'Standards-based documentation, guides, and interactive examples for HTML, CSS, JavaScript, and Web APIs.',
    url: 'https://developer.mozilla.org/',
    domain: 'developer.mozilla.org',
    status: 'approved',
    submittedAt: '2026-10-20T10:00:00Z'
  },
  {
    id: 2,
    title: 'freeCodeCamp',
    channel: 'Study Dock',
    category: 'Interactive Learning',
    desc: 'Free, community-driven interactive programming curriculum with hands-on projects, challenges, and verified certifications.',
    url: 'https://www.freecodecamp.org/',
    domain: 'freecodecamp.org',
    status: 'approved',
    submittedAt: '2026-10-21T11:30:00Z'
  },
  {
    id: 3,
    title: 'MIT OpenCourseWare',
    channel: 'Study Dock',
    category: 'Academic',
    desc: 'Free, publicly accessible course materials and lecture notes reflecting thousands of MIT undergraduate and graduate curricula.',
    url: 'https://ocw.mit.edu/',
    domain: 'ocw.mit.edu',
    status: 'approved',
    submittedAt: '2026-10-22T09:15:00Z'
  },
  {
    id: 4,
    title: 'Khan Academy',
    channel: 'Study Dock',
    category: 'Foundational Study',
    desc: 'Self-paced educational practice exercises and instructional videos spanning math, computing, and science fundamentals.',
    url: 'https://www.khanacademy.org/',
    domain: 'khanacademy.org',
    status: 'approved',
    submittedAt: '2026-10-22T14:00:00Z'
  },

  // Movie Dock (Approved)
  {
    id: 5,
    title: 'Big Buck Bunny (Blender Open Movie)',
    channel: 'Movie Dock',
    category: 'Animation',
    desc: 'Open-content animated comedy film created by the Blender Institute using free and open-source 3D tools.',
    url: 'https://peach.blender.org/',
    domain: 'peach.blender.org',
    status: 'approved',
    submittedAt: '2026-10-23T08:20:00Z'
  },
  {
    id: 6,
    title: 'Openverse (Creative Commons)',
    channel: 'Movie Dock',
    category: 'Media Archive',
    desc: 'Search engine for openly licensed and public domain images, audio, and media files for creative projects.',
    url: 'https://openverse.org/',
    domain: 'openverse.org',
    status: 'approved',
    submittedAt: '2026-10-23T16:45:00Z'
  },
  {
    id: 7,
    title: 'Internet Archive: Moving Images',
    channel: 'Movie Dock',
    category: 'Public Domain',
    desc: 'Digital library containing thousands of digitized public domain motion pictures, vintage shorts, and educational films.',
    url: 'https://archive.org/details/movies',
    domain: 'archive.org',
    status: 'approved',
    submittedAt: '2026-10-24T12:10:00Z'
  },
  {
    id: 8,
    title: 'Sintel (Blender Foundation Film)',
    channel: 'Movie Dock',
    category: 'Animation',
    desc: 'Open-source 3D fantasy short film released under Creative Commons, providing full production assets and open files.',
    url: 'https://durian.blender.org/',
    domain: 'durian.blender.org',
    status: 'approved',
    submittedAt: '2026-10-24T18:00:00Z'
  },

  // Game Dock (Approved)
  {
    id: 9,
    title: 'Godot Engine',
    channel: 'Game Dock',
    category: 'Game Engine',
    desc: 'Feature-packed, cross-platform 2D and 3D open-source game engine with comprehensive documentation and active community.',
    url: 'https://godotengine.org/',
    domain: 'godotengine.org',
    status: 'approved',
    submittedAt: '2026-10-25T11:00:00Z'
  },
  {
    id: 10,
    title: 'Blender 3D Suite',
    channel: 'Game Dock',
    category: 'Asset Creation',
    desc: 'Free, professional 3D pipeline software supporting modeling, rigging, animation, simulation, rendering, and compositing.',
    url: 'https://www.blender.org/',
    domain: 'blender.org',
    status: 'approved',
    submittedAt: '2026-10-25T13:20:00Z'
  },
  {
    id: 11,
    title: 'OpenGameArt.org',
    channel: 'Game Dock',
    category: 'Game Assets',
    desc: 'Free 2D/3D art, sprites, textures, and music contributed under GPL, CC0, and Creative Commons licenses for indie game developers.',
    url: 'https://opengameart.org/',
    domain: 'opengameart.org',
    status: 'approved',
    submittedAt: '2026-10-25T15:40:00Z'
  },
  {
    id: 12,
    title: 'itch.io Open Source Showcase',
    channel: 'Game Dock',
    category: 'Indie & Open Source',
    desc: 'Curated directory of open-source indie video games, developer devlogs, and game jam submissions.',
    url: 'https://itch.io/games/top-rated/tag-open-source',
    domain: 'itch.io',
    status: 'approved',
    submittedAt: '2026-10-25T17:15:00Z'
  },

  // Sample Pending Item (to demonstrate moderation queue immediately upon opening admin)
  {
    id: 13,
    title: 'W3Schools Online Web Tutorials',
    channel: 'Study Dock',
    category: 'Documentation',
    desc: 'Web development tutorials and quick reference code snippets for beginners.',
    url: 'https://www.w3schools.com/',
    domain: 'w3schools.com',
    status: 'pending',
    submittedAt: '2026-10-26T09:00:00Z'
  },

  // Sample Rejected Item (to demonstrate rejected state and review history)
  {
    id: 14,
    title: 'Example Broken Link Submission',
    channel: 'Movie Dock',
    category: 'Tools',
    desc: 'Demonstration of a rejected link due to incomplete metadata or non-original source.',
    url: 'https://example.com/broken-demo',
    domain: 'example.com',
    status: 'rejected',
    submittedAt: '2026-10-26T10:15:00Z',
    moderationNote: 'Non-original aggregator; missing canonical source.'
  }
];

export const CHANNEL_METADATA = {
  'Movie Dock': {
    title: 'Movie Dock',
    badge: 'Media & Cinema',
    tagline: 'Open-source films, creative animations, and public domain media archives.',
    description: 'Curated cinema, animation showcases, and media archives with direct links to official publishers.',
    iconName: 'Film',
    themeClass: 'theme-movie'
  },
  'Study Dock': {
    title: 'Study Dock',
    badge: 'Learning & Docs',
    tagline: 'Technical documentation, open courseware, and interactive programming guides.',
    description: 'Foundational study materials, web standards documentation, and interactive tutorials.',
    iconName: 'BookOpen',
    themeClass: 'theme-study'
  },
  'Game Dock': {
    title: 'Game Dock',
    badge: 'Interactive & Tools',
    tagline: 'Open-source game engines, 3D creation suites, and creative assets.',
    description: 'Resources for creators and players: game engines, asset libraries, and indie prototypes.',
    iconName: 'Gamepad2',
    themeClass: 'theme-game'
  }
};
