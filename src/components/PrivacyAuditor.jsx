import React, { useState } from 'react';
import { Shield, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function PrivacyAuditor({ onCompleteChallenge }) {
  const [step, setStep] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [completedScenarios, setCompletedScenarios] = useState(0);

  const scenarios = [
    {
      id: 1,
      title: 'Application Permission Request',
      question: 'A newly installed casual game application requests persistent 24/7 location telemetry and address book permissions.',
      options: [
        { text: 'Authorize all permissions to ensure uninterrupted gameplay', risk: 'high', explanation: 'High Risk. Utility or gaming apps rarely require address book or GPS telemetry. Always apply the Principle of Least Privilege.' },
        { text: 'Deny location and address book permissions', risk: 'low', explanation: 'Optimal Choice. Granting minimal permissions protects your telemetry footprint.' }
      ]
    },
    {
      id: 2,
      title: 'Public Footprint & Visibility',
      question: 'Configuring a new social platform account. Which default privacy policy limits open-source intelligence (OSINT) harvesting?',
      options: [
        { text: 'Public (Indexed by global search engines and web scrapers)', risk: 'high', explanation: 'High Risk. Public profiles allow threat actors to compile reconnaissance data for tailored spear-phishing.' },
        { text: 'Verified Contacts Only (Restricted footprint)', risk: 'low', explanation: 'Safe Choice. Audience segregation significantly reduces exposure to automated scraping bots.' }
      ]
    },
    {
      id: 3,
      title: 'Credential Breach Incident',
      question: 'An enterprise service announces a historical credential leak involving password hashes.',
      options: [
        { text: 'Take no action assuming cryptographic hashing is unbreakable', risk: 'high', explanation: 'High Risk. Modern rainbow tables and dictionary attacks reverse hashes rapidly. Reused credentials will be weaponized.' },
        { text: 'Cycle credentials on the impacted service and all instances of reuse', risk: 'low', explanation: 'Decisive Action. Immediately cycles attack vectors and neutralizes automated credential-stuffing campaigns.' }
      ]
    }
  ];

  const handleSelectOption = (opt) => {
    setFeedback(opt);
    if (opt.risk === 'low') {
      const nextCount = completedScenarios + 1;
      setCompletedScenarios(nextCount);
      if (nextCount === scenarios.length) {
        onCompleteChallenge(50, 'privacy_guardian');
      }
    }
  };

  const handleNext = () => {
    setFeedback(null);
    setStep(step + 1);
  };

  const handleRestart = () => {
    setStep(0);
    setFeedback(null);
    setCompletedScenarios(0);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title Header */}
      <div className="border-b border-white/10 pb-6 text-center">
        <div className="inline-flex items-center gap-2 text-zinc-400 text-xs font-mono tracking-wider uppercase mb-1">
          <Shield className="w-3.5 h-3.5 text-white" /> Privacy & Footprint Suite
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight">Digital Privacy & Footprint Auditor</h1>
        <p className="text-zinc-500 text-xs sm:text-sm mt-1">
          Audit application permission boundaries, OSINT exposure surfaces, and credential leak response procedures.
        </p>
      </div>

      <div className="glass-specular p-8 sm:p-10 rounded-3xl border border-white/15 space-y-6 shadow-2xl">
        
        {step >= scenarios.length ? (
          <div className="text-center py-8 space-y-6 animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-white text-black border border-white flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(255,255,255,0.3)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white font-heading">Privacy Audit Complete</h2>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              All privacy scenarios evaluated successfully. Credential earned: <span className="text-white font-bold font-mono">Privacy Guardian (+50 XP)</span>.
            </p>
            <button
              onClick={handleRestart}
              className="px-6 py-3.5 btn-glossy rounded-2xl text-xs uppercase tracking-wider font-mono"
            >
              Restart Audit Scenarios
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Step Counter */}
            <div className="flex justify-between items-center text-xs font-mono text-zinc-500 border-b border-white/10 pb-3">
              <span>Scenario {step + 1} of {scenarios.length}</span>
              <span className="text-white font-bold">{scenarios[step].title}</span>
            </div>

            {/* Question */}
            <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed font-heading">
              {scenarios[step].question}
            </h2>

            {/* Options */}
            {!feedback ? (
              <div className="space-y-3.5 pt-2">
                {scenarios[step].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt)}
                    className="w-full text-left p-5 rounded-2xl border border-white/10 bg-black/50 hover:bg-white/[0.06] hover:border-white/30 transition-all text-zinc-200 font-medium text-xs sm:text-sm flex items-center justify-between group shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"
                  >
                    <span>{opt.text}</span>
                    <span className="text-[11px] font-mono text-zinc-500 group-hover:text-white shrink-0 ml-3">Select Action →</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-6 animate-fade-in">
                <div className={`p-5 rounded-2xl border ${
                  feedback.risk === 'high' 
                    ? 'bg-white/[0.04] border-white/20 text-zinc-300' 
                    : 'bg-white/[0.08] border-white/40 text-white shadow-[0_0_20px_rgba(255,255,255,0.08)]'
                }`}>
                  <h3 className="font-bold text-xs uppercase font-mono tracking-wider mb-1.5 flex items-center gap-2 text-white">
                    {feedback.risk === 'high' ? <AlertCircle className="w-4 h-4 text-zinc-400" /> : <CheckCircle2 className="w-4 h-4 text-white" />}
                    {feedback.risk === 'high' ? 'Security Exposure Alert' : 'Recommended Protocol'}
                  </h3>
                  <p className="text-xs leading-relaxed text-zinc-300 font-sans">{feedback.explanation}</p>
                </div>

                <button
                  onClick={handleNext}
                  className="w-full py-3.5 btn-glossy rounded-2xl text-xs uppercase tracking-wider font-mono"
                >
                  Proceed to Next Scenario &rarr;
                </button>
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
}
