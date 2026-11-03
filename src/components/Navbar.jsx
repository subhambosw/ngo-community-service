import React, { useState } from 'react';
import { Shield, Zap, Flame, Menu, X, RotateCcw } from 'lucide-react';

export default function Navbar({ activeView, setActiveView, userState, onResetProgress }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'phishing', label: 'Phishing Sim' },
    { id: 'password', label: 'Password Vault' },
    { id: 'privacy', label: 'Privacy Auditor' },
    { id: 'network', label: 'Wi-Fi & Network' },
    { id: 'malware', label: 'Malware Suite' },
    { id: 'quiz', label: 'Quiz & Cert' },
    { id: 'glossary', label: 'Glossary' },
  ];

  return (
    <nav className="glass sticky top-0 z-50 border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div 
            onClick={() => setActiveView('hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="p-2.5 bg-white/[0.06] rounded-xl border border-white/20 group-hover:bg-white/[0.12] transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)]">
              <Shield className="w-6 h-6 text-white group-hover:scale-105 transition-transform" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white font-heading block">
                CYBER<span className="text-zinc-400 font-light">GUARD</span> PRO
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-zinc-500 font-mono block -mt-0.5">
                Security Intelligence
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 font-medium text-xs">
            {navItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`px-3 py-2 rounded-xl transition-all ${
                    isActive
                      ? 'bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* User Gamification Stats Badge (Monochrome Glossy Capsule) */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 border border-white/15 text-xs font-semibold shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]">
              <div className="flex items-center gap-1.5 text-zinc-300">
                <Flame className="w-3.5 h-3.5 fill-zinc-300 text-zinc-300" />
                <span className="font-mono text-[11px]">{userState.streak}d Streak</span>
              </div>
              <div className="w-px h-3 bg-zinc-800 mx-1" />
              <div className="flex items-center gap-1.5 text-white">
                <Zap className="w-3.5 h-3.5 fill-white text-white" />
                <span className="font-mono text-[11px]">{userState.xp} XP</span>
              </div>
            </div>

            <button
              onClick={onResetProgress}
              title="Reset Saved Progress"
              className="p-2 text-zinc-500 hover:text-white hover:bg-white/[0.08] rounded-xl transition-colors border border-transparent hover:border-white/10"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-zinc-900 text-zinc-300 hover:text-white border border-white/10"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-black/95 border-b border-white/10 px-4 pt-3 pb-6 space-y-2 backdrop-blur-2xl">
          <div className="flex items-center justify-between py-2 border-b border-zinc-800/80 mb-2">
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">Your Progress:</span>
            <div className="flex items-center gap-3 text-xs font-semibold font-mono">
              <span className="text-zinc-300 flex items-center gap-1"><Flame className="w-3 h-3 fill-zinc-300"/> {userState.streak} Days</span>
              <span className="text-white flex items-center gap-1"><Zap className="w-3 h-3 fill-white"/> {userState.xp} XP</span>
            </div>
          </div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveView(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-xl transition-all font-medium text-sm ${
                activeView === item.id
                  ? 'bg-white text-black font-bold'
                  : 'text-zinc-400 hover:bg-white/[0.06] hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
