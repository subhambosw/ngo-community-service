import React from 'react';
import { Shield, ChevronRight, Lock, Eye, AlertTriangle, Wifi, FileCode, Award, CheckCircle2, Zap } from 'lucide-react';

export default function Hero({ setActiveView }) {
  const modules = [
    { id: 'phishing', icon: AlertTriangle, title: 'Phishing Simulator', desc: 'Inspect deceptive emails, uncover headers, spot malicious links.', badge: 'Interactive Sim' },
    { id: 'password', icon: Lock, title: 'Password & MFA Vault', desc: 'Entropy analysis, crack-time estimates, 2FA & passkey sandbox.', badge: 'Security Tool' },
    { id: 'privacy', icon: Shield, title: 'Privacy Auditor', desc: 'Audit permissions, social media footprints, and data breach risks.', badge: 'Footprint Audit' },
    { id: 'network', icon: Wifi, title: 'Wi-Fi & Network Safety', desc: 'Public Wi-Fi risks, HTTPS packet inspection, VPN explainer.', badge: 'Network Defense' },
    { id: 'malware', icon: FileCode, title: 'Malware & Ransomware', desc: 'Identify executable masks (.pdf.exe) and emergency response.', badge: 'Threat Defense' },
    { id: 'quiz', icon: Award, title: 'Certification Quiz', desc: 'Test knowledge across all modules & generate an official certificate.', badge: 'Certification' },
  ];

  return (
    <div className="space-y-24 pt-12 pb-24">
      
      {/* Hero Header */}
      <div className="text-center max-w-4xl mx-auto space-y-8 px-4">
        
        {/* Monochromatic Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/60 border border-white/20 text-zinc-300 text-xs font-mono tracking-wider uppercase shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-70"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          Next-Gen Interactive Security Intelligence
        </div>
        
        {/* Metallic Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight leading-[1.08]">
          <span className="text-white block">Defend Yourself & Data in a</span>
          <span className="bg-gradient-to-b from-white via-zinc-200 to-zinc-600 bg-clip-text text-transparent">
            Threat-Filled Digital World
          </span>
        </h1>
        
        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-normal">
          Master digital defense through interactive phishing simulations, live cryptographic entropy meters, permission auditing, and verifiable certification.
        </p>
        
        {/* Glossy Button Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button 
            onClick={() => setActiveView('phishing')}
            className="w-full sm:w-auto px-8 py-4 btn-glossy rounded-2xl text-sm flex items-center justify-center gap-2"
          >
            Start Phishing Simulator <ChevronRight className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setActiveView('dashboard')}
            className="w-full sm:w-auto px-8 py-4 btn-obsidian rounded-2xl text-sm flex items-center justify-center gap-2.5 group"
          >
            <Shield className="w-4 h-4 text-zinc-300 group-hover:text-white" /> View Dashboard & XP
          </button>
        </div>
      </div>

      {/* Live Threat Ticker Banner (High-Gloss Obsidian Container) */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="glass-specular rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/[0.08] rounded-xl border border-white/20 shrink-0 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)]">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-mono tracking-widest text-zinc-500">Threat Intelligence Feed</p>
              <p className="text-xs sm:text-sm font-semibold text-white">Over 3.4 billion phishing emails sent globally every 24 hours.</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-xs text-zinc-400 font-mono shrink-0">
            <div><span className="text-white font-bold">90%</span> of breaches start with phishing</div>
            <div className="hidden sm:block"><span className="text-white font-bold">81%</span> of hacks use weak passwords</div>
          </div>
        </div>
      </div>

      {/* Feature Grid Section */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">Interactive Defense Modules</h2>
          <p className="text-zinc-500 text-sm">Select any module below to initiate hands-on simulation training.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((m) => (
            <div
              key={m.id}
              onClick={() => setActiveView(m.id)}
              className="glass p-7 rounded-3xl hover:border-white/30 transition-all duration-300 group cursor-pointer hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.1)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 bg-white/[0.06] rounded-2xl border border-white/15 group-hover:bg-white group-hover:text-black transition-all shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]">
                    <m.icon className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/[0.04] text-zinc-400 border border-white/10">
                    {m.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-zinc-200 transition-colors">
                  {m.title}
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {m.desc}
                </p>
              </div>

              <div className="flex items-center text-xs font-semibold text-zinc-300 group-hover:text-white gap-1.5 font-mono">
                LAUNCH SIMULATION <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
