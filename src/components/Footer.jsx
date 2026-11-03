import React from 'react';
import { Shield, Lock } from 'lucide-react';

export default function Footer({ setActiveView }) {
  return (
    <footer className="border-t border-white/10 bg-black mt-20 py-12 text-zinc-500 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/[0.06] rounded-xl border border-white/20">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading text-lg font-bold text-white tracking-tight">
              CYBER<span className="text-zinc-500 font-light">GUARD</span> PRO
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono">
            <button onClick={() => setActiveView('hero')} className="hover:text-white transition-colors">HOME</button>
            <button onClick={() => setActiveView('phishing')} className="hover:text-white transition-colors">PHISHING</button>
            <button onClick={() => setActiveView('password')} className="hover:text-white transition-colors">VAULT</button>
            <button onClick={() => setActiveView('privacy')} className="hover:text-white transition-colors">PRIVACY</button>
            <button onClick={() => setActiveView('network')} className="hover:text-white transition-colors">NETWORK</button>
            <button onClick={() => setActiveView('malware')} className="hover:text-white transition-colors">MALWARE</button>
            <button onClick={() => setActiveView('quiz')} className="hover:text-white transition-colors">CERTIFICATION</button>
            <button onClick={() => setActiveView('glossary')} className="hover:text-white transition-colors">GLOSSARY</button>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-600 gap-4">
          <p>&copy; {new Date().getFullYear()} CyberGuard Pro. High-Security Awareness & Educational Intelligence.</p>
          <p className="flex items-center gap-1.5 text-zinc-500">
            Zero-Knowledge Cryptography <Lock className="w-3 h-3 text-white inline" />
          </p>
        </div>

      </div>
    </footer>
  );
}
