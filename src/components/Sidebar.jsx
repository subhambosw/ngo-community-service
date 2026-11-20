import React from 'react';
import { 
  Shield, 
  X, 
  PhoneCall
} from 'lucide-react';
import { navigationConfig } from '../config/navigation';

export default function Sidebar({ activeView, setActiveView, mobileOpen, setMobileOpen, userState }) {
  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/85 z-40 lg:hidden backdrop-blur-md"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#000000]/95 backdrop-blur-2xl border-r border-white/15 flex flex-col justify-between transition-transform duration-300 shadow-[15px_0_50px_rgba(0,0,0,0.9),inset_-1px_0_0_rgba(255,255,255,0.06)]
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        
        {/* Top Header & Brand Logo */}
        <div className="p-5 border-b border-white/10 shrink-0">
          <div className="flex items-center justify-between">
            <button 
              type="button"
              onClick={() => { setActiveView('home'); setMobileOpen(false); }}
              className="flex items-center gap-3 cursor-pointer group text-left"
            >
              <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(255,255,255,0.5),inset_0_1px_1px_#ffffff]">
                <Shield className="w-5 h-5 text-black fill-black" />
              </div>
              <span className="font-heading font-black tracking-wider text-white text-lg drop-shadow-[0_2px_8px_rgba(255,255,255,0.2)]">
                CYBERBUDDY
              </span>
            </button>

            {/* Mobile Close Button */}
            <button 
              type="button"
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
          {navigationConfig.map((sec) => (
            <div key={sec.id} className="space-y-1.5">
              <p className="text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase px-2 font-semibold">
                {sec.label}
              </p>

              <nav className="space-y-1">
                {sec.items.map((item) => {
                  const isActive = activeView === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveView(item.id);
                        setMobileOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        isActive
                          ? 'btn-glossy font-bold !shadow-[0_0_20px_rgba(255,255,255,0.4),inset_0_1px_0_#ffffff]'
                          : 'text-zinc-400 hover:text-white hover:bg-white/[0.08] hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-black' : 'text-zinc-400'}`} />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold shrink-0 ml-1.5 ${
                          isActive 
                            ? 'bg-black text-white' 
                            : item.badge === '1930' || item.badge === 'ALERT'
                              ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                              : 'bg-white/10 text-zinc-300'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* Bottom Section: Readiness Card */}
        <div className="p-4 border-t border-white/15 shrink-0">
          <div className="p-3.5 rounded-xl bg-gradient-to-b from-white/[0.08] to-black/80 backdrop-blur-xl border border-white/15 space-y-2.5 shadow-[0_10px_25px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.3)]">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-white">Security Readiness</span>
              <span className="text-zinc-300 font-mono">{userState?.xp || 460} XP</span>
            </div>
            
            <div className="w-full bg-black/60 border border-white/10 h-1.5 rounded-full overflow-hidden p-[1px]">
              <div className="bg-gradient-to-r from-zinc-300 to-white h-full rounded-full w-[80%] shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            </div>

            <p className="text-[10px] font-mono text-zinc-400 leading-snug">
              OPERATIONAL &bull; LEVEL 04
            </p>
          </div>
        </div>

      </aside>
    </>
  );
}
