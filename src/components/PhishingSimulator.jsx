import React, { useState } from 'react';
import { Shield, CheckCircle2, Info, Mail, ShieldAlert, Zap } from 'lucide-react';
import { phishingEmails } from '../data/phishingEmails';

export default function PhishingSimulator({ onCompleteChallenge }) {
  const [activeEmailId, setActiveEmailId] = useState(phishingEmails[0].id);
  const [foundFlags, setFoundFlags] = useState([]);
  const [selectedFlagInfo, setSelectedFlagInfo] = useState(null);

  const currentEmail = phishingEmails.find((e) => e.id === activeEmailId) || phishingEmails[0];

  const handleFlagClick = (flagObj) => {
    if (!flagObj) return;
    if (!foundFlags.includes(flagObj.id)) {
      const updated = [...foundFlags, flagObj.id];
      setFoundFlags(updated);
      setSelectedFlagInfo(flagObj);

      // Award XP when all flags in current email are found
      if (updated.length === currentEmail.flags.length) {
        onCompleteChallenge(50, 'phishing_spotter');
      }
    } else {
      setSelectedFlagInfo(flagObj);
    }
  };

  const handleEmailSwitch = (id) => {
    setActiveEmailId(id);
    setFoundFlags([]);
    setSelectedFlagInfo(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Module Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono tracking-wider uppercase mb-1">
            <Shield className="w-3.5 h-3.5 text-white" /> Forensic Simulation Module
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight">AI Phishing Threat Simulator</h1>
          <p className="text-zinc-500 text-xs sm:text-sm mt-1">
            Analyze deceptive communication patterns. Click suspicious elements (Sender, Urgency, Action Link) to register red flags.
          </p>
        </div>

        {/* Email Selector Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {phishingEmails.map((e) => {
            const isSelected = activeEmailId === e.id;
            return (
              <button
                key={e.id}
                onClick={() => handleEmailSwitch(e.id)}
                className={`px-3.5 py-2 rounded-xl font-medium text-xs whitespace-nowrap transition-all flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-white text-black font-bold border-white shadow-[0_0_15px_rgba(255,255,255,0.25)]'
                    : 'bg-zinc-900/80 text-zinc-400 border-white/10 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                {e.title}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Email Mock Client (Glossy Obsidian) */}
        <div className="lg:col-span-2 glass-specular rounded-3xl border border-white/15 overflow-hidden shadow-2xl">
          {/* Email Window Topbar */}
          <div className="bg-black/90 px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
              <span className="text-[11px] font-mono text-zinc-500 ml-2">Inbox &mdash; Threat Incident Inspector</span>
            </div>
            <div className="text-xs font-mono text-white flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 fill-white" /> Flags Found: {foundFlags.length} / {currentEmail.flags.length}
            </div>
          </div>

          {/* Email Body */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Headers */}
            <div className="space-y-4 pb-6 border-b border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono block mb-1">From:</span>
                  <button 
                    onClick={() => handleFlagClick(currentEmail.flags.find(f => f.id === 'sender'))}
                    className={`font-mono text-xs px-3 py-1.5 rounded-xl border transition-all text-left ${
                      foundFlags.includes('sender')
                        ? 'bg-white text-black font-bold border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                        : 'text-zinc-300 border-dashed border-white/20 hover:bg-white/[0.06] hover:border-white/40'
                    }`}
                  >
                    {currentEmail.senderName} &lt;{currentEmail.senderEmail}&gt;
                  </button>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono block mb-1">Date:</span>
                  <span className="text-zinc-400 text-xs font-mono">{currentEmail.date}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono block mb-1">Subject:</span>
                <button
                  onClick={() => handleFlagClick(currentEmail.flags.find(f => f.id === 'urgency'))}
                  className={`font-semibold text-sm px-3 py-1.5 rounded-xl border transition-all text-left w-full sm:w-auto ${
                    foundFlags.includes('urgency')
                      ? 'bg-white text-black font-bold border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                      : 'text-zinc-200 border-dashed border-white/20 hover:bg-white/[0.06] hover:border-white/40'
                  }`}
                >
                  {currentEmail.subject}
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4 text-zinc-300 text-sm leading-relaxed">
              <p>{currentEmail.bodyIntro}</p>
              <p>{currentEmail.bodyWarning}</p>

              {/* Action Button & Hover URL */}
              <div className="py-6 flex flex-col items-center justify-center space-y-3">
                <button
                  onClick={() => handleFlagClick(currentEmail.flags.find(f => f.id === 'link'))}
                  className={`w-full sm:w-auto px-8 py-3.5 font-bold text-xs uppercase tracking-wider rounded-xl transition-all ${
                    foundFlags.includes('link')
                      ? 'bg-white text-black border border-white shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                      : 'btn-glossy'
                  }`}
                >
                  {currentEmail.actionButtonText}
                </button>
                <p className={`text-xs font-mono break-all px-3 py-1.5 rounded-xl border ${
                  foundFlags.includes('link') 
                    ? 'bg-white/[0.08] text-white border-white/40 shadow-[0_0_10px_rgba(255,255,255,0.15)]' 
                    : 'bg-black/80 text-zinc-400 border-white/10'
                }`}>
                  🔍 Inspected Destination: <span className="underline">{currentEmail.hoverUrl}</span>
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Sidebar Analysis & Forensic Feedback */}
        <div className="space-y-6">
          
          {/* Progress Card */}
          <div className="glass p-6 rounded-3xl border border-white/15 space-y-4">
            <h3 className="font-bold text-white text-sm font-heading flex items-center justify-between">
              <span>Threat Indicator Progress</span>
              <span className="text-[11px] font-mono text-zinc-400 bg-white/[0.06] px-2.5 py-1 rounded-full border border-white/10">
                {foundFlags.length} / {currentEmail.flags.length}
              </span>
            </h3>

            <div className="w-full bg-zinc-900 rounded-full h-2 overflow-hidden border border-white/10">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(255,255,255,0.6)]" 
                style={{ width: `${(foundFlags.length / currentEmail.flags.length) * 100}%` }}
              />
            </div>

            <div className="space-y-2">
              {currentEmail.flags.map((flag) => {
                const isFound = foundFlags.includes(flag.id);
                return (
                  <div 
                    key={flag.id}
                    onClick={() => isFound && setSelectedFlagInfo(flag)}
                    className={`p-3 rounded-xl border text-xs font-mono flex items-center justify-between cursor-pointer transition-all ${
                      isFound 
                        ? 'bg-white/[0.08] border-white/30 text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]' 
                        : 'bg-black/50 border-white/5 text-zinc-600'
                    }`}
                  >
                    <span>{flag.label}</span>
                    {isFound ? <CheckCircle2 className="w-4 h-4 text-white" /> : <span className="text-[10px]">CLICK TO REVEAL</span>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Flag Explanation Card */}
          {selectedFlagInfo ? (
            <div className="glass-specular p-6 rounded-3xl border border-white/30 space-y-3 animate-fade-in shadow-[0_0_30px_rgba(255,255,255,0.08)]">
              <div className="flex items-center gap-2 text-white font-bold text-xs uppercase font-mono tracking-wider">
                <ShieldAlert className="w-4 h-4 text-white" />
                {selectedFlagInfo.label}
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                {selectedFlagInfo.explanation}
              </p>
            </div>
          ) : (
            <div className="glass p-6 rounded-3xl border border-white/5 text-center text-zinc-500 text-xs py-8">
              <Info className="w-6 h-6 text-zinc-600 mx-auto mb-2" />
              Click any suspicious email element (From address, Urgent subject, or Destination link) to register forensic threat vectors.
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
