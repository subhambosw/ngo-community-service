import React from 'react';
import { 
  Shield, 
  LayoutDashboard, 
  BookOpen, 
  KeyRound, 
  AlertTriangle, 
  HelpCircle, 
  Radio, 
  Award,
  X,
  Home,
  Sparkles,
  FileCode
} from 'lucide-react';

export default function Sidebar({ activeView, setActiveView, mobileOpen, setMobileOpen, userState }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'lessons', label: 'Lessons', icon: BookOpen },
    { id: 'password', label: 'Password check', icon: KeyRound },
    { id: 'phishing', label: 'Phishing spotter', icon: AlertTriangle },
    { id: 'privacy', label: 'Privacy auditor', icon: Shield },
    { id: 'network', label: 'Network defense', icon: Radio },
    { id: 'malware', label: 'Malware suite', icon: FileCode },
    { id: 'glossary', label: 'Ask CyberBuddy', icon: HelpCircle },
    { id: 'quiz', label: 'Certification', icon: Award },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/85 z-40 lg:hidden backdrop-blur-md"
        />
      )}

      {/* Sidebar Container (Frosted Obsidian Glass) */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#000000]/80 backdrop-blur-2xl border-r border-white/15 flex flex-col justify-between p-5 transition-transform duration-300 shadow-[15px_0_50px_rgba(0,0,0,0.9),inset_-1px_0_0_rgba(255,255,255,0.06)]
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        
        {/* Top Section */}
        <div className="space-y-7">
          
          {/* Brand Logo (Matching Reference: White Square with Shield + CYBERBUDDY) */}
          <div className="flex items-center justify-between">
            <div 
              onClick={() => { setActiveView('home'); setMobileOpen(false); }}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(255,255,255,0.5),inset_0_1px_1px_#ffffff]">
                <Shield className="w-5 h-5 text-black fill-black" />
              </div>
              <span className="font-heading font-black tracking-wider text-white text-lg drop-shadow-[0_2px_8px_rgba(255,255,255,0.2)]">
                CYBERBUDDY
              </span>
            </div>

            {/* Mobile Close Button */}
            <button 
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Section */}
          <div className="space-y-4">
            <p className="text-[10px] font-mono tracking-[0.2em] text-zinc-400 uppercase px-3 font-semibold">
              MAIN TERMINAL
            </p>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveView(item.id);
                      setMobileOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all ${
                      isActive
                        ? 'btn-glossy font-bold !shadow-[0_0_25px_rgba(255,255,255,0.4),inset_0_1px_0_#ffffff]'
                        : 'text-zinc-400 hover:text-white hover:bg-white/[0.08] hover:border-white/10'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-black' : 'text-zinc-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

        </div>

        {/* Bottom Section: Weekly Goal Card (Translucent Glass Box) */}
        <div className="pt-4 border-t border-white/15">
          <div className="p-4 rounded-xl bg-gradient-to-b from-white/[0.08] to-black/80 backdrop-blur-xl border border-white/15 space-y-3 shadow-[0_10px_25px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.3)]">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-white">Weekly goal</span>
              <span className="text-zinc-300 font-mono">3 / 5</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-black/60 border border-white/10 h-1.5 rounded-full overflow-hidden p-[1px]">
              <div className="bg-gradient-to-r from-zinc-300 to-white h-full rounded-full w-[60%] shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            </div>

            <p className="text-[11px] text-zinc-400 leading-snug">
              Two more sessions to keep your streak.
            </p>
          </div>
        </div>

      </aside>
    </>
  );
}
