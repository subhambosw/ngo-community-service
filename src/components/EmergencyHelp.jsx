import React, { useState } from 'react';
import { 
  AlertOctagon, 
  PhoneCall, 
  ExternalLink, 
  Clock, 
  ShieldAlert, 
  Check, 
  Copy, 
  CheckCircle2, 
  FileText, 
  Lock, 
  Smartphone, 
  HelpCircle,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { HELP } from '../data/cyberawareData';

export default function EmergencyHelp({ setActiveView }) {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState({});
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  const icons = [
    AlertOctagon, // Lost money
    Lock,         // Password / OTP
    Smartphone,   // Suspicious app
    ExternalLink, // Clicked link
    ShieldAlert   // Extortion / threat
  ];

  const currentCategory = HELP[activeCategoryIndex];
  const CurrentIcon = icons[activeCategoryIndex] || AlertOctagon;

  const toggleStep = (stepIdx) => {
    const key = `${activeCategoryIndex}-${stepIdx}`;
    setCompletedSteps(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const copyIncidentTemplate = () => {
    const template = `[CYBERCRIME INCIDENT DRAFT REPORT]
Date & Time of Incident: ${new Date().toLocaleString()}
Nature of Incident: ${currentCategory[0]}
Financial Loss Amount (if applicable): ₹
Transaction ID / UTR Number: 
Suspect Phone Number / UPI ID: 
Platform / App Used: 
Description of Events: 

Evidence Captured (Screenshots, SMS, Call Logs, Chat Export): YES / NO`;

    navigator.clipboard.writeText(template);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      
      {/* Urgent Warning Header */}
      <div className="rounded-3xl p-6 sm:p-10 border border-red-500/30 bg-gradient-to-r from-red-950/40 via-black to-red-950/20 relative overflow-hidden backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-xs font-mono text-red-300">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
              <span>EMERGENCY FRAUD RESPONSE TRIAGE</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold font-heading text-white">
              Scammed? Get Immediate Help
            </h1>
            <p className="text-zinc-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Don't panic. The first <strong>2 hours (The Golden Window)</strong> are critical to freeze unauthorized money transfers, lock compromised accounts, and preserve admissible forensic evidence.
            </p>
          </div>

          {/* Quick Dial 1930 Helpline Button */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <a
              href="tel:1930"
              className="px-6 py-3.5 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(239,68,68,0.5)] transition-all hover:scale-105 active:scale-95"
            >
              <PhoneCall className="w-5 h-5 animate-bounce" />
              <div className="text-left">
                <div className="text-[10px] font-mono opacity-80 uppercase leading-none">CALL HELPLINE</div>
                <div className="text-base font-extrabold leading-tight">1930 (Toll-Free)</div>
              </div>
            </a>

            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all"
            >
              <span>cybercrime.gov.in</span>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Scenario Selector Navigation Pills */}
      <div className="flex flex-wrap gap-2.5 border-b border-white/10 pb-4">
        {HELP.map(([catTitle], idx) => {
          const Icon = icons[idx] || AlertTriangle;
          const isSelected = activeCategoryIndex === idx;

          return (
            <button
              key={idx}
              onClick={() => setActiveCategoryIndex(idx)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                  : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className={`w-4 h-4 ${isSelected ? 'text-black' : 'text-zinc-400'}`} />
              <span>{catTitle}</span>
            </button>
          );
        })}
      </div>

      {/* Active Triage Procedure */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Step-by-Step Checklist */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-heading text-white flex items-center gap-2">
              <CurrentIcon className="w-5 h-5 text-red-400" />
              <span>Action Protocol: {currentCategory[0]}</span>
            </h2>
            <span className="text-xs font-mono text-zinc-400">
              {currentCategory[1].filter((_, sIdx) => completedSteps[`${activeCategoryIndex}-${sIdx}`]).length} / {currentCategory[1].length} Done
            </span>
          </div>

          <div className="space-y-3">
            {currentCategory[1].map((stepText, stepIdx) => {
              const isChecked = !!completedSteps[`${activeCategoryIndex}-${stepIdx}`];

              return (
                <div 
                  key={stepIdx}
                  onClick={() => toggleStep(stepIdx)}
                  className={`glass rounded-2xl p-5 border transition-all cursor-pointer select-none flex items-start gap-4 ${
                    isChecked
                      ? 'border-emerald-500/30 bg-emerald-950/10 opacity-75'
                      : 'border-white/15 hover:border-white/30 bg-black/40'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                    isChecked
                      ? 'bg-emerald-500 border-emerald-400 text-black shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                      : 'border-white/30 text-transparent bg-white/5'
                  }`}>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-zinc-400">
                        STEP {stepIdx + 1}
                      </span>
                    </div>
                    <p className={`text-sm sm:text-base leading-relaxed ${
                      isChecked ? 'text-zinc-400 line-through' : 'text-zinc-100 font-medium'
                    }`}>
                      {stepText}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Notice */}
          <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/20 text-xs text-blue-200 leading-relaxed font-sans">
            <strong>Important Evidence Rule:</strong> Do not delete suspicious SMS messages, WhatsApp chats, call history, or payment confirmation receipts. Law enforcement agencies require untouched digital timestamps to file official FIRs under the IT Act.
          </div>
        </div>

        {/* Right 1 Col: Quick Help Box & Evidence Template */}
        <div className="space-y-6">
          
          {/* Official Helplines Directory Card */}
          <div className="glass-specular rounded-2xl p-6 border border-white/20 space-y-4">
            <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-white flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>Official Emergency Contacts</span>
            </h3>

            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
                <span className="text-zinc-400">National Cybercrime Helpline</span>
                <div className="text-white font-bold text-sm">1930</div>
                <p className="text-[11px] text-zinc-400 font-sans">Operational 24x7 across all Indian States & UTs.</p>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
                <span className="text-zinc-400">National Cyber Portal</span>
                <div className="text-white font-bold text-sm">cybercrime.gov.in</div>
                <p className="text-[11px] text-zinc-400 font-sans">File formal online complaints & track complaint status.</p>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
                <span className="text-zinc-400">Bank Fraud Hotline</span>
                <p className="text-[11px] text-zinc-300 font-sans">
                  Always call the number printed physically on the back of your ATM card or on your netbanking portal.
                </p>
              </div>
            </div>
          </div>

          {/* Incident Reporter Draft Box */}
          <div className="glass rounded-2xl p-6 border border-white/15 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Evidence Draft Template</span>
              </h3>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Copy this structured format to paste into your notes before calling 1930 or visiting your local police cyber cell:
            </p>

            <button
              onClick={copyIncidentTemplate}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold font-mono transition-all flex items-center justify-center gap-2 cursor-pointer border ${
                copiedTemplate
                  ? 'bg-emerald-500 text-black border-emerald-400'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
              }`}
            >
              {copiedTemplate ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-black" />
                  <span>Template Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Incident Template</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
