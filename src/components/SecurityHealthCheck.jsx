import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  RotateCcw, 
  Check, 
  ExternalLink, 
  Sparkles,
  ClipboardList,
  ChevronRight,
  TrendingUp,
  Shield,
  Zap
} from 'lucide-react';
import { HQ, OPTS } from '../data/cyberawareData';

export default function SecurityHealthCheck({ setActiveView, onAwardXP }) {
  // Answers map: { [questionIndex]: optionValue (0..3) }
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [checkedTodos, setCheckedTodos] = useState({});

  // Module mapping for jumping to specific interactive labs
  const moduleViewMap = {
    pw: 'password',
    ph: 'phishing',
    mw: 'malware',
    wf: 'network',
    pv: 'privacy',
    se: 'incident-response'
  };

  const moduleNameMap = {
    pw: 'Password Vault & 2FA',
    ph: 'Phishing Simulator',
    mw: 'Malware & Endpoint Defense',
    wf: 'Wi-Fi & Network Security',
    pv: 'Privacy & OSINT Auditor',
    se: 'Incident Response & War Room'
  };

  const handleSelect = (qIdx, value) => {
    setAnswers(prev => ({
      ...prev,
      [qIdx]: value
    }));
  };

  // Calculate score
  const totalWeight = HQ.reduce((acc, q) => acc + q.w * 3, 0);
  const earnedScore = HQ.reduce((acc, q, idx) => {
    const ans = answers[idx];
    if (ans === undefined) return acc;
    return acc + (q.w * ans);
  }, 0);

  const percentage = Math.round((earnedScore / totalWeight) * 100);

  const answeredCount = Object.keys(answers).length;
  const isAllAnswered = answeredCount === HQ.length;

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (onAwardXP) {
      onAwardXP(120, 'health_auditor');
    }
  };

  const handleReset = () => {
    setAnswers({});
    setIsSubmitted(false);
    setCheckedTodos({});
  };

  // Generate prioritized to-do list for items answered < 3
  const todoItems = HQ
    .map((q, idx) => ({ ...q, idx, userVal: answers[idx] ?? 0 }))
    .filter(item => item.userVal < 3)
    .sort((a, b) => (b.w - a.w) || (a.userVal - b.userVal));

  const toggleTodo = (idx) => {
    setCheckedTodos(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="glass-specular rounded-3xl p-6 sm:p-10 border border-white/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.04] rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-zinc-300 mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>EVERYDAY CYBER RESILIENCE AUDIT</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold font-heading text-white tracking-tight">
              Security Health Check
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Answer 10 quick questions about your real-world digital habits. Get a precision posture score and a prioritized, action-ready To-Do checklist to fix your vulnerabilities.
            </p>
          </div>

          <div className="flex md:flex-col items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/10 min-w-[180px]">
            <span className="text-xs font-mono text-zinc-400">PROGRESS</span>
            <span className="text-2xl font-bold font-mono text-white mt-1">
              {answeredCount} / {HQ.length}
            </span>
            <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-400 to-emerald-400 h-full transition-all duration-300"
                style={{ width: `${(answeredCount / HQ.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {!isSubmitted ? (
        /* Questions Form */
        <div className="space-y-4">
          {HQ.map((item, qIdx) => {
            const currentSelection = answers[qIdx];
            return (
              <div 
                key={qIdx}
                className={`glass rounded-2xl p-6 transition-all duration-200 border ${
                  currentSelection !== undefined 
                    ? 'border-white/25 bg-white/[0.04]' 
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 ${
                    currentSelection !== undefined 
                      ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]' 
                      : 'bg-white/5 border border-white/10 text-zinc-400'
                  }`}>
                    {qIdx + 1}
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-base sm:text-lg font-semibold text-white">
                        {item.q}
                      </h3>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        item.w === 3 
                          ? 'bg-red-500/10 text-red-300 border border-red-500/20' 
                          : item.w === 2 
                            ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20' 
                            : 'bg-blue-500/10 text-blue-300 border border-blue-500/20'
                      }`}>
                        {item.w === 3 ? 'High Impact (3x)' : item.w === 2 ? 'Medium (2x)' : 'Standard (1x)'}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-400 font-sans">
                      <span className="text-zinc-500 font-mono">Why it matters: </span>
                      {item.h}
                    </p>

                    {/* 4 Choices */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                      {OPTS.map(([label, val]) => {
                        const isSelected = currentSelection === val;
                        return (
                          <button
                            key={val}
                            type="button"
                            onClick={() => handleSelect(qIdx, val)}
                            className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 border cursor-pointer active:scale-95 ${
                              isSelected
                                ? 'bg-white text-black border-white shadow-[0_4px_15px_rgba(255,255,255,0.3)] font-bold'
                                : 'bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10 hover:border-white/20'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            <span>{label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Submit Trigger Bar */}
          <div className="sticky bottom-20 z-30 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 glass-specular rounded-2xl p-4 border border-white/20 backdrop-blur-xl">
            <div className="text-xs font-mono text-zinc-400">
              {isAllAnswered ? (
                <span className="text-emerald-400 flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4" /> All 10 questions answered! Ready to evaluate.
                </span>
              ) : (
                <span>Answer {HQ.length - answeredCount} more questions to generate your report</span>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={!isAllAnswered}
              className={`w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 ${
                isAllAnswered
                  ? 'btn-glossy cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.5)]'
                  : 'bg-white/10 text-zinc-500 border border-white/5 cursor-not-allowed'
              }`}
            >
              <span>Generate Resilience Report</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="space-y-8 animate-fade-in">
          
          {/* Score Card */}
          <div className="glass-specular rounded-3xl p-8 sm:p-12 border border-white/20 text-center relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              
              {/* Score Dial */}
              <div className="inline-flex flex-col items-center justify-center w-36 h-36 rounded-full border-4 border-white/20 bg-black/60 shadow-[0_0_40px_rgba(255,255,255,0.15)] relative">
                <span className="text-4xl font-extrabold font-mono text-white tracking-tight">
                  {percentage}%
                </span>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mt-1">
                  SECURITY SCORE
                </span>
              </div>

              {/* Status Verdict */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-2"
                  style={{
                    backgroundColor: percentage >= 80 ? 'rgba(16, 185, 129, 0.15)' : percentage >= 50 ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    color: percentage >= 80 ? '#34d399' : percentage >= 50 ? '#fbbf24' : '#f87171',
                    border: `1px solid ${percentage >= 80 ? 'rgba(52, 211, 153, 0.3)' : percentage >= 50 ? 'rgba(251, 191, 36, 0.3)' : 'rgba(248, 113, 113, 0.3)'}`
                  }}
                >
                  {percentage >= 80 ? '🛡️ Strong Defense (Shield Active)' : percentage >= 50 ? '⚠️ Moderate Exposure (Action Needed)' : '🚨 High Risk (Hardening Required)'}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading mt-2">
                  {percentage >= 80 
                    ? 'Excellent Cyber Hygiene' 
                    : percentage >= 50 
                      ? 'Solid Foundation, Key Gaps Detected' 
                      : 'Critical Vulnerabilities Exposed'}
                </h2>
                <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
                  {percentage >= 80
                    ? 'You have strong proactive safeguards active. Follow your minor checklist items below to achieve complete lock-down.'
                    : percentage >= 50
                      ? 'You understand core security principles, but recurring gaps (such as password reuse or 2FA absence) leave your accounts susceptible to automated credential attacks.'
                      : 'Your current routine presents severe security gaps. Attackers can leverage public networks, unpatched software, or credential reuse to compromise your sensitive identity.'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Audit</span>
                </button>
                {setActiveView && (
                  <button
                    onClick={() => setActiveView('practice')}
                    className="btn-glossy px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg"
                  >
                    <Zap className="w-3.5 h-3.5 fill-black" />
                    <span>Practice Defense Scenarios</span>
                  </button>
                )}
              </div>

            </div>
          </div>

          {/* Prioritized Action Checklist */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ClipboardList className="w-5 h-5 text-white" />
                <h3 className="text-xl font-bold text-white font-heading">
                  Your Prioritized Hardening Checklist
                </h3>
              </div>
              <span className="text-xs font-mono text-zinc-400">
                {todoItems.filter(item => checkedTodos[item.idx]).length} / {todoItems.length} Resolved
              </span>
            </div>

            {todoItems.length === 0 ? (
              <div className="glass rounded-2xl p-8 text-center border border-white/15">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white">Zero Vulnerabilities Flagged!</h4>
                <p className="text-zinc-400 text-sm mt-1">You answered "Always" for every single protective measure. Keep up your vigilant security posture.</p>
              </div>
            ) : (
              <div className="grid gap-3">
                {todoItems.map((item, index) => {
                  const isDone = !!checkedTodos[item.idx];
                  const targetView = moduleViewMap[item.m];
                  const moduleName = moduleNameMap[item.m];

                  return (
                    <div 
                      key={item.idx}
                      className={`glass rounded-2xl p-5 border transition-all ${
                        isDone 
                          ? 'border-emerald-500/30 bg-emerald-950/10 opacity-70' 
                          : 'border-white/15 hover:border-white/25'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <button
                          type="button"
                          onClick={() => toggleTodo(item.idx)}
                          className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-all cursor-pointer ${
                            isDone 
                              ? 'bg-emerald-500 border-emerald-400 text-black shadow-[0_0_10px_rgba(16,185,129,0.5)]' 
                              : 'border-white/30 hover:border-white text-transparent bg-white/5'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </button>

                        <div className="flex-1 space-y-2">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h4 className={`text-base font-semibold text-white ${isDone ? 'line-through text-zinc-400' : ''}`}>
                              #{index + 1}: {item.t}
                            </h4>
                            <div className="flex items-center gap-2">
                              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                                item.w === 3 
                                  ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
                                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              }`}>
                                Priority Weight: {item.w}x
                              </span>
                            </div>
                          </div>

                          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                            <strong className="text-zinc-300">Action Plan: </strong>
                            {item.a}
                          </p>

                          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs font-mono">
                            <span className="text-zinc-500">
                              Context: {item.h}
                            </span>
                            
                            {setActiveView && targetView && (
                              <button
                                onClick={() => setActiveView(targetView)}
                                className="flex items-center gap-1.5 text-zinc-300 hover:text-white underline underline-offset-4 cursor-pointer"
                              >
                                <span>Practice in {moduleName}</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
