import React from 'react';
import { 
  Shield, 
  Menu, 
  RotateCcw, 
  PanelLeftClose, 
  PanelLeft, 
  PhoneCall, 
  Search,
  Sparkles
} from 'lucide-react';
import MegaMenu from './MegaMenu';

export default function NavbarMega({ 
  activeView, 
  setActiveView, 
  setMobileOpen, 
  isSidebarCollapsed, 
  onToggleSidebar, 
  userState, 
  onResetProgress 
}) {
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
    <header className="sticky top-0 z-30 h-16 bg-[#000000]/85 backdrop-blur-2xl border-b border-white/15 flex items-center justify-between px-4 sm:px-6 shadow-[0_10px_30px_rgba(0,0,0,0.8),inset_0_-1px_0_rgba(255,255,255,0.08)]">
      
      {/* Left: Mobile trigger, Brand/Toggle & Breadcrumb */}
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Trigger */}
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation drawer"
          className="lg:hidden p-2 rounded-xl text-zinc-400 hover:text-white bg-white/5 border border-white/10 shadow-sm cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Brand / Logo (always visible on mobile or when sidebar is collapsed) */}
        <div 
          onClick={() => setActiveView('home')}
          className={`flex items-center gap-2.5 cursor-pointer group ${!isSidebarCollapsed ? 'lg:hidden' : 'flex'}`}
        >
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.4)]">
            <Shield className="w-4 h-4 text-black fill-black" />
          </div>
          <span className="font-heading font-black tracking-wider text-white text-base leading-none hidden sm:block">
            CYBERBUDDY
          </span>
        </div>

        {/* Desktop Sidebar Toggle Button */}
        <button
          type="button"
          onClick={onToggleSidebar}
          title={isSidebarCollapsed ? "Expand Sidebar (Accordion)" : "Collapse Sidebar (Full Width Content)"}
          className="hidden lg:flex items-center gap-1.5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors border border-transparent hover:border-white/15 cursor-pointer"
        >
          {isSidebarCollapsed ? (
            <PanelLeft className="w-4 h-4 text-zinc-300" />
          ) : (
            <PanelLeftClose className="w-4 h-4 text-zinc-400" />
          )}
        </button>

        {/* Terminal Breadcrumb Chip */}
        <div className="hidden xl:flex items-center gap-2">
          <span className="text-xs font-mono text-zinc-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
            user@cyberbuddy:~/{getBreadcrumb()}
          </span>
        </div>
      </div>

      {/* Center: Desktop Mega Menu Navigation */}
      <div className="hidden lg:flex items-center justify-center">
        <MegaMenu activeView={activeView} setActiveView={setActiveView} />
      </div>

      {/* Right: Emergency SOS, User Profile & Actions */}
      <div className="flex items-center gap-3">
        
        {/* Quick Emergency Help Pill */}
        <button
          type="button"
          onClick={() => setActiveView('help')}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-950/40 hover:bg-red-900/50 border border-red-500/30 text-xs font-mono text-red-200 hover:text-white transition-all cursor-pointer shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
          <PhoneCall className="w-3 h-3 text-red-400" />
          <span>SOS: 1930</span>
        </button>

        {/* Reset Progress Button */}
        <button
          type="button"
          onClick={onResetProgress}
          title="Reset Progress"
          className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors border border-transparent hover:border-white/15 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* User Profile Capsule */}
        <div className="flex items-center gap-2.5 pl-1">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-white leading-tight">
              {userState.userName || 'N. Aggarwal'}
            </p>
            <p className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase leading-tight mt-0.5">
              {userState.xp || 460} XP &bull; LVL 04
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
