import React, { useState } from 'react';
import { Shield, Sparkles, ChevronRight, Play, Award, Terminal, ArrowRight, RefreshCw, Zap } from 'lucide-react';

export default function HomeWelcome({ setActiveView, userState, onAwardXP }) {
  // Available retro pixel avatars
  const avatars = [
    {
      id: 'codedex',
      name: 'Codédex Adventurer',
      role: 'Cyber Novice',
      src: '/codedex-avatar.png',
      tag: 'ORIGINAL RPG',
      pixelated: true
    },
    {
      id: 'agent',
      name: 'Cyberpunk Operative',
      role: 'Threat Hunter',
      src: '/cyber-pixel-agent.jpg',
      tag: 'ELITE HACKER',
      pixelated: false
    }
  ];

  const [activeAvatarIndex, setActiveAvatarIndex] = useState(0);
  const currentAvatar = avatars[activeAvatarIndex];

  // Synthesize an authentic 8-bit retro arcade chime on click
  const playArcadeChime = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      // Note 1: C5
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'square';
      osc1.frequency.setValueAtTime(523.25, ctx.currentTime);
      gain1.gain.setValueAtTime(0.12, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start();
      osc1.stop(ctx.currentTime + 0.12);

      // Note 2: E5
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'square';
      osc2.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
      gain2.gain.setValueAtTime(0.12, ctx.currentTime + 0.1);
      gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.22);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(ctx.currentTime + 0.1);
      osc2.stop(ctx.currentTime + 0.22);

      // Note 3: G5
      const osc3 = ctx.createOscillator();
      const gain3 = ctx.createGain();
      osc3.type = 'square';
      osc3.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2);
      gain3.gain.setValueAtTime(0.14, ctx.currentTime + 0.2);
      gain3.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
      osc3.connect(gain3);
      gain3.connect(ctx.destination);
      osc3.start(ctx.currentTime + 0.2);
      osc3.stop(ctx.currentTime + 0.35);
    } catch {
      // Audio autoplay gracefully handled
    }
  };

  const handleStart = () => {
    playArcadeChime();
    // Give a 150ms tactile feel before switching views
    setTimeout(() => {
      setActiveView('overview');
    }, 150);
  };

  const cycleAvatar = () => {
    setActiveAvatarIndex((prev) => (prev + 1) % avatars.length);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8 relative">
      
      {/* Ambient background glow behind the card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[400px] bg-gradient-to-r from-blue-600/10 via-cyan-500/15 to-white/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Reference Card Container */}
      <div className="relative z-10 w-full max-w-[820px] bg-[#0b0f19]/90 border border-[#1e293b] hover:border-[#334155] rounded-2xl sm:rounded-3xl p-8 sm:p-14 text-center shadow-[0_30px_70px_rgba(0,0,0,0.95),inset_0_1px_1.5px_rgba(255,255,255,0.25)] backdrop-blur-2xl transition-all duration-300">
        
        {/* Top-Right Avatar Switcher Badge */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
          <button
            onClick={cycleAvatar}
            title="Switch Avatar"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-zinc-400 hover:text-white transition-all shadow-sm"
          >
            <RefreshCw className="w-3 h-3" />
            <span className="hidden sm:inline">Avatar: {currentAvatar.name}</span>
          </button>
        </div>

        {/* 1. Pixel Art Avatar Sprite (Centered with Bobbing Idle Animation) */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div 
            onClick={cycleAvatar}
            className="cursor-pointer group relative flex flex-col items-center"
            title="Click to cycle avatar"
          >
            {/* Soft ground shadow under sprite */}
            <div className="w-16 h-4 bg-black/60 rounded-full blur-sm mx-auto translate-y-24 group-hover:scale-110 transition-transform" />

            <div className="animate-pixel-bob select-none">
              {currentAvatar.id === 'codedex' ? (
                <img
                  src={currentAvatar.src}
                  alt={currentAvatar.name}
                  style={{ imageRendering: 'pixelated' }}
                  className="w-20 sm:w-24 h-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] transition-transform group-hover:scale-110"
                />
              ) : (
                <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-cyan-400/40 shadow-[0_0_25px_rgba(6,182,212,0.4)]">
                  <img
                    src={currentAvatar.src}
                    alt={currentAvatar.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              )}
            </div>

            {/* Subtle avatar hint badge */}
            <span className="mt-3 text-[10px] font-mono tracking-widest text-zinc-500 uppercase opacity-0 group-hover:opacity-100 transition-opacity">
              CLICK TO SWITCH
            </span>
          </div>
        </div>

        {/* 2. Headline in Retro Pixel Font (Exact Codédex Style) */}
        <h1 className="font-pixel text-xl sm:text-3xl md:text-4xl text-white tracking-wider leading-relaxed sm:leading-loose drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
          Welcome to CyberBuddy!
        </h1>

        {/* 3. Subtitle (Exact Codédex Phrasing adapted for CyberBuddy) */}
        <p className="text-sm sm:text-base text-zinc-300 mt-4 sm:mt-5 max-w-lg mx-auto leading-relaxed font-sans font-normal">
          Your cybersecurity journey awaits-but first let's find something to learn.
        </p>

        {/* 4. Action Button (Tactile 3D Pixel Arcade Button matching reference) */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleStart}
            className="btn-arcade-blue px-8 py-3.5 sm:px-10 sm:py-4 text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 group font-sans cursor-pointer active:scale-95"
          >
            <span>Get Started</span>
          </button>
        </div>

        {/* 5. Quick Route Preview Badges */}
        <div className="mt-10 sm:mt-12 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-3">
          <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mr-1">
            JUMP DIRECTLY TO:
          </span>
          <button
            onClick={() => { playArcadeChime(); setActiveView('phishing'); }}
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all hover:-translate-y-0.5"
          >
            🎣 Phishing Spotter
          </button>
          <button
            onClick={() => { playArcadeChime(); setActiveView('password'); }}
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all hover:-translate-y-0.5"
          >
            🔑 Password Entropy
          </button>
          <button
            onClick={() => { playArcadeChime(); setActiveView('quiz'); }}
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all hover:-translate-y-0.5"
          >
            🏆 Certification
          </button>
        </div>

      </div>

      {/* Footer System Status */}
      <div className="mt-6 flex items-center gap-3 text-xs font-mono text-zinc-500">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          TERMINAL ONLINE
        </span>
        <span>&middot;</span>
        <span>SECURITY OS v2.4</span>
        <span>&middot;</span>
        <span className="text-zinc-400 font-semibold">{userState.xp || 460} XP SYNCED</span>
      </div>

    </div>
  );
}
