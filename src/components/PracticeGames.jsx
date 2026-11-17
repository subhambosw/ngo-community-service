import React, { useState } from 'react';
import { 
  Gamepad2, 
  Mail, 
  Link2, 
  FileCode, 
  Key, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  HelpCircle, 
  Zap, 
  ShieldAlert, 
  Terminal,
  Sliders,
  Check,
  AlertTriangle
} from 'lucide-react';
import { MAILS, URLS, SC, CH, CIPH } from '../data/cyberawareData';

export default function PracticeGames({ onAwardXP }) {
  const [activeGame, setActiveGame] = useState('phish'); // 'phish' | 'urls' | 'scenarios' | 'challenges'

  // --- 1. Spot the Phish Game State ---
  const [mailIndex, setMailIndex] = useState(0);
  const [mailUserAns, setMailUserAns] = useState(null);
  const [mailScore, setMailScore] = useState(0);

  // --- 2. Real vs Fake Link Inspector State ---
  const [urlIndex, setUrlIndex] = useState(0);
  const [urlUserAns, setUrlUserAns] = useState(null);
  const [urlScore, setUrlScore] = useState(0);

  // --- 3. Scenarios State ---
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(null);
  const [scenarioNodeKey, setScenarioNodeKey] = useState('start');
  const [completedScenarios, setCompletedScenarios] = useState([]);

  // --- 4. Level 3 Hands-On Challenges State ---
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [shiftVal, setShiftVal] = useState(3);
  const [decodedInput, setDecodedInput] = useState('');
  const [cipherStatus, setCipherStatus] = useState('');
  const [logQuestionIndex, setLogQuestionIndex] = useState(0);
  const [logSelectedAns, setLogSelectedAns] = useState(null);
  const [logScore, setLogScore] = useState(0);

  // Helper to decode Caesar cipher with shift
  const decodeCaesar = (str, shift) => {
    return str.split('').map(c => {
      if (c >= 'A' && c <= 'Z') {
        const code = c.charCodeAt(0) - 65;
        const newCode = (code - shift + 26) % 26;
        return String.fromCharCode(newCode + 65);
      }
      return c;
    }).join('');
  };

  // 1. Phish Handlers
  const handleAnswerMail = (choice) => {
    if (mailUserAns !== null) return;
    const currentMail = MAILS[mailIndex];
    setMailUserAns(choice);
    if (choice === currentMail.ph) {
      setMailScore(prev => prev + 1);
      if (onAwardXP) onAwardXP(10, 'phish_spotter');
    }
  };

  const handleNextMail = () => {
    if (mailIndex < MAILS.length - 1) {
      setMailIndex(prev => prev + 1);
      setMailUserAns(null);
    }
  };

  const handleResetMail = () => {
    setMailIndex(0);
    setMailUserAns(null);
    setMailScore(0);
  };

  // 2. URL Handlers
  const currentUrlPair = URLS[urlIndex];
  // Pair is [legit, fake]
  const handleAnswerUrl = (chosenIdx) => {
    if (urlUserAns !== null) return;
    setUrlUserAns(chosenIdx);
    // index 0 is always legitimate
    if (chosenIdx === 0) {
      setUrlScore(prev => prev + 1);
      if (onAwardXP) onAwardXP(10, 'url_detective');
    }
  };

  const handleNextUrl = () => {
    if (urlIndex < URLS.length - 1) {
      setUrlIndex(prev => prev + 1);
      setUrlUserAns(null);
    }
  };

  const handleResetUrl = () => {
    setUrlIndex(0);
    setUrlUserAns(null);
    setUrlScore(0);
  };

  // 3. Scenario Handlers
  const handleSelectScenarioOption = (targetNodeKey) => {
    setScenarioNodeKey(targetNodeKey);
    const scen = SC[selectedScenarioIndex];
    const node = scen.n[targetNodeKey];
    if (node && node.e === 'good') {
      if (!completedScenarios.includes(scen.id)) {
        setCompletedScenarios(prev => [...prev, scen.id]);
        if (onAwardXP) onAwardXP(15, 'scenario_tactician');
      }
    }
  };

  // 4. Challenge Handlers
  const handleCheckCipher = () => {
    const clean = decodedInput.trim().toUpperCase();
    if (clean === 'THIS IS A SECURE LESSON') {
      setCipherStatus('success');
      if (onAwardXP) onAwardXP(20, 'crypto_apprentice');
    } else {
      setCipherStatus('error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono tracking-wider uppercase mb-1">
            <Gamepad2 className="w-3.5 h-3.5 text-white" /> CyberAware Hands-on Practice Simulator
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight">
            Interactive Security Practice & Games
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Build defensive instincts through real-world simulations: spot phishing emails, detect lookalike domains, solve branching scam scenarios, and decrypt cipher challenges.
          </p>
        </div>

        {/* Game Mode Tabs */}
        <div className="flex bg-black/60 p-1 rounded-2xl border border-white/15 text-xs font-mono overflow-x-auto">
          <button
            onClick={() => setActiveGame('phish')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeGame === 'phish' ? 'bg-white text-black font-bold shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            🎣 Spot the Phish
          </button>
          <button
            onClick={() => setActiveGame('urls')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeGame === 'urls' ? 'bg-white text-black font-bold shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            🔗 Real vs Fake Link
          </button>
          <button
            onClick={() => setActiveGame('scenarios')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeGame === 'scenarios' ? 'bg-white text-black font-bold shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            🎭 Decision Scenarios
          </button>
          <button
            onClick={() => setActiveGame('challenges')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeGame === 'challenges' ? 'bg-white text-black font-bold shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            🧩 Level 3 Puzzles
          </button>
        </div>
      </div>

      {/* --- GAME 1: SPOT THE PHISH --- */}
      {activeGame === 'phish' && (
        <div className="glass-specular p-6 sm:p-8 rounded-3xl border border-white/15 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">CHALLENGE {mailIndex + 1} OF {MAILS.length}</span>
              <h2 className="text-lg font-bold font-heading text-white">Is this message phishing or legitimate?</h2>
            </div>
            <div className="text-xs font-mono text-zinc-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
              Score: <strong className="text-white">{mailScore}</strong> / {MAILS.length} (+10 XP per hit)
            </div>
          </div>

          {/* Email Preview Client */}
          {mailIndex < MAILS.length ? (
            <div className="space-y-6">
              <div className="bg-black/85 p-6 rounded-2xl border border-white/15 space-y-4 shadow-inner">
                <div className="border-b border-white/10 pb-3 space-y-1 text-xs font-mono">
                  <p className="text-zinc-400">From: <strong className="text-white">{MAILS[mailIndex].f}</strong></p>
                  <p className="text-zinc-300 font-bold text-sm">{MAILS[mailIndex].s}</p>
                </div>
                <p className="text-xs sm:text-sm text-zinc-200 font-sans leading-relaxed">
                  {MAILS[mailIndex].b}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => handleAnswerMail(1)}
                  disabled={mailUserAns !== null}
                  className={`px-6 py-3 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    mailUserAns === null
                      ? 'bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40'
                      : mailUserAns === 1
                        ? MAILS[mailIndex].ph === 1 ? 'bg-emerald-500 text-black font-bold' : 'bg-red-500 text-white'
                        : 'opacity-40 border border-white/10 text-zinc-400'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>Phishing Scam</span>
                </button>

                <button
                  onClick={() => handleAnswerMail(0)}
                  disabled={mailUserAns !== null}
                  className={`px-6 py-3 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    mailUserAns === null
                      ? 'btn-obsidian'
                      : mailUserAns === 0
                        ? MAILS[mailIndex].ph === 0 ? 'bg-emerald-500 text-black font-bold' : 'bg-red-500 text-white'
                        : 'opacity-40 border border-white/10 text-zinc-400'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Legitimate Message</span>
                </button>
              </div>

              {/* Explanation Feedback */}
              {mailUserAns !== null && (
                <div className={`p-5 rounded-2xl border text-xs font-mono space-y-2 animate-fade-in ${
                  mailUserAns === MAILS[mailIndex].ph 
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                    : 'bg-red-950/30 border-red-500/40 text-red-200 shadow-[0_0_20px_rgba(239,68,68,0.15)]'
                }`}>
                  <p className="font-bold text-sm text-white flex items-center gap-2">
                    {mailUserAns === MAILS[mailIndex].ph ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-red-400" />}
                    <span>{mailUserAns === MAILS[mailIndex].ph ? 'Correct Diagnosis (+10 XP)!' : 'Incorrect Analysis'}</span>
                  </p>
                  <p className="text-zinc-300 font-sans leading-relaxed text-xs">
                    {MAILS[mailIndex].w}
                  </p>

                  <div className="pt-2 flex justify-end">
                    {mailIndex < MAILS.length - 1 ? (
                      <button
                        onClick={handleNextMail}
                        className="btn-glossy px-5 py-2 rounded-xl font-mono text-xs font-bold flex items-center gap-2 cursor-pointer"
                      >
                        <span>Next Email &rarr;</span>
                      </button>
                    ) : (
                      <button
                        onClick={handleResetMail}
                        className="btn-obsidian px-5 py-2 rounded-xl font-mono text-xs font-bold flex items-center gap-2 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Restart Phish Trainer</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-10 space-y-4">
              <h3 className="text-xl font-bold font-heading text-white">All Messages Audited!</h3>
              <p className="text-xs font-mono text-zinc-400">Final Forensic Score: {mailScore} / {MAILS.length}</p>
              <button onClick={handleResetMail} className="btn-glossy px-6 py-2.5 rounded-xl font-mono text-xs font-bold">
                Play Again
              </button>
            </div>
          )}
        </div>
      )}

      {/* --- GAME 2: REAL OR FAKE LINK INSPECTOR --- */}
      {activeGame === 'urls' && (
        <div className="glass-specular p-6 sm:p-8 rounded-3xl border border-white/15 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">CHALLENGE {urlIndex + 1} OF {URLS.length}</span>
              <h2 className="text-lg font-bold font-heading text-white">Spot the genuine website destination</h2>
            </div>
            <div className="text-xs font-mono text-zinc-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
              Score: <strong className="text-white">{urlScore}</strong> / {URLS.length}
            </div>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            <strong className="text-white font-mono">Pro Tip:</strong> Read URLs from right to left, starting at the first single forward slash (<code>/</code>). Attackers often prepend real brand names as fake subdomains (e.g. <code>accounts.google.com.verify-login.net</code>).
          </p>

          {urlIndex < URLS.length && currentUrlPair ? (
            <div className="space-y-4">
              {/* Option 0 (Legit) and Option 1 (Fake) - randomized display order */}
              {[0, 1].map((choiceIdx) => {
                const urlString = currentUrlPair[choiceIdx];
                const isSelected = urlUserAns === choiceIdx;
                let cardStyle = 'bg-black/75 border-white/15 hover:border-white/40 text-zinc-200';
                if (urlUserAns !== null) {
                  if (choiceIdx === 0) {
                    cardStyle = 'bg-emerald-950/40 border-emerald-500/50 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.2)]';
                  } else if (isSelected && choiceIdx !== 0) {
                    cardStyle = 'bg-red-950/40 border-red-500/50 text-red-100 shadow-[0_0_20px_rgba(239,68,68,0.2)]';
                  } else {
                    cardStyle = 'opacity-40 border-white/10';
                  }
                }

                return (
                  <div
                    key={choiceIdx}
                    onClick={() => handleAnswerUrl(choiceIdx)}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer font-mono text-xs sm:text-sm flex items-center justify-between gap-3 ${cardStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <Link2 className="w-4 h-4 shrink-0 text-zinc-400" />
                      <span className="truncate select-all">{urlString}</span>
                    </div>
                    {urlUserAns !== null && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${choiceIdx === 0 ? 'bg-emerald-400 text-black' : 'bg-red-500 text-white'}`}>
                        {choiceIdx === 0 ? 'GENUINE DOMAIN' : 'MALICIOUS LOOKALIKE'}
                      </span>
                    )}
                  </div>
                );
              })}

              {urlUserAns !== null && (
                <div className="p-5 rounded-2xl bg-white/5 border border-white/15 text-xs font-mono space-y-2 animate-fade-in">
                  <p className="text-white font-bold">
                    {urlUserAns === 0 ? '✓ Correct! You spotted the genuine domain (+10 XP).' : '✗ Lookalike Trap!'}
                  </p>
                  <p className="text-zinc-400 text-[11px] leading-relaxed">
                    The genuine site's domain ends right before the first slash. Any extra words or hyphens before the slash indicate an attacker-controlled server.
                  </p>

                  <div className="pt-2 flex justify-end">
                    {urlIndex < URLS.length - 1 ? (
                      <button
                        onClick={handleNextUrl}
                        className="btn-glossy px-5 py-2 rounded-xl font-mono text-xs font-bold cursor-pointer"
                      >
                        Next Link Pair &rarr;
                      </button>
                    ) : (
                      <button
                        onClick={handleResetUrl}
                        className="btn-obsidian px-5 py-2 rounded-xl font-mono text-xs font-bold cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Restart URL Detective</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-10 space-y-4">
              <h3 className="text-xl font-bold font-heading text-white">All Link Tests Completed!</h3>
              <p className="text-xs font-mono text-zinc-400">Score: {urlScore} / {URLS.length}</p>
              <button onClick={handleResetUrl} className="btn-glossy px-6 py-2.5 rounded-xl font-mono text-xs font-bold">
                Play Again
              </button>
            </div>
          )}
        </div>
      )}

      {/* --- GAME 3: BRANCHING DECISION SCENARIOS --- */}
      {activeGame === 'scenarios' && (
        <div className="space-y-6">
          {selectedScenarioIndex === null ? (
            /* Scenario Selection Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {SC.map((scen, idx) => {
                const isCompleted = completedScenarios.includes(scen.id);

                return (
                  <div
                    key={scen.id}
                    onClick={() => { setSelectedScenarioIndex(idx); setScenarioNodeKey('start'); }}
                    className="glass p-6 rounded-3xl border border-white/15 hover:border-white/35 transition-all cursor-pointer space-y-3 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                          isCompleted ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-white/10 text-zinc-400'
                        }`}>
                          {isCompleted ? 'COMPLETED' : 'NEW SCENARIO'}
                        </span>
                        <span className="text-xs font-mono text-zinc-500">Earn +15 XP</span>
                      </div>
                      <h3 className="text-base font-bold font-heading text-white group-hover:text-zinc-100 transition-colors">
                        {scen.t}
                      </h3>
                      <p className="text-xs text-zinc-400 leading-relaxed font-sans mt-1">
                        {scen.d}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-300">
                      <span>Launch interactive drill</span>
                      <span className="text-base">&rarr;</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Active Scenario Tree Card */
            (() => {
              const currentScen = SC[selectedScenarioIndex];
              const currentNode = currentScen.n[scenarioNodeKey];

              return (
                <div className="glass-specular p-6 sm:p-8 rounded-3xl border border-white/15 space-y-6 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">INTERACTIVE SCENARIO</span>
                      <h2 className="text-lg sm:text-xl font-bold font-heading text-white">{currentScen.t}</h2>
                    </div>
                    <button
                      onClick={() => setSelectedScenarioIndex(null)}
                      className="btn-obsidian px-3.5 py-1.5 rounded-xl text-xs font-mono"
                    >
                      All Scenarios
                    </button>
                  </div>

                  {/* Scenario Narrative */}
                  <div className="p-5 rounded-2xl bg-black/80 border border-white/15 text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans shadow-inner">
                    {currentNode.t}
                  </div>

                  {/* End State vs Choice Branches */}
                  {currentNode.e ? (
                    <div className={`p-5 rounded-2xl border text-xs font-mono space-y-3 ${
                      currentNode.e === 'good'
                        ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                        : 'bg-red-950/30 border-red-500/40 text-red-200 shadow-[0_0_20px_rgba(239,68,68,0.15)]'
                    }`}>
                      <p className="font-bold text-sm text-white flex items-center gap-2">
                        {currentNode.e === 'good' ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <ShieldAlert className="w-5 h-5 text-red-400" />}
                        <span>{currentNode.e === 'good' ? 'Safe Resolution (+15 XP Awarded)!' : 'Compromised Resolution!'}</span>
                      </p>
                      <div className="pt-2 flex gap-3">
                        <button
                          onClick={() => setScenarioNodeKey('start')}
                          className="btn-obsidian px-4 py-2 rounded-xl text-xs font-mono"
                        >
                          Retry Scenario
                        </button>
                        <button
                          onClick={() => setSelectedScenarioIndex(null)}
                          className="btn-glossy px-4 py-2 rounded-xl text-xs font-mono font-bold"
                        >
                          Explore Next Drill
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-xs font-mono uppercase text-zinc-400">Choose your response:</p>
                      {currentNode.c.map(([choiceText, nextKey], cIdx) => (
                        <div
                          key={cIdx}
                          onClick={() => handleSelectOption(nextKey)}
                          className="p-4 rounded-2xl bg-black/60 border border-white/15 hover:border-white/40 hover:bg-white/[0.04] transition-all cursor-pointer text-xs sm:text-sm text-white flex items-center justify-between gap-3"
                        >
                          <span>{choiceText}</span>
                          <ArrowRight className="w-4 h-4 text-zinc-500 shrink-0" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()
          )}
        </div>
      )}

      {/* --- GAME 4: LEVEL 3 HANDS-ON CRYPTO & LOG PUZZLES --- */}
      {activeGame === 'challenges' && (
        <div className="space-y-6">
          <div className="flex gap-2">
            <button
              onClick={() => setChallengeIndex(0)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                challengeIndex === 0 ? 'bg-white text-black font-bold' : 'glass border border-white/10 text-zinc-400'
              }`}
            >
              🔐 Caesar Cipher Decryptor
            </button>
            <button
              onClick={() => setChallengeIndex(1)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                challengeIndex === 1 ? 'bg-white text-black font-bold' : 'glass border border-white/10 text-zinc-400'
              }`}
            >
              📜 Server Log Forensics
            </button>
          </div>

          {challengeIndex === 0 ? (
            /* Caesar Cipher Challenge */
            <div className="glass-specular p-6 sm:p-8 rounded-3xl border border-white/15 space-y-6">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">CRYPTOGRAPHY LAB</span>
                <h2 className="text-lg sm:text-xl font-bold font-heading text-white">The Caesar Shift Puzzle</h2>
                <p className="text-xs text-zinc-400 mt-1">
                  You intercepted this encrypted transmission. Every letter was shifted forward in the alphabet by the same number. Use the live shift slider to unscramble the secret text.
                </p>
              </div>

              {/* Ciphertext Card */}
              <div className="p-5 rounded-2xl bg-black/90 border border-white/20 text-center space-y-2 shadow-inner">
                <span className="text-[10px] font-mono uppercase text-zinc-500">INTERCEPTED CIPHERTEXT</span>
                <p className="text-xl sm:text-2xl font-mono font-black text-white tracking-widest">{CIPH}</p>
              </div>

              {/* Interactive Shift Slider */}
              <div className="space-y-3 bg-black/60 p-5 rounded-2xl border border-white/15">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-zinc-400 flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-white" />
                    <span>Alphabet Shift Value:</span>
                  </span>
                  <span className="text-white font-bold text-sm bg-white/10 px-3 py-0.5 rounded-lg border border-white/20">
                    {shiftVal}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="25"
                  value={shiftVal}
                  onChange={(e) => setShiftVal(parseInt(e.target.value))}
                  className="w-full accent-white cursor-pointer"
                />
                
                {/* Real-time Decoded Preview */}
                <div className="pt-2 text-xs font-mono">
                  <span className="text-zinc-500 block text-[10px] uppercase">REAL-TIME PREVIEW WITH SHIFT {shiftVal}:</span>
                  <p className="text-sm font-bold text-zinc-200 mt-1 bg-black/40 p-3 rounded-xl border border-white/10">
                    {decodeCaesar(CIPH, shiftVal)}
                  </p>
                </div>
              </div>

              {/* Decoded Answer Verification */}
              <div className="space-y-3">
                <p className="text-xs font-mono text-zinc-400">Type the decoded plaintext message to confirm:</p>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={decodedInput}
                    onChange={(e) => setDecodedInput(e.target.value)}
                    placeholder="Type decoded message..."
                    className="flex-1 bg-black/90 border border-white/20 rounded-xl px-4 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-white shadow-inner uppercase"
                  />
                  <button
                    onClick={handleCheckCipher}
                    className="btn-glossy px-6 py-2.5 rounded-xl font-mono text-xs font-bold cursor-pointer"
                  >
                    Verify Decryption
                  </button>
                </div>

                {cipherStatus === 'success' && (
                  <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-fade-in">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>Decrypted Successfully: "THIS IS A SECURE LESSON" (+20 XP)! Shift key was 3.</span>
                  </div>
                )}

                {cipherStatus === 'error' && (
                  <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/40 text-red-300 text-xs font-mono flex items-center gap-2">
                    <XCircle className="w-4 h-4 shrink-0 text-red-400" />
                    <span>Incorrect text. Adjust the slider until the preview forms recognizable English words.</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Server Log Inspection Challenge */
            <div className="glass-specular p-6 sm:p-8 rounded-3xl border border-white/15 space-y-6">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">DFIR LOG ANALYSIS</span>
                <h2 className="text-lg sm:text-xl font-bold font-heading text-white">Apache & SSH Server Access Logs</h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Analyze the raw terminal log below to isolate attacker reconnaissance and identify suspicious failed authentication bursts.
                </p>
              </div>

              {/* ASCII Log Viewer */}
              <div className="p-4 rounded-2xl bg-[#050508] border border-white/20 font-mono text-[11px] text-zinc-300 overflow-x-auto shadow-inner leading-relaxed">
                <pre>{CH[1]?.art || `192.168.1.10 - - [17/Nov/2026:03:14:02] "GET /login HTTP/1.1" 200
185.220.101.5 - - [17/Nov/2026:03:14:05] "POST /api/auth HTTP/1.1" 401
185.220.101.5 - - [17/Nov/2026:03:14:06] "POST /api/auth HTTP/1.1" 401
185.220.101.5 - - [17/Nov/2026:03:14:07] "POST /api/auth HTTP/1.1" 401
185.220.101.5 - - [17/Nov/2026:03:14:08] "POST /api/auth HTTP/1.1" 401
192.168.1.10 - - [17/Nov/2026:03:15:00] "GET /dashboard HTTP/1.1" 200`}</pre>
              </div>

              {/* Log Question */}
              <div className="space-y-3">
                <p className="text-xs font-mono font-bold text-white">
                  Question: What attack pattern is demonstrated by IP 185.220.101.5 receiving multiple HTTP 401 statuses in one second?
                </p>

                <div className="space-y-2">
                  {[
                    "Distributed Denial of Service (DDoS)",
                    "Automated Credential Brute-Force / Password Guessing",
                    "SQL Injection in GET parameters",
                    "Normal background browser prefetching"
                  ].map((opt, i) => (
                    <div
                      key={i}
                      onClick={() => setLogSelectedAns(i)}
                      className={`p-3.5 rounded-xl border text-xs font-mono cursor-pointer transition-all ${
                        logSelectedAns === i 
                          ? i === 1 
                            ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                            : 'bg-red-950/40 border-red-500 text-red-200'
                          : 'bg-black/60 border-white/10 hover:border-white/30 text-zinc-300'
                      }`}
                    >
                      {opt}
                    </div>
                  ))}
                </div>

                {logSelectedAns !== null && (
                  <div className="p-4 rounded-xl bg-white/5 border border-white/15 text-xs font-mono text-zinc-300">
                    {logSelectedAns === 1 ? (
                      <span className="text-emerald-400 font-bold">✓ Correct (+15 XP)! Rapid consecutive 401 Unauthorized responses signify an automated dictionary password spray.</span>
                    ) : (
                      <span className="text-red-400 font-bold">✗ Incorrect. 401 Unauthorized means bad credentials were submitted repeatedly.</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
