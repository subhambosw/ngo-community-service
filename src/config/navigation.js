import {
  LayoutDashboard,
  Globe,
  Bell,
  AlertOctagon,
  PhoneCall,
  Gamepad2,
  ShieldCheck,
  KeyRound,
  AlertTriangle,
  Radio,
  FileCode,
  Shield,
  BookOpen,
  Award,
  HelpCircle,
  Compass,
  FileText,
  FileCheck2,
  Trophy,
  Home
} from 'lucide-react';

/**
 * Centralized Navigation Configuration
 * Cleanly organized into 5 intuitive sections designed specifically
 * for students and beginners in cybersecurity.
 */
export const navigationConfig = [
  {
    id: 'core',
    label: 'Start & Overview',
    shortLabel: 'Overview',
    description: 'Welcome hub, onboarding portal, and personal learning dashboard.',
    icon: LayoutDashboard,
    items: [
      {
        id: 'home',
        label: 'Home & Welcome',
        shortLabel: 'Home',
        description: 'Interactive student onboarding, introduction, and quick-start guide.',
        icon: Home,
        badge: 'START',
        keywords: ['home', 'welcome', 'start', 'intro', 'onboarding']
      },
      {
        id: 'overview',
        label: 'Security Dashboard',
        shortLabel: 'Dashboard',
        description: 'Personal learning stats, defense readiness posture, and recent activity.',
        icon: LayoutDashboard,
        badge: null,
        keywords: ['dashboard', 'overview', 'stats', 'terminal', 'readiness', 'progress']
      }
    ]
  },
  {
    id: 'labs',
    label: 'Interactive Labs',
    shortLabel: 'Labs',
    description: 'Hands-on forensic tools to analyze and defend against real attacks.',
    icon: Shield,
    items: [
      {
        id: 'phishing',
        label: 'Phishing Simulator',
        shortLabel: 'Phishing',
        description: 'Spot deceptive emails, fake bank alerts, and social engineering tricks.',
        icon: AlertTriangle,
        badge: 'POPULAR',
        keywords: ['phishing', 'email', 'scam', 'fake', 'links', 'social engineering']
      },
      {
        id: 'password',
        label: 'Password & Breach Lab',
        shortLabel: 'Passwords',
        description: 'Test password entropy, crack times, and check compromised credentials.',
        icon: KeyRound,
        badge: null,
        keywords: ['password', 'breach', 'hash', 'entropy', 'pwned', 'brute force']
      },
      {
        id: 'privacy',
        label: 'Privacy Auditor',
        shortLabel: 'Privacy',
        description: 'Inspect image EXIF metadata, digital footprints, and social exposure.',
        icon: Shield,
        badge: null,
        keywords: ['privacy', 'exif', 'metadata', 'osint', 'tracking', 'data']
      },
      {
        id: 'malware',
        label: 'Malware & Virus Lab',
        shortLabel: 'Malware',
        description: 'Explore ransomware behavior, trojan mechanisms, and endpoint defense.',
        icon: FileCode,
        badge: null,
        keywords: ['malware', 'virus', 'ransomware', 'trojan', 'sandbox', 'payload']
      },
      {
        id: 'network',
        label: 'Wi-Fi & Network Defense',
        shortLabel: 'Network',
        description: 'Secure public Wi-Fi, prevent MITM attacks, and configure home routers safely.',
        icon: Radio,
        badge: null,
        keywords: ['network', 'wifi', 'router', 'mitm', 'dns', 'firewall']
      }
    ]
  },
  {
    id: 'learn',
    label: 'Learn & Practice',
    shortLabel: 'Learn',
    description: 'Curriculum modules, interactive games, safety checkup, and certification.',
    icon: BookOpen,
    items: [
      {
        id: 'lessons',
        label: 'Curriculum Tracks',
        shortLabel: 'Lessons',
        description: 'Modular lessons on cybersecurity fundamentals, crypto, and safety rules.',
        icon: BookOpen,
        badge: null,
        keywords: ['lessons', 'curriculum', 'tracks', 'fundamentals', 'theory', 'learn']
      },
      {
        id: 'practice',
        label: 'Practice & Mini-Games',
        shortLabel: 'Games',
        description: 'Spot-the-link, Caesar cipher decoder, and interactive scenario challenges.',
        icon: Gamepad2,
        badge: 'GAMES',
        keywords: ['practice', 'games', 'cipher', 'puzzles', 'interactive', 'caesar']
      },
      {
        id: 'health',
        label: 'Security Health Check',
        shortLabel: 'Health Check',
        description: '10-question digital safety audit with your personalized hardening score.',
        icon: ShieldCheck,
        badge: 'AUDIT',
        keywords: ['health', 'checkup', 'audit', 'score', 'habits', 'checklist']
      },
      {
        id: 'quiz',
        label: 'Certification Exam',
        shortLabel: 'Certification',
        description: 'Test your knowledge across all topics and earn a verifiable certificate.',
        icon: Award,
        badge: 'EXAM',
        keywords: ['quiz', 'exam', 'certificate', 'test', 'diploma', 'cert']
      }
    ]
  },
  {
    id: 'intel',
    label: 'Live Intel & Defense',
    shortLabel: 'Intel',
    description: 'Real-time attack telemetry, global cyber alerts, and crisis war rooms.',
    icon: Globe,
    items: [
      {
        id: 'threat-map',
        label: 'Live Threat Radar',
        shortLabel: 'Threat Radar',
        description: 'Interactive global telemetry showing live simulated attacks and targets.',
        icon: Globe,
        badge: 'LIVE',
        keywords: ['radar', 'map', 'attacks', 'threats', 'ddos', 'live', 'telemetry']
      },
      {
        id: 'alerts',
        label: 'Global Cyber Alerts',
        shortLabel: 'Alerts',
        description: 'Real-time CERT-In & CISA vulnerability advisories in plain English.',
        icon: Bell,
        badge: 'ALERT',
        keywords: ['alerts', 'cisa', 'cert-in', 'advisories', 'vulnerabilities', 'news']
      },
      {
        id: 'incident-response',
        label: 'Incident War Room',
        shortLabel: 'War Room',
        description: 'Step-by-step incident response playbook simulation to contain breaches.',
        icon: AlertOctagon,
        badge: 'DRILL',
        keywords: ['incident', 'war room', 'breach', 'containment', 'drill', 'response']
      },
      {
        id: 'help',
        label: 'Scammed? Emergency Help',
        shortLabel: 'Emergency 1930',
        description: 'Immediate fraud reporting guide, evidence saver, and official 1930 helpline.',
        icon: PhoneCall,
        badge: '1930',
        keywords: ['emergency', 'help', 'scammed', 'fraud', '1930', 'helpline', 'police', 'report']
      }
    ]
  },
  {
    id: 'resources',
    label: 'Resources & Career',
    shortLabel: 'Resources',
    description: 'Glossary, student leaderboard, career pathways, cheat sheets, and compliance.',
    icon: Compass,
    items: [
      {
        id: 'glossary',
        label: 'Ask CyberBuddy (Glossary)',
        shortLabel: 'Glossary',
        description: 'Beginner-friendly cybersecurity terminology dictionary and threat taxonomy.',
        icon: HelpCircle,
        badge: null,
        keywords: ['glossary', 'dictionary', 'terms', 'ask', 'cyberbuddy', 'search', 'definitions']
      },
      {
        id: 'careers',
        label: 'Career Roadmaps',
        shortLabel: 'Careers',
        description: 'Career roadmaps for SOC analysts, ethical hackers, forensics, and cloud security.',
        icon: Compass,
        badge: 'PATHS',
        keywords: ['careers', 'jobs', 'soc', 'pentester', 'roadmap', 'skills', 'salary']
      },
      {
        id: 'resources',
        label: 'Security Cheat Sheets',
        shortLabel: 'Cheat Sheets',
        description: 'Command-line cheat sheets, incident checklists, and best practices.',
        icon: FileText,
        badge: null,
        keywords: ['resources', 'cheatsheets', 'dfir', 'commands', 'tools', 'linux']
      },
      {
        id: 'leaderboard',
        label: 'Student Leaderboard',
        shortLabel: 'Leaderboard',
        description: 'Track your XP progress, streaks, badges, and ranking on the learner board.',
        icon: Trophy,
        badge: null,
        keywords: ['leaderboard', 'rankings', 'xp', 'scores', 'students', 'badges']
      },
      {
        id: 'compliance',
        label: 'Compliance & Standards',
        shortLabel: 'Compliance',
        description: 'Learn about SOC 2, ISO 27001, GDPR, and data protection regulations.',
        icon: FileCheck2,
        badge: 'SOC2',
        keywords: ['compliance', 'soc2', 'iso', 'gdpr', 'laws', 'privacy', 'ethics']
      }
    ]
  }
];

/**
 * Helper to find which category a view belongs to
 */
export function findCategoryForView(viewId) {
  for (const cat of navigationConfig) {
    for (const item of cat.items) {
      if (item.id === viewId) {
        return { category: cat, item };
      }
    }
  }
  return null;
}

/**
 * Flat list of all navigation items
 */
export const allNavItems = navigationConfig.flatMap(cat => cat.items);
