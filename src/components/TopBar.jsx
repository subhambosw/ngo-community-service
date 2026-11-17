import React from 'react';
import { Menu, RotateCcw } from 'lucide-react';

export default function TopBar({ activeView, setMobileOpen, userState, onResetProgress }) {
  const getBreadcrumb = () => {
    switch (activeView) {
      case 'home': return 'home';
      case 'overview': return 'overview';
      case 'alerts': return 'cyber-threat-alerts';
      case 'help': return 'scammed-emergency-help';
      case 'practice': return 'practice-and-games';
      case 'health': return 'security-health-check';
      case 'careers': return 'career-roadmaps';
      case 'threat-map': return 'global-threat-radar';
      case 'incident-response': return 'incident-war-room';
      case 'compliance': return 'compliance-soc2';
      case 'leaderboard': return 'global-leaderboard';
      case 'resources': return 'dfir-cheat-sheets';
      case 'lessons': return 'lessons';
      case 'password': return 'password-lab';
      case 'phishing': return 'phishing-spotter';
      case 'privacy': return 'privacy-auditor';
      case 'network': return 'network-defense';
      case 'malware': return 'malware-suite';
      case 'glossary': return 'ask-cyberbuddy';
      case 'quiz': return 'certification';
      default: return activeView;
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#000000]/80 backdrop-blur-2xl border-b border-white/15 flex items-center justify-between px-6 sm:px-8 shadow-[0_10px_30px_rgba(0,0,0,0.8),inset_0_-1px_0_rgba(255,255,255,0.08)]">
      
      {/* Left: Learning Workspace + Terminal path */}
      <div className="flex items-center gap-4">
        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-1.5 rounded-md text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-700 shadow-sm"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <h1 className="text-sm font-bold text-white tracking-wide hidden sm:block drop-shadow-sm">
            Learning Workspace
          </h1>
          <span className="text-xs font-mono text-zinc-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
            user@cyberbuddy:~/{getBreadcrumb()}
          </span>
        </div>
      </div>

      {/* Right: User Profile */}
      <div className="flex items-center gap-4">
        <button
          onClick={onResetProgress}
          title="Reset Progress"
          className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/[0.1] rounded-md transition-colors border border-transparent hover:border-white/15"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-white leading-tight">
              {userState.userName || 'N. Aggarwal'}
            </p>
            <p className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase leading-tight mt-0.5">
              LEVEL 04
            </p>
          </div>

          <div className="w-8 h-8 rounded-lg bg-gradient-to-b from-white/15 to-white/5 border border-white/25 flex items-center justify-center text-xs font-bold text-white font-mono shadow-[0_0_15px_rgba(255,255,255,0.15),inset_0_1px_0_rgba(255,255,255,0.3)]">
            <span>{userState.userInitials || 'NA'}</span>
          </div>
        </div>
      </div>

    </header>
  );
}
