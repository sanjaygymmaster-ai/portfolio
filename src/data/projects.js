export const STORAGE_KEY = 'portfolio-projects';

export const initialProjects = [
  {
    id: 'electrical-shop-billing-system',
    title: 'Electrical Shop Billing System',
    description: 'Billing system for small shops with login and data storage',
    fullDescription:
      'A billing workflow tailored for electrical shops with authentication, inventory-aware records, and persistent invoice data. The project focused on making day-to-day billing simpler for small businesses without forcing a complex enterprise interface.',
    image: '/project1.png',
    screenshots: ['/project1.png', '/project1-dashboard.png', '/project1-invoice.png'],
    live: 'https://electrical-shop-billing-sanjay.netlify.app/login',
    github: 'https://github.com/sanjaygymmaster-ai/electrical-shop-billing',
    learned: ['Authentication', 'Database connection'],
    techStack: ['React', 'Node.js', 'Express', 'MongoDB'],
    problemsFaced: [
      'Keeping billing flows simple for non-technical shop owners',
      'Managing user authentication with persistent data access',
    ],
    solutions: [
      'Designed a cleaner step-by-step billing interface with less friction',
      'Used a structured backend flow for login, data writes, and invoice retrieval',
    ],
    tag: 'Production',
  },
  {
    id: 'ai-student-assistant',
    title: 'AI Student Assistant',
    description: 'AI app for notes and quiz generation',
    fullDescription:
      'An assistant that helps students convert study material into summaries, notes, and question sets. The goal was to build a practical AI workflow that feels useful for learning rather than just demonstrating an API response.',
    image: '/project2.png',
    screenshots: ['/project2.png', '/project2-notes.png', '/project2-quiz.png'],
    live: '#',
    github: '#',
    learned: ['API integration', 'Backend logic'],
    techStack: ['React', 'Express', 'OpenAI API', 'MongoDB'],
    problemsFaced: [
      'Structuring prompts so generated notes were actually usable',
      'Handling async request states for AI responses and retries',
    ],
    solutions: [
      'Introduced clearer prompt formatting for more predictable note generation',
      'Built backend request handling with cleaner loading and error states',
    ],
    tag: 'AI Workflow',
  },
  {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    description: 'Modern personal portfolio with animations',
    fullDescription:
      'A personal portfolio built to present work with stronger visual polish, motion, and storytelling. The focus was on making the site feel more like a product landing page than a simple static resume.',
    image: '/project3.png',
    screenshots: ['/project3.png', '/project3-hero.png', '/project3-projects.png'],
    live: '#',
    github: '#',
    learned: ['UI design', 'Responsive layout'],
    techStack: ['React', 'Vite', 'CSS', 'Framer-inspired motion patterns'],
    problemsFaced: [
      'Balancing visual richness with readability and performance',
      'Keeping layouts premium-looking across mobile and desktop sizes',
    ],
    solutions: [
      'Used layered gradients, spacing, and restrained motion instead of heavy effects',
      'Built responsive sections with scalable typography and flexible grids',
    ],
    tag: 'Brand Design',
  },
];
