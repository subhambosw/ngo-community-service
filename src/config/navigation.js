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
 * Single source of truth for Mega Menu, Sidebar Accordion, and Mobile Navigation.
 */
export const navigationConfig = [
  {
    id: 'operations',
    label: 'Operations & Intel',
    shortLabel: 'Operations',
    description: 'Real-time threat monitoring, live radars, and emergency crisis triage.',
    icon: Globe,
    columns: [
      {
        heading: 'Threat Monitoring',
        items: [
          {
            id: 'overview',
            label: 'Main Terminal',
            description: 'Central security dashboard & live operational readiness posture.',
            icon: LayoutDashboard,
            badge: null
          },
          {
            id: 'threat-map',
            label: 'Live Threat Radar',
            description: 'Interactive global telemetry tracking ongoing state-sponsored & DDoS attacks.',
            icon: Globe,
            badge: 'LIVE'
          },
          {
            id: 'alerts',
            label: 'Global Cyber Alerts',
            description: 'Official CERT-In & CISA vulnerability advisories with plain-English steps.',
            icon: Bell,
            badge: 'ALERT'
          }
        ]
      },
      {
        heading: 'Crisis Response',
        items: [
          {
            id: 'incident-response',
            label: 'Incident War Room',
            description: 'Interactive incident response simulation with containment playbooks.',
            icon: AlertOctagon,
            badge: 'DRILL'
          },
          {
            id: 'help',
            label: 'Scammed? Emergency',
            description: 'Immediate 1930 helpline dialer, fraud reporting & evidence preserver.',
            icon: PhoneCall,
            badge: '1930'
          }
        ]
      }
    ]
  },
  {
    id: 'labs',
    label: 'Labs & Simulations',
    shortLabel: 'Labs',
    description: 'Hands-on forensic labs, cryptographic puzzles, and malware defense.',
    icon: Shield,
    columns: [
      {
        heading: 'Practice & Puzzles',
        items: [
          {
            id: 'practice',
            label: 'Practice & Games',
            description: 'Spot-the-phish, domain link inspector, decision scenarios & Caesar cipher.',
            icon: Gamepad2,
            badge: 'GAMES'
          },
          {
            id: 'health',
            label: 'Security Health Check',
            description: '10-question everyday habit check with prioritized hardening to-do list.',
            icon: ShieldCheck,
            badge: 'AUDIT'
          }
        ]
      },
      {
        heading: 'Forensic Labs',
        items: [
          {
            id: 'password',
            label: 'Password & Breach Lab',
            description: 'Entropy calculator, crack-time estimator & HaveIBeenPwned leak checker.',
            icon: KeyRound,
            badge: null
          },
          {
            id: 'phishing',
            label: 'Phishing Spotter',
            description: 'Interactive sandbox analyzing real-world deceptive emails and lookalikes.',
            icon: AlertTriangle,
            badge: null
          }
        ]
      },
      {
        heading: 'Defense Suites',
        items: [
          {
            id: 'network',
            label: 'Network Defense',
            description: 'Wi-Fi router hardening, MITM simulation & public network protection.',
            icon: Radio,
            badge: null
          },
          {
            id: 'malware',
            label: 'Malware Suite',
            description: 'Ransomware behavioral sandbox, trojan detector & endpoint scanner.',
            icon: FileCode,
            badge: null
          },
          {
            id: 'privacy',
            label: 'Privacy Auditor',
            description: 'EXIF metadata inspection, OSINT footprint & social engineering defense.',
            icon: Shield,
            badge: null
          }
        ]
      }
    ]
  },
  {
    id: 'academy',
    label: 'Academy & Careers',
    shortLabel: 'Academy',
    description: 'Curriculum paths, certification exam, and industry career roadmaps.',
    icon: BookOpen,
    columns: [
      {
        heading: 'Curriculum & Certification',
        items: [
          {
            id: 'lessons',
            label: 'Curriculum Tracks',
            description: 'Modular foundations: internet protocols, firewalls, Linux CLI & salts.',
            icon: BookOpen,
            badge: null
          },
          {
            id: 'quiz',
            label: 'Certification Exam',
            description: 'Comprehensive cybersecurity knowledge exam with printable certificate.',
            icon: Award,
            badge: 'EXAM'
          },
          {
            id: 'glossary',
            label: 'Ask CyberBuddy',
            description: 'Interactive cybersecurity terminology dictionary and threat taxonomy.',
            icon: HelpCircle,
            badge: null
          }
        ]
      },
      {
        heading: 'Career Roadmaps',
        items: [
          {
            id: 'careers',
            label: 'Career Roadmaps',
            description: '6 industry specializations (SOC Analyst, Pentester, Forensics, Cloud Sec).',
            icon: Compass,
            badge: 'PATHS'
          },
          {
            id: 'resources',
            label: 'DFIR Cheat Sheets',
            description: 'Quick-reference commands, investigation checklists & security toolkits.',
            icon: FileText,
            badge: null
          }
        ]
      }
    ]
  },
  {
    id: 'enterprise',
    label: 'Enterprise & Trust',
    shortLabel: 'Enterprise',
    description: 'Governance standards, SOC 2 controls, and global learner rankings.',
    icon: FileCheck2,
    columns: [
      {
        heading: 'Governance & Compliance',
        items: [
          {
            id: 'compliance',
            label: 'Compliance & SOC 2',
            description: 'SOC 2 Type II, ISO 27001, HIPAA & GDPR security framework audits.',
            icon: FileCheck2,
            badge: 'SOC2'
          }
        ]
      },
      {
        heading: 'Community & Portal',
        items: [
          {
            id: 'leaderboard',
            label: 'Global Leaderboard',
            description: 'Top student XP rankings, streak achievements & defense badges.',
            icon: Trophy,
            badge: null
          },
          {
            id: 'home',
            label: 'Codédex Welcome Screen',
            description: 'Retro 8-bit adventurer portal and interactive onboarding gateway.',
            icon: Home,
            badge: 'RETRO'
          }
        ]
      }
    ]
  }
];

/**
 * Helper to find which category a view belongs to
 */
export function findCategoryForView(viewId) {
  for (const cat of navigationConfig) {
    for (const col of cat.columns) {
      for (const item of col.items) {
        if (item.id === viewId) {
          return { category: cat, column: col, item };
        }
      }
    }
  }
  return null;
}

/**
 * Flat list of all navigation items
 */
export const allNavItems = navigationConfig.flatMap(cat =>
  cat.columns.flatMap(col => col.items)
);
