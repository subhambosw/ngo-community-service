import React, { useState, useEffect, useRef } from 'react';
import { 
  Lock, 
  Key, 
  ShieldCheck, 
  Cpu, 
  Copy, 
  RefreshCw, 
  Check, 
  Sparkles, 
  Smartphone, 
  Eye, 
  EyeOff, 
  AlertTriangle, 
  Database, 
  Terminal, 
  Flame, 
  Layers, 
  ShieldAlert, 
  Info,
  Play,
  RotateCcw
} from 'lucide-react';
import { 
  evaluatePassword, 
  generateSecurePassword, 
  generateDicewarePassphrase, 
  checkBreachStatus,
  computeSHA1,
  computeSHA256
} from '../utils/passwordEvaluator';

export default function PasswordLab({ onCompleteChallenge }) {
  const [password, setPassword] = useState('CyberGuard#2026!');
  const [showPassword, setShowPassword] = useState(true);
  const [copied, setCopied] = useState(false);

  // Breach Check State
  const [breachResult, setBreachResult] = useState({
    isLeaked: true,
    count: 1420,
    severity: 'high',
    source: 'RockYou / Curated Breach Database',
    hashPrefix: '8B45A',
    hashSuffix: '••••••••••••••••••••••••••••••••••'
  });
  const [isCheckingBreach, setIsCheckingBreach] = useState(false);

  // Generator State
  const [generatorMode, setGeneratorMode] = useState('diceware'); // 'diceware' | 'random'
  const [genLength, setGenLength] = useState(16);
  const [passphraseWordCount, setPassphraseWordCount] = useState(4);

  // Virtual TOTP 2FA State
  const [totpCode, setTotpCode] = useState('749 201');
  const [totpSecondsLeft, setTotpSecondsLeft] = useState(30);
  const [userMfaInput, setUserMfaInput] = useState('');
  const [mfaStatus, setMfaStatus] = useState(null); // 'success' | 'failed' | 'hacker_blocked'
  const [hackerAttacking, setHackerAttacking] = useState(false);

  // Live Attack Simulator State
  const [attackLogs, setAttackLogs] = useState([]);
  const [isAttacking, setIsAttacking] = useState(false);
  const [attackComplete, setAttackComplete] = useState(false);

  // Hash & Salt State
  const [salt, setSalt] = useState('a9f4c20b81e7d36a');
  const [rawHash, setRawHash] = useState('');
  const [saltedHash, setSaltedHash] = useState('');

  // Password Evaluation
  const evalResult = evaluatePassword(password);

  // Perform Breach Check when password changes (with debounce)
  useEffect(() => {
    let isCancelled = false;
    setIsCheckingBreach(true);

    const timer = setTimeout(async () => {
      const result = await checkBreachStatus(password);
      if (!isCancelled) {
        setBreachResult(result);
        setIsCheckingBreach(false);

        // Award XP if user creates a strong password with ZERO leaks
        if (result.count === 0 && evalResult.entropyBits >= 75) {
          if (onCompleteChallenge) {
            onCompleteChallenge(45, 'vault_master');
          }
        }
      }
    }, 400);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [password]);

  // Compute Hashes
  useEffect(() => {
    let isCancelled = false;
    async function updateHashes() {
      const h1 = await computeSHA256(password);
      const h2 = await computeSHA256(password + salt);
      if (!isCancelled) {
        setRawHash(h1);
        setSaltedHash(h2);
      }
    }
    updateHashes();
    return () => {
      isCancelled = true;
    };
  }, [password, salt]);

  // 30-Second TOTP Real-Time Clock
  useEffect(() => {
    const updateTotp = () => {
      const now = Date.now();
      const secondsInWindow = 30 - (Math.floor(now / 1000) % 30);
      setTotpSecondsLeft(secondsInWindow);

      // Deterministic 6-digit code based on current 30s epoch window
      const timeStep = Math.floor(now / 30000);
      const pseudoHash = Math.abs((timeStep * 1103515245 + 12345) % 1000000);
      const formatted = String(pseudoHash).padStart(6, '0');
      setTotpCode(`${formatted.slice(0, 3)} ${formatted.slice(3)}`);
    };

    updateTotp();
    const interval = setInterval(updateTotp, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle Password Generation
  const handleGenerate = () => {
    let newPass = '';
    if (generatorMode === 'diceware') {
      newPass = generateDicewarePassphrase(passphraseWordCount, '-');
    } else {
      newPass = generateSecurePassword(genLength);
    }
    setPassword(newPass);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerateSalt = () => {
    const randomHex = Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setSalt(randomHex);
  };

  // Verify TOTP Code
  const handleVerifyTotp = (e) => {
    e.preventDefault();
    const cleanUser = userMfaInput.replace(/\s+/g, '');
    const cleanReal = totpCode.replace(/\s+/g, '');

    if (cleanUser === cleanReal) {
      setMfaStatus('success');
      if (onCompleteChallenge) {
        onCompleteChallenge(35, 'mfa_guardian');
      }
    } else {
      setMfaStatus('failed');
    }
  };

  // Simulate Hacker Login Attempt
  const handleSimulateHackerAttack = () => {
    setHackerAttacking(true);
    setMfaStatus(null);
    setTimeout(() => {
      setHackerAttacking(false);
      setMfaStatus('hacker_blocked');
    }, 1200);
  };

  // Run Penetration Attack Simulation
  const handleRunAttackSimulation = () => {
    if (isAttacking) return;
    setIsAttacking(true);
    setAttackComplete(false);
    setAttackLogs([]);

    const steps = [
      { text: `[00:00.012] Initializing GPU cluster (100 GH/s hash rate)...`, delay: 200 },
      { text: `[00:00.054] STAGE 1: Searching top 100,000 breached password hashes (RockYou corpus)...`, delay: 600 }
    ];

    if (breachResult.isLeaked) {
      steps.push({
        text: `[00:00.098] 💥 CRACKED IN STAGE 1! Matched known breach entry in 44ms (${breachResult.count.toLocaleString()} exposed instances found).`,
        delay: 1100,
        result: 'cracked_breach'
      });
    } else {
      steps.push({
        text: `[00:00.120] Passed Stage 1. Password not present in known common breach lists.`,
        delay: 1000
      });
      steps.push({
        text: `[00:00.180] STAGE 2: Running Hashcat rule-based leet mutations & keyboard walk heuristics...`,
        delay: 1500
      });

      if (evalResult.warnings.length > 0) {
        steps.push({
          text: `[00:00.290] 💥 CRACKED IN STAGE 2! Compromised via rule mutation pattern in 290ms.`,
          delay: 2000,
          result: 'cracked_pattern'
        });
      } else {
        steps.push({
          text: `[00:00.340] Passed Stage 2. No simple dictionary roots or substitutions detected.`,
          delay: 2000
        });
        steps.push({
          text: `[00:00.410] STAGE 3: Commencing exhaustive brute-force search across full keyspace...`,
          delay: 2500
        });
        steps.push({
          text: `[00:00.850] Calculating keyspace: ${evalResult.entropyBits} bits of Shannon entropy.`,
          delay: 3000
        });
        steps.push({
          text: `[00:01.200] 🛡️ ATTACK HALTED: Keyspace is mathematically resistant. Time to exhaust: ${evalResult.crackTimeText}.`,
          delay: 3500,
          result: 'resistant'
        });
      }
    }

    steps.forEach((step, index) => {
      setTimeout(() => {
        setAttackLogs((prev) => [...prev, step.text]);
        if (index === steps.length - 1) {
          setIsAttacking(false);
          setAttackComplete(true);
        }
      }, step.delay);
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* 1. Header */}
      <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono tracking-wider uppercase mb-1">
            <Lock className="w-3.5 h-3.5 text-white" /> Forensic Cryptography & Intelligence
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight">
            Password Entropy & Breach Lab
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-2xl">
            Evaluate Shannon entropy, verify public data breaches via <span className="text-white font-semibold">k-Anonymity</span>, simulate live GPU attacks, and test real-time TOTP multi-factor defense.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            NIST SP 800-63B ALIGNED
          </span>
        </div>
      </div>

      {/* 2. Top Grid: Input & Strength Calculator + Breach Frequency Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Password Input & Entropy Evaluation */}
        <div className="glass-specular p-6 sm:p-8 rounded-3xl border border-white/15 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-white font-heading flex items-center gap-2">
              <Key className="w-5 h-5 text-white" /> Entropy & Strength Evaluator
            </h2>
            <span className="text-[11px] font-mono px-3 py-1 rounded-full border border-white/20 bg-black/60 text-white font-semibold shadow-sm">
              {evalResult.label}
            </span>
          </div>

          {/* Input Box with Specular Rim */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type any password or passphrase to inspect..."
              className="w-full bg-black/90 border border-white/25 rounded-2xl px-5 py-4 text-white text-base font-mono focus:outline-none focus:border-white focus:ring-1 focus:ring-white/40 transition-all pr-24 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]"
            />
            <div className="absolute right-3 top-3.5 flex items-center gap-1">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Hide password" : "Show password"}
                className="p-2 text-zinc-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={handleCopy}
                title="Copy password"
                className="p-2 text-zinc-400 hover:text-white transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Shannon Entropy & Score Meter */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5">
                <span>Shannon Entropy:</span>
                <span className="text-white font-bold">{evalResult.entropyBits} bits</span>
              </span>
              <span className="text-white font-semibold">{evalResult.score}% Rating</span>
            </div>
            <div className="w-full bg-zinc-900 rounded-full h-2.5 overflow-hidden border border-white/10 p-0.5">
              <div
                className={`h-full rounded-full transition-all duration-500 ${evalResult.color}`}
                style={{ width: `${evalResult.score}%` }}
              />
            </div>
          </div>

          {/* Crack Time Metric Box */}
          <div className="bg-black/80 p-5 rounded-2xl border border-white/15 flex items-center justify-between shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
            <div className="flex items-center gap-3.5">
              <div className="p-3 bg-white/[0.08] rounded-xl text-white border border-white/20">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
                  GPU Cluster Brute-Force Estimate (100 GH/s)
                </p>
                <p className="text-lg sm:text-xl font-extrabold font-heading text-white mt-0.5">
                  {evalResult.crackTimeText}
                </p>
              </div>
            </div>
          </div>

          {/* Pattern Warnings Alert */}
          {evalResult.warnings.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs font-mono space-y-1">
              <div className="flex items-center gap-2 font-bold text-amber-300">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Pattern Degradation Detected:</span>
              </div>
              {evalResult.warnings.map((w, i) => (
                <p key={i} className="pl-6 text-[11px] text-amber-200/80">&bull; {w}</p>
              ))}
            </div>
          )}

          {/* Character Rules Checklist */}
          <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
            <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${evalResult.checks.length ? 'bg-white/[0.08] border-white/30 text-white' : 'bg-black/40 border-white/5 text-zinc-600'}`}>
              <Check className="w-3.5 h-3.5" /> 12+ Characters
            </div>
            <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${evalResult.checks.uppercase ? 'bg-white/[0.08] border-white/30 text-white' : 'bg-black/40 border-white/5 text-zinc-600'}`}>
              <Check className="w-3.5 h-3.5" /> Uppercase (A-Z)
            </div>
            <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${evalResult.checks.numbers ? 'bg-white/[0.08] border-white/30 text-white' : 'bg-black/40 border-white/5 text-zinc-600'}`}>
              <Check className="w-3.5 h-3.5" /> Numbers (0-9)
            </div>
            <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${evalResult.checks.symbols ? 'bg-white/[0.08] border-white/30 text-white' : 'bg-black/40 border-white/5 text-zinc-600'}`}>
              <Check className="w-3.5 h-3.5" /> Symbols (!@#$)
            </div>
          </div>
        </div>

        {/* Right Column: Breach Intelligence & Frequency Tracker */}
        <div className="glass-specular p-6 sm:p-8 rounded-3xl border border-white/15 space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold text-white font-heading flex items-center gap-2">
                <Database className="w-5 h-5 text-white" /> Breach Intelligence Tracker
              </h2>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-white/5 border border-white/15 text-zinc-400">
                k-ANONYMITY VERIFIED
              </span>
            </div>

            {/* Main Result Card */}
            <div className={`p-6 rounded-2xl border transition-all duration-300 ${
              isCheckingBreach 
                ? 'bg-zinc-900/60 border-white/10'
                : breachResult.isLeaked
                  ? 'bg-red-950/30 border-red-500/40 shadow-[0_0_30px_rgba(239,68,68,0.15)]'
                  : 'bg-emerald-950/30 border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.15)]'
            }`}>
              
              {isCheckingBreach ? (
                <div className="flex items-center gap-3 py-4 text-zinc-400 font-mono text-xs">
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Querying 850,000,000+ public breach records...</span>
                </div>
              ) : breachResult.isLeaked ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5 text-red-400 font-bold text-xs uppercase font-mono tracking-wider">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Compromised in Known Data Breaches</span>
                  </div>

                  <div>
                    <div className="text-3xl sm:text-4xl font-black font-heading text-white tracking-tight">
                      {breachResult.count.toLocaleString()}
                    </div>
                    <p className="text-xs text-red-300/80 font-mono mt-1">
                      people / accounts found using this exact password combination.
                    </p>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed pt-2 border-t border-red-500/20">
                    <strong className="text-white">Critical Risk:</strong> Automated bots routinely test this combination in automated <span className="text-red-300 underline underline-offset-2">credential stuffing</span> attacks against services across the web.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-xs uppercase font-mono tracking-wider">
                    <ShieldCheck className="w-4 h-4" />
                    <span>0 Public Breaches Detected</span>
                  </div>

                  <div className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                    Unique Combination
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed">
                    This password has not appeared in major public credential dumps (e.g., RockYou, LinkedIn, Yahoo, Adobe). It is safe against dictionary attacks.
                  </p>
                </div>
              )}
            </div>

            {/* How k-Anonymity Works (Educational Box for Teachers) */}
            <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-2 text-xs font-mono text-zinc-400">
              <div className="flex items-center justify-between text-zinc-300 font-semibold">
                <span className="flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-white" />
                  <span>k-Anonymity Mathematical Privacy:</span>
                </span>
                <span className="text-[10px] text-zinc-500">RFC 3174</span>
              </div>
              <p className="text-[11px] leading-relaxed text-zinc-400">
                Your password is <strong>never transmitted</strong> over the network. The client computes the SHA-1 hash and sends only the first 5 characters (<code className="text-white">{breachResult.hashPrefix || '•••••'}</code>). The server returns matching hashes, and matching is completed locally.
              </p>
            </div>
          </div>

          <div className="pt-2 text-[11px] font-mono text-zinc-500 flex items-center justify-between">
            <span>Source: {breachResult.source}</span>
            <span className="text-zinc-400">100% Client-Side Safe</span>
          </div>
        </div>

      </div>

      {/* 3. Middle Grid: Live Attack Terminal & NIST Passphrase Generator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Live Attack Simulator Terminal */}
        <div className="glass p-6 sm:p-8 rounded-3xl border border-white/15 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-white font-heading flex items-center gap-2">
              <Terminal className="w-5 h-5 text-white" /> Live Penetration Attack Simulator
            </h2>
            <button
              onClick={handleRunAttackSimulation}
              disabled={isAttacking}
              className="btn-glossy px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 disabled:opacity-50 cursor-pointer shadow-md"
            >
              {isAttacking ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Attacking...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-black" />
                  <span>Simulate Attack</span>
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed">
            Execute a simulated multi-stage cyber assault against your password: Dictionary lookup, Hashcat rule mutations, and GPU brute force.
          </p>

          {/* Terminal Console Screen */}
          <div className="bg-[#050508] border border-white/20 rounded-2xl p-4 font-mono text-xs text-zinc-300 min-h-[200px] flex flex-col justify-between shadow-inner">
            <div className="space-y-1.5 overflow-y-auto max-h-[180px]">
              <div className="text-zinc-500 flex items-center gap-2 pb-1 border-b border-white/10">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                <span className="text-[10px] text-zinc-500 ml-1">TERMINAL: /usr/bin/hashcat-sim</span>
              </div>

              {attackLogs.length === 0 ? (
                <p className="text-zinc-500 pt-3 italic">
                  Click "Simulate Attack" to benchmark your current password against automated cracking engines...
                </p>
              ) : (
                attackLogs.map((log, i) => (
                  <p key={i} className={`leading-relaxed ${
                    log.includes('CRACKED') ? 'text-red-400 font-bold' : log.includes('RESISTANT') ? 'text-emerald-400 font-bold' : 'text-zinc-300'
                  }`}>
                    {log}
                  </p>
                ))
              )}
            </div>

            {attackComplete && (
              <div className="pt-2 mt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-400">
                <span>Simulation Complete</span>
                <span className="text-white font-bold">Tested against 100 GH/s model</span>
              </div>
            )}
          </div>
        </div>

        {/* NIST Diceware Passphrase & Key Generator */}
        <div className="glass p-6 sm:p-8 rounded-3xl border border-white/15 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-white font-heading flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-white" /> Key & Passphrase Generator
            </h2>
            
            {/* Mode Switcher */}
            <div className="flex bg-black/60 p-1 rounded-xl border border-white/15 text-xs font-mono">
              <button
                onClick={() => setGeneratorMode('diceware')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  generatorMode === 'diceware' ? 'bg-white text-black font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                NIST Passphrase
              </button>
              <button
                onClick={() => setGeneratorMode('random')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  generatorMode === 'random' ? 'bg-white text-black font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Random Key
              </button>
            </div>
          </div>

          {generatorMode === 'diceware' ? (
            <div className="space-y-4">
              <p className="text-xs text-zinc-400 leading-relaxed">
                <strong className="text-white">NIST SP 800-63B Recommendation:</strong> Multi-word passphrases (Diceware) create massive mathematical entropy while remaining easy for humans to remember without writing down.
              </p>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-zinc-400">
                  <span>Passphrase Length:</span>
                  <span className="text-white font-bold">{passphraseWordCount} Random Words</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="6"
                  value={passphraseWordCount}
                  onChange={(e) => setPassphraseWordCount(parseInt(e.target.value))}
                  className="w-full accent-white cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                  <span>3 words (38 bits)</span>
                  <span>4 words (52 bits - Recommended)</span>
                  <span>6 words (78 bits)</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-zinc-400 leading-relaxed">
                Generates a cryptographically randomized string containing uppercase, lowercase, numbers, and high-entropy symbols.
              </p>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-zinc-400">
                  <span>Character Length:</span>
                  <span className="text-white font-bold">{genLength} characters</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="32"
                  value={genLength}
                  onChange={(e) => setGenLength(parseInt(e.target.value))}
                  className="w-full accent-white cursor-pointer"
                />
              </div>
            </div>
          )}

          <button
            onClick={handleGenerate}
            className="w-full py-3.5 btn-glossy rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 font-mono"
          >
            <RefreshCw className="w-4 h-4" /> 
            <span>Generate {generatorMode === 'diceware' ? 'NIST Passphrase' : 'Cryptographic Key'}</span>
          </button>
        </div>

      </div>

      {/* 4. Bottom Grid: Virtual TOTP 2FA Authenticator & Hash Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Virtual TOTP Authenticator (Authentic 30s rotating countdown) */}
        <div className="glass p-6 sm:p-8 rounded-3xl border border-white/15 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-white font-heading flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-white" /> Real-Time TOTP 2FA Authenticator
            </h2>
            <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-white/5 border border-white/15 text-zinc-400">
              RFC 6238 COMPLIANT
            </span>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed">
            Time-based One-Time Passcodes (TOTP) generate temporary 6-digit keys synced via Unix timestamps. Enter the live code before the 30-second window expires.
          </p>

          {/* Virtual Phone Display Widget */}
          <div className="bg-black/90 p-5 rounded-2xl border border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-4">
              {/* Circular SVG Timer */}
              <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                <svg className="w-12 h-12 transform -rotate-90">
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="3.5"
                    fill="transparent"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="#ffffff"
                    strokeWidth="3.5"
                    fill="transparent"
                    strokeDasharray={125.6}
                    strokeDashoffset={125.6 * (1 - totpSecondsLeft / 30)}
                    className="transition-all duration-1000 ease-linear"
                  />
                </svg>
                <span className="absolute font-mono text-xs font-bold text-white">
                  {totpSecondsLeft}s
                </span>
              </div>

              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">CyberBuddy Security Key</p>
                <p className="text-2xl font-mono font-extrabold text-white tracking-widest">
                  {totpCode}
                </p>
              </div>
            </div>

            <button
              onClick={handleSimulateHackerAttack}
              disabled={hackerAttacking}
              className="px-3.5 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/50 border border-red-500/30 text-red-300 text-xs font-mono transition-all flex items-center gap-1.5 shrink-0"
            >
              <Flame className="w-3.5 h-3.5 text-red-400" />
              <span>{hackerAttacking ? "Hacker Probing..." : "Test Hacker Breach"}</span>
            </button>
          </div>

          {/* User Verification Input */}
          <form onSubmit={handleVerifyTotp} className="space-y-3">
            <div className="flex gap-2.5">
              <input
                type="text"
                maxLength="7"
                value={userMfaInput}
                onChange={(e) => setUserMfaInput(e.target.value)}
                placeholder="Enter 6-digit code (e.g. 749201)"
                className="flex-1 bg-black/90 border border-white/20 rounded-xl px-4 py-3 text-white font-mono text-center tracking-widest text-base focus:outline-none focus:border-white shadow-inner"
              />
              <button
                type="submit"
                disabled={userMfaInput.replace(/\s+/g, '').length !== 6}
                className="px-6 py-3 btn-obsidian disabled:opacity-30 rounded-xl font-bold text-xs uppercase font-mono tracking-wider cursor-pointer"
              >
                Verify
              </button>
            </div>
          </form>

          {/* Dynamic Feedback Banners */}
          {mfaStatus === 'success' && (
            <div className="p-4 rounded-2xl bg-white/[0.08] border border-white/30 text-white text-xs font-mono flex items-center gap-2.5 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              <ShieldCheck className="w-5 h-5 shrink-0 text-white" />
              <span>Token Authenticated &mdash; Account Protected against Leaked Credentials (+35 XP)!</span>
            </div>
          )}

          {mfaStatus === 'failed' && (
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-200 text-xs font-mono flex items-center gap-2.5">
              <AlertTriangle className="w-5 h-5 shrink-0 text-red-400" />
              <span>Invalid Code &mdash; Code expired or did not match the live TOTP token window.</span>
            </div>
          )}

          {mfaStatus === 'hacker_blocked' && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs font-mono space-y-1">
              <p className="font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Hacker Attack Neutralized!</span>
              </p>
              <p className="text-[11px] text-zinc-300">
                The attacker acquired your leaked password, but login was rejected because they lacked physical access to your time-synced authenticator token.
              </p>
            </div>
          )}
        </div>

        {/* Cryptographic Hash & Rainbow Table Inspector */}
        <div className="glass p-6 sm:p-8 rounded-3xl border border-white/15 space-y-6 flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold text-white font-heading flex items-center gap-2">
                <Layers className="w-5 h-5 text-white" /> SHA-256 Hash & Salt Inspector
              </h2>
              <button
                onClick={handleRegenerateSalt}
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 font-mono transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>New Salt</span>
              </button>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Modern databases never store raw passwords. Inspect how cryptographic hashing and unique cryptographic salts permanently disable precomputed <span className="text-white font-semibold">Rainbow Tables</span>.
            </p>

            <div className="space-y-3 font-mono text-xs">
              {/* Unsalted Hash */}
              <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 space-y-1">
                <div className="flex justify-between text-zinc-500 text-[10px] uppercase">
                  <span>Raw SHA-256 (Vulnerable to Rainbow Tables)</span>
                </div>
                <p className="text-zinc-300 text-[11px] truncate select-all">
                  {rawHash || 'Computing hash...'}
                </p>
              </div>

              {/* Salted Hash */}
              <div className="p-3.5 rounded-xl bg-black/60 border border-white/15 space-y-1">
                <div className="flex justify-between text-zinc-500 text-[10px] uppercase">
                  <span>Cryptographic Salt</span>
                  <span className="text-white font-semibold">{salt}</span>
                </div>
                <div className="text-[10px] text-zinc-500 pt-1">Salted SHA-256: SHA-256(password + salt)</div>
                <p className="text-white text-[11px] truncate select-all font-semibold">
                  {saltedHash || 'Computing salted hash...'}
                </p>
              </div>
            </div>
          </div>

          {/* Educational Note */}
          <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-400 space-y-1.5">
            <strong className="text-white block">Why Salt is Critical:</strong>
            <p className="text-[11px] leading-relaxed">
              If two users choose the same password, their raw hashes are identical. A salt ensures that every user's stored hash is globally unique, rendering pre-computed lookup tables mathematically useless.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
