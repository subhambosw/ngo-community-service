import React, { useState } from 'react';
import { 
  AlertOctagon, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Terminal, 
  Flame, 
  RotateCcw, 
  ArrowRight, 
  Clock, 
  Award, 
  FileText, 
  Cpu, 
  HardDrive,
  Info
} from 'lucide-react';

export default function IncidentResponse({ onAwardXP }) {
  const scenarios = [
    {
      id: 'ransomware',
      title: 'LockBit Subnet Outbreak (10.4.0.0/24)',
      severity: 'CRITICAL',
      asset: 'Hospital PACS Medical Imaging Subnet',
      summary: 'At 03:14 AM, automated EDR alerts detect rapid mass file renaming with extension ".locked" and high CPU disk write spikes across 14 database servers.',
      phases: [
        {
          step: 1,
          name: 'Phase 1: Initial Triage & Evidence Preservation',
          prompt: 'Multiple servers are actively encrypting files. What is your immediate first forensic action?',
          options: [
            { id: 'a', text: 'Power off and reboot all affected servers immediately via physical power button.', correct: false, reason: 'Incorrect: Powering off destroys volatile RAM memory containing encryption keys, C2 IP connections, and running injected process artifacts.' },
            { id: 'b', text: 'Isolate the 10.4.0.0/24 VLAN at the core switch level and capture volatile RAM dumps from patient-zero host.', correct: true, reason: 'Correct: Network isolation stops lateral propagation while preserving volatile RAM memory artifacts needed for forensic key recovery.' },
            { id: 'c', text: 'Email all staff asking if anyone opened an email attachment.', correct: false, reason: 'Incorrect: Emailing users does not halt active encryption and wastes critical golden-hour containment time.' }
          ]
        },
        {
          step: 2,
          name: 'Phase 2: Containment & Threat Hunting',
          prompt: 'VLAN is isolated. SIEM logs indicate patient-zero host (10.4.0.42) made outbound connections to an external IP on port 4444. How do you contain the command-and-control (C2) channel?',
          options: [
            { id: 'a', text: 'Push global firewall egress block for the C2 IP across perimeter gateways and revoke Domain Admin service tokens.', correct: true, reason: 'Correct: Blocking outbound C2 prevents attackers from sending new encryption keys or triggering secondary payloads.' },
            { id: 'b', text: 'Delete the local administrator account on patient-zero.', correct: false, reason: 'Incorrect: Deleting local accounts does not stop active C2 beaconing and may lock out incident responders.' },
            { id: 'c', text: 'Wait 24 hours to monitor attacker behavior before taking action.', correct: false, reason: 'Incorrect: Waiting allows attackers to finalize exfiltration and deploy wipers.' }
          ]
        },
        {
          step: 3,
          name: 'Phase 3: Eradication & Remediation',
          prompt: 'Malicious payload was dropped via a scheduled task running a PowerShell base64 script. What is the proper eradication standard?',
          options: [
            { id: 'a', text: 'Delete the malicious scheduled task and continue running the infected operating system.', correct: false, reason: 'Incorrect: Advanced ransomware leaves hidden persistence backdoors (WMI subscriptions, DLL sideloading).' },
            { id: 'b', text: 'Rebuild compromised servers from verified clean golden images and restore databases from immutable offline air-gapped backups.', correct: true, reason: 'Correct: Complete re-imaging ensures zero persistence remains, and air-gapped backups prevent re-encryption.' },
            { id: 'c', text: 'Pay the $2,500,000 cryptocurrency ransom to receive the decryptor key.', correct: false, reason: 'Incorrect: Paying ransoms funds criminal syndicates, does not guarantee data recovery, and violates OFAC compliance guidelines.' }
          ]
        }
      ]
    },
    {
      id: 'bec',
      title: 'Executive BEC & MFA Session Hijack',
      severity: 'HIGH',
      asset: 'Chief Financial Officer (CFO) M365 Account',
      summary: 'Finance team receives an urgent memo purportedly from the CFO requesting an emergency $140,000 wire transfer for an acquisition, with instructions to bypass normal dual-approval.',
      phases: [
        {
          step: 1,
          name: 'Phase 1: Verification & Triage',
          prompt: 'Finance forwards the suspicious email. An inspection of Azure AD sign-in logs reveals an active session from a known VPN IP in Lagos, Nigeria. What is your immediate containment action?',
          options: [
            { id: 'a', text: 'Reply to the scammer asking for their banking routing number to trace them.', correct: false, reason: 'Incorrect: Communicating with the threat actor confirms an active target and alerts them to speed up their heist.' },
            { id: 'b', text: 'Revoke all active Azure AD OAuth session tokens, reset CFO credentials, and require hardware FIDO2 key re-registration.', correct: true, reason: 'Correct: Revoking active session tokens immediately terminates the attacker’s stolen session cookie (AiTM phishing bypass).' },
            { id: 'c', text: 'Delete the CFO’s mailbox entirely.', correct: false, reason: 'Incorrect: Deleting the mailbox destroys essential forensic audit logs and disrupts business operations.' }
          ]
        },
        {
          step: 2,
          name: 'Phase 2: Eradication & Inbox Rule Audit',
          prompt: 'The session is terminated. What common persistence mechanism must be inspected in the CFO’s email account?',
          options: [
            { id: 'a', text: 'Check for hidden inbox forwarding rules (e.g. forward emails containing "invoice" or "wire" to external webmail and mark as read).', correct: true, reason: 'Correct: Attackers universally create hidden mailbox forwarding or deletion rules to silently intercept finance communications.' },
            { id: 'b', text: 'Change the desktop screen resolution.', correct: false, reason: 'Incorrect: Has no correlation with email security.' },
            { id: 'c', text: 'Uninstall Microsoft Office on the CFO laptop.', correct: false, reason: 'Incorrect: The compromise occurred via cloud session token theft, not a local desktop binary corruption.' }
          ]
        }
      ]
    }
  ];

  const [activeScenarioId, setActiveScenarioId] = useState('ransomware');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const scenario = scenarios.find(s => s.id === activeScenarioId) || scenarios[0];
  const currentPhase = scenario.phases[currentStepIndex];

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    if (option.correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < scenario.phases.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setCompleted(true);
      if (onAwardXP) {
        onAwardXP(50, 'incident_commander');
      }
    }
  };

  const handleRestart = (scenarioId) => {
    setActiveScenarioId(scenarioId);
    setCurrentStepIndex(0);
    setSelectedOption(null);
    setScore(0);
    setCompleted(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono tracking-wider uppercase mb-1">
            <AlertOctagon className="w-3.5 h-3.5 text-red-400" /> NIST SP 800-61 Incident Handling
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight">
            Cyber Incident Response & War Room
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Step into the role of Incident Commander during active cyber breaches. Make mission-critical decisions under pressure following standard DFIR containment protocols.
          </p>
        </div>

        {/* Scenario Switcher Tabs */}
        <div className="flex gap-2">
          {scenarios.map(s => (
            <button
              key={s.id}
              onClick={() => handleRestart(s.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all border flex items-center gap-1.5 ${
                activeScenarioId === s.id
                  ? 'bg-white text-black font-bold border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                  : 'bg-black/60 text-zinc-400 border-white/10 hover:text-white'
              }`}
            >
              <span>{s.id === 'ransomware' ? '⚡ Ransomware Outbreak' : '📩 Executive BEC'}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Scenario Briefing Banner */}
      <div className="p-6 rounded-3xl glass border border-white/15 space-y-3 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-[10px] font-mono font-bold">
              {scenario.severity} SEVERITY
            </span>
            <span className="text-xs font-mono text-zinc-400">Target Asset: <strong className="text-white">{scenario.asset}</strong></span>
          </div>
          <span className="text-xs font-mono text-zinc-400">
            Phase {currentStepIndex + 1} of {scenario.phases.length}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
          {scenario.summary}
        </p>
      </div>

      {/* Active Phase Card */}
      {!completed ? (
        <div className="glass-specular p-6 sm:p-8 rounded-3xl border border-white/15 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold font-heading text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-white" />
              <span>{currentPhase.name}</span>
            </h2>
            <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Containment Window Active</span>
            </div>
          </div>

          <p className="text-sm font-semibold text-white leading-relaxed">
            {currentPhase.prompt}
          </p>

          {/* Options */}
          <div className="space-y-3">
            {currentPhase.options.map((opt) => {
              const isSelected = selectedOption?.id === opt.id;
              let optionStyle = 'bg-black/60 border-white/15 hover:border-white/40 text-zinc-200';
              if (selectedOption) {
                if (opt.correct) {
                  optionStyle = 'bg-emerald-950/40 border-emerald-500/50 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.2)]';
                } else if (isSelected && !opt.correct) {
                  optionStyle = 'bg-red-950/40 border-red-500/50 text-red-100 shadow-[0_0_20px_rgba(239,68,68,0.2)]';
                }
              }

              return (
                <div
                  key={opt.id}
                  onClick={() => !selectedOption && handleSelectOption(opt)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${optionStyle} ${!selectedOption && 'hover:-translate-y-0.5'}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center shrink-0 text-xs font-mono font-bold mt-0.5">
                      {opt.id.toUpperCase()}
                    </span>
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm font-medium leading-relaxed">
                        {opt.text}
                      </p>

                      {selectedOption && (
                        <div className={`mt-3 pt-3 border-t text-xs font-mono flex items-start gap-2 ${
                          opt.correct ? 'border-emerald-500/30 text-emerald-300' : 'border-red-500/30 text-red-300'
                        }`}>
                          {opt.correct ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" /> : <XCircle className="w-4 h-4 shrink-0 mt-0.5" />}
                          <p>{opt.reason}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Next Button */}
          {selectedOption && (
            <div className="pt-4 flex justify-end">
              <button
                onClick={handleNextStep}
                className="btn-glossy px-6 py-3 rounded-xl text-xs font-mono font-bold flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <span>{currentStepIndex < scenario.phases.length - 1 ? 'Proceed to Next Incident Phase' : 'Complete Incident Debrief'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Debrief Summary Card */
        <div className="glass-specular p-8 rounded-3xl border border-white/20 text-center space-y-6 shadow-2xl animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/25 flex items-center justify-center mx-auto text-white shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            <Award className="w-8 h-8 text-white" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold font-heading text-white">
              Incident Response Debrief Completed
            </h2>
            <p className="text-xs text-zinc-400 font-mono">
              Drill Scenario: {scenario.title} &bull; Forensic Accuracy: {score} / {scenario.phases.length}
            </p>
          </div>

          <div className="p-4 max-w-md mx-auto rounded-2xl bg-white/5 border border-white/15 text-xs text-zinc-300 font-mono space-y-1">
            <p className="text-white font-bold text-sm">+50 XP Awarded &bull; Incident Commander Tier</p>
            <p className="text-[11px] text-zinc-400">All phases executed in alignment with NIST SP 800-61 containment frameworks.</p>
          </div>

          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => handleRestart(activeScenarioId)}
              className="btn-obsidian px-5 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Scenario</span>
            </button>
            <button
              onClick={() => handleRestart(activeScenarioId === 'ransomware' ? 'bec' : 'ransomware')}
              className="btn-glossy px-6 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2"
            >
              <span>Launch Next Crisis Drill</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* NIST Incident Lifecycle Guide */}
      <div className="p-6 rounded-3xl glass border border-white/10 space-y-4">
        <div className="flex items-center gap-2 text-white font-bold text-xs uppercase font-mono tracking-wider">
          <Info className="w-4 h-4" />
          <span>The NIST SP 800-61 Incident Response Lifecycle</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 space-y-1">
            <span className="text-zinc-500 font-bold block text-[10px]">STEP 01</span>
            <p className="text-white font-bold">Preparation</p>
            <p className="text-[11px] text-zinc-400">Hardening defenses, establishing SIEM alerts, offline backups.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 space-y-1">
            <span className="text-zinc-500 font-bold block text-[10px]">STEP 02</span>
            <p className="text-white font-bold">Detection & Analysis</p>
            <p className="text-[11px] text-zinc-400">Triage anomalous network egress, verify memory hashes.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 space-y-1">
            <span className="text-zinc-500 font-bold block text-[10px]">STEP 03</span>
            <p className="text-white font-bold">Containment & Eradication</p>
            <p className="text-[11px] text-zinc-400">Isolate subnets, revoke stolen tokens, kill C2 sockets.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 space-y-1">
            <span className="text-zinc-500 font-bold block text-[10px]">STEP 04</span>
            <p className="text-white font-bold">Post-Incident Recovery</p>
            <p className="text-[11px] text-zinc-400">Restore from air-gapped backups and patch root-cause CVEs.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
