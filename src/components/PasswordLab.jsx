import React, { useState } from 'react';
import { Lock, Key, ShieldCheck, Cpu, Copy, RefreshCw, Check, Sparkles, Smartphone, Eye, EyeOff } from 'lucide-react';
import { evaluatePassword, generateSecurePassword } from '../utils/passwordEvaluator';

export default function PasswordLab({ onCompleteChallenge }) {
  const [password, setPassword] = useState('CyberGuard#2026!');
  const [showPassword, setShowPassword] = useState(true);
  const [genLength, setGenLength] = useState(16);
  const [copied, setCopied] = useState(false);
  const [mfaCode, setMfaCode] = useState('');
  const [mfaVerified, setMfaVerified] = useState(false);

  const evalResult = evaluatePassword(password);

  const handleGenerate = () => {
    const newPass = generateSecurePassword(genLength);
    setPassword(newPass);
    if (evaluatePassword(newPass).entropyBits >= 80) {
      onCompleteChallenge(40, 'vault_master');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerifyMfa = (e) => {
    e.preventDefault();
    if (mfaCode.length === 6) {
      setMfaVerified(true);
      onCompleteChallenge(30);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Module Title */}
      <div className="border-b border-white/10 pb-6">
        <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono tracking-wider uppercase mb-1">
          <Lock className="w-3.5 h-3.5 text-white" /> Cryptographic Vault & Tool
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight">Password & MFA Cryptographic Lab</h1>
        <p className="text-zinc-500 text-xs sm:text-sm mt-1">
          Calculate Shannon entropy in bits, benchmark GPU cluster brute-force resistance, generate keys, and test TOTP simulation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Real-time Strength Evaluator (Glossy Obsidian) */}
        <div className="glass-specular p-8 rounded-3xl border border-white/15 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white font-heading flex items-center gap-2">
              <Key className="w-5 h-5 text-white" /> Entropy & Crack Calculator
            </h2>
            <span className={`text-[11px] font-mono px-3 py-1 rounded-full border border-white/20 bg-black/60 text-white font-semibold`}>
              {evalResult.label}
            </span>
          </div>

          {/* Input Field with Specular Rim */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (evaluatePassword(e.target.value).entropyBits >= 80) {
                  onCompleteChallenge(40, 'vault_master');
                }
              }}
              placeholder="Type any passphrase to inspect..."
              className="w-full bg-black/90 border border-white/20 rounded-2xl px-5 py-4 text-white text-base font-mono focus:outline-none focus:border-white focus:ring-1 focus:ring-white/40 transition-all pr-24 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]"
            />
            <div className="absolute right-3 top-3.5 flex items-center gap-1">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-2 text-zinc-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="p-2 text-zinc-500 hover:text-white transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Strength Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-zinc-400">
              <span>Shannon Entropy: {evalResult.entropyBits} bits</span>
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
                <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Multi-GPU Brute-Force Crack Estimate</p>
                <p className={`text-xl font-extrabold font-heading text-white`}>
                  {evalResult.crackTimeText}
                </p>
              </div>
            </div>
          </div>

          {/* Character Rules Checklist */}
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className={`p-3 rounded-xl border flex items-center gap-2 ${evalResult.checks.length ? 'bg-white/[0.08] border-white/30 text-white' : 'bg-black/40 border-white/5 text-zinc-600'}`}>
              <Check className="w-4 h-4" /> 12+ Characters
            </div>
            <div className={`p-3 rounded-xl border flex items-center gap-2 ${evalResult.checks.uppercase ? 'bg-white/[0.08] border-white/30 text-white' : 'bg-black/40 border-white/5 text-zinc-600'}`}>
              <Check className="w-4 h-4" /> Uppercase (A-Z)
            </div>
            <div className={`p-3 rounded-xl border flex items-center gap-2 ${evalResult.checks.numbers ? 'bg-white/[0.08] border-white/30 text-white' : 'bg-black/40 border-white/5 text-zinc-600'}`}>
              <Check className="w-4 h-4" /> Numbers (0-9)
            </div>
            <div className={`p-3 rounded-xl border flex items-center gap-2 ${evalResult.checks.symbols ? 'bg-white/[0.08] border-white/30 text-white' : 'bg-black/40 border-white/5 text-zinc-600'}`}>
              <Check className="w-4 h-4" /> Symbols (!@#$)
            </div>
          </div>
        </div>

        {/* Password Generator & MFA Simulator */}
        <div className="space-y-8">
          
          {/* Password Generator */}
          <div className="glass p-8 rounded-3xl border border-white/15 space-y-6">
            <h2 className="text-lg font-bold text-white font-heading flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-white" /> Cryptographic Key Generator
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between text-xs font-mono text-zinc-400">
                <span>Key Length:</span>
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

            <button
              onClick={handleGenerate}
              className="w-full py-3.5 btn-glossy rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 font-mono"
            >
              <RefreshCw className="w-4 h-4" /> Generate High-Entropy Key
            </button>
          </div>

          {/* 2FA Authenticator Simulator */}
          <div className="glass p-8 rounded-3xl border border-white/15 space-y-6">
            <h2 className="text-lg font-bold text-white font-heading flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-zinc-300" /> TOTP 2FA Verification Simulator
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Test how time-based one-time passcodes prevent unauthorized account access even if credentials are leaked.
            </p>

            <form onSubmit={handleVerifyMfa} className="space-y-4">
              <div className="flex gap-2.5">
                <input
                  type="text"
                  maxLength="6"
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="6-digit code (e.g. 849201)"
                  className="flex-1 bg-black/90 border border-white/20 rounded-xl px-4 py-3 text-white font-mono text-center tracking-widest text-base focus:outline-none focus:border-white"
                />
                <button
                  type="submit"
                  disabled={mfaCode.length !== 6}
                  className="px-6 py-3 btn-obsidian disabled:opacity-30 rounded-xl font-bold text-xs uppercase font-mono tracking-wider"
                >
                  Verify
                </button>
              </div>
            </form>

            {mfaVerified && (
              <div className="p-4 rounded-2xl bg-white/[0.08] border border-white/30 text-white text-xs font-mono flex items-center gap-2.5 animate-fade-in shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                <ShieldCheck className="w-5 h-5 shrink-0 text-white" />
                <span>MFA Token Verified &mdash; Attack Surface Neutralized (+30 XP)</span>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
