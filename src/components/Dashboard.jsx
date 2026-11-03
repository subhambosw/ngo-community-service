import React from 'react';
import { Shield, Zap, Award, Flame } from 'lucide-react';
import { badges } from '../data/badges';

export default function Dashboard({ userState, setActiveView, onResetProgress }) {
  const getLevel = (xp) => {
    if (xp >= 500) return { level: 4, title: 'Cyber Defender Master', next: 1000 };
    if (xp >= 300) return { level: 3, title: 'Security Specialist', next: 500 };
    if (xp >= 150) return { level: 2, title: 'Awareness Guardian', next: 300 };
    return { level: 1, title: 'Security Recruit', next: 150 };
  };

  const levelInfo = getLevel(userState.xp);
  const progressPercent = Math.min(100, Math.round((userState.xp / levelInfo.next) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header Banner (Glossy Obsidian) */}
      <div className="glass-specular rounded-3xl p-8 border border-white/15 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2.5">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-white/[0.08] text-white border border-white/20 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider">
                Level {levelInfo.level}
              </span>
              <span className="text-zinc-500 text-xs font-mono">ID: {userState.userName}</span>
            </div>
            <h1 className="text-3xl font-bold font-heading text-white tracking-tight">
              Welcome Back, <span className="text-metallic">{levelInfo.title}</span>
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-lg leading-relaxed">
              Complete simulated attack vectors and defensive challenges to elevate your clearance level.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-black/70 p-4 rounded-2xl border border-white/15 shrink-0 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]">
            <div className="text-center px-4 border-r border-zinc-800">
              <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Active Streak</p>
              <div className="flex items-center justify-center gap-1.5 text-2xl font-bold text-white font-heading">
                <Flame className="w-5 h-5 fill-white text-white" />
                {userState.streak} <span className="text-xs font-normal text-zinc-500 font-sans">Days</span>
              </div>
            </div>
            <div className="text-center px-4">
              <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Total XP</p>
              <div className="flex items-center justify-center gap-1.5 text-2xl font-bold text-white font-heading">
                <Zap className="w-5 h-5 fill-white text-white" />
                {userState.xp} <span className="text-xs font-normal text-zinc-500 font-sans">XP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Level XP Bar */}
        <div className="mt-8 space-y-2 relative z-10">
          <div className="flex justify-between text-xs font-mono text-zinc-400">
            <span>Next Clearance Level: {levelInfo.level + 1}</span>
            <span className="text-white font-semibold">{userState.xp} / {levelInfo.next} XP ({progressPercent}%)</span>
          </div>
          <div className="w-full bg-zinc-900 rounded-full h-2.5 overflow-hidden border border-white/10 p-0.5">
            <div 
              className="bg-gradient-to-r from-zinc-300 via-white to-zinc-400 h-full rounded-full transition-all duration-700 shadow-[0_0_15px_rgba(255,255,255,0.5)]" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Achievement Badges Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight">Security Credentials & Badges</h2>
            <p className="text-xs sm:text-sm text-zinc-500">Earn tactical credentials by completing interactive challenge modules.</p>
          </div>
          <span className="text-[11px] font-mono text-zinc-400 bg-zinc-900 px-3 py-1.5 rounded-full border border-white/10">
            Unlocked: {userState.unlockedBadges.length} / {badges.length}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {badges.map((b) => {
            const isUnlocked = userState.unlockedBadges.includes(b.id);
            return (
              <div
                key={b.id}
                className={`glass p-5 rounded-2xl border transition-all flex flex-col items-center text-center ${
                  isUnlocked
                    ? 'border-white/30 bg-white/[0.04] shadow-[0_10px_25px_-5px_rgba(255,255,255,0.08)]'
                    : 'border-white/5 opacity-40'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3.5 border ${
                  isUnlocked 
                    ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                    : 'bg-zinc-900 text-zinc-600 border-zinc-800'
                }`}>
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-xs mb-1 font-heading">{b.name}</h3>
                <p className="text-[11px] text-zinc-400 leading-tight mb-3.5 flex-1">{b.description}</p>
                <span className={`text-[9px] font-mono px-2.5 py-0.5 rounded-full border tracking-wider uppercase ${
                  isUnlocked ? 'bg-white text-black font-bold border-white' : 'bg-black text-zinc-600 border-zinc-800'
                }`}>
                  {isUnlocked ? 'UNLOCKED ✓' : 'LOCKED 🔒'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Launch Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          onClick={() => setActiveView('phishing')}
          className="glass p-6 rounded-2xl hover:border-white/30 cursor-pointer transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/15 flex items-center justify-center mb-4 group-hover:bg-white group-hover:text-black transition-colors">
            <Shield className="w-5 h-5 text-white group-hover:text-black" />
          </div>
          <h3 className="text-base font-bold text-white mb-1 font-heading">Phishing Attack Lab</h3>
          <p className="text-xs text-zinc-400 mb-4 leading-relaxed">Analyze spoofed headers, urgency tactics, and deceptive hyperlinks.</p>
          <span className="text-xs font-mono text-zinc-300 group-hover:text-white flex items-center gap-1">Launch Lab →</span>
        </div>

        <div 
          onClick={() => setActiveView('password')}
          className="glass p-6 rounded-2xl hover:border-white/30 cursor-pointer transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/15 flex items-center justify-center mb-4 group-hover:bg-white group-hover:text-black transition-colors">
            <Zap className="w-5 h-5 text-white group-hover:text-black" />
          </div>
          <h3 className="text-base font-bold text-white mb-1 font-heading">Password & Crack Time</h3>
          <p className="text-xs text-zinc-400 mb-4 leading-relaxed">Calculate Shannon entropy and multi-GPU cluster brute-force resistance.</p>
          <span className="text-xs font-mono text-zinc-300 group-hover:text-white flex items-center gap-1">Test Entropy →</span>
        </div>

        <div 
          onClick={() => setActiveView('quiz')}
          className="glass p-6 rounded-2xl hover:border-white/30 cursor-pointer transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/15 flex items-center justify-center mb-4 group-hover:bg-white group-hover:text-black transition-colors">
            <Award className="w-5 h-5 text-white group-hover:text-black" />
          </div>
          <h3 className="text-base font-bold text-white mb-1 font-heading">Official Certification</h3>
          <p className="text-xs text-zinc-400 mb-4 leading-relaxed">Complete the 6-topic knowledge assessment to generate a certificate.</p>
          <span className="text-xs font-mono text-zinc-300 group-hover:text-white flex items-center gap-1">Take Exam →</span>
        </div>
      </div>

    </div>
  );
}
