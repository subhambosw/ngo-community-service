import React, { useState } from 'react';
import { Award, Shield, Printer, X, CheckCircle2 } from 'lucide-react';

export default function CertificateModal({ userState, onClose }) {
  const [name, setName] = useState(userState.userName || 'Alex Defender');

  const handlePrint = () => {
    window.print();
  };

  const certDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const certId = `CG-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-black border border-white/20 rounded-3xl p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,1)] space-y-6">
        
        {/* Modal Close Button */}
        <div className="flex justify-between items-center border-b border-white/10 pb-4 print:hidden">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <Award className="w-4 h-4 text-white" /> OFFICIAL CREDENTIAL ISSUANCE
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-xl bg-zinc-900 border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Printable Certificate Container (Black Glossy Platinum Finish) */}
        <div id="printable-certificate" className="bg-gradient-to-b from-zinc-950 via-black to-zinc-950 p-8 sm:p-12 rounded-2xl border-2 border-white/40 text-center space-y-6 relative overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.04] rounded-full blur-3xl pointer-events-none" />
          
          {/* Header Seal */}
          <div className="flex items-center justify-center gap-3">
            <div className="p-3.5 bg-white/[0.08] text-white rounded-2xl border border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              <Shield className="w-10 h-10" />
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-[10px] uppercase font-mono tracking-[0.3em] text-zinc-400">Certificate of Qualification</p>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">Cybersecurity Defense & Awareness</h1>
            <p className="text-xs text-zinc-500 font-mono">Issued by CyberGuard Pro Platform</p>
          </div>

          <p className="text-zinc-400 text-xs italic font-serif">
            This credential formally attests that
          </p>

          {/* Name Input */}
          <div className="py-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent border-b border-white/40 text-2xl sm:text-3xl font-bold font-heading text-white text-center focus:outline-none w-full max-w-md mx-auto tracking-wide"
              placeholder="Recipient Name"
            />
          </div>

          <p className="text-zinc-400 text-xs max-w-lg mx-auto leading-relaxed font-sans">
            has demonstrated operational knowledge in phishing threat detection, cryptographic entropy benchmarks, network traffic inspection, and digital privacy auditing.
          </p>

          {/* Verification Footer */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-500 gap-4">
            <div>
              <span className="block text-[9px] uppercase tracking-wider text-zinc-600">CREDENTIAL ID</span>
              <span className="text-white font-bold">{certId}</span>
            </div>
            <div>
              <span className="block text-[9px] uppercase tracking-wider text-zinc-600">DATE ISSUED</span>
              <span className="text-zinc-300">{certDate}</span>
            </div>
            <div>
              <span className="block text-[9px] uppercase tracking-wider text-zinc-600">STATUS</span>
              <span className="text-white font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED
              </span>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 print:hidden">
          <button
            onClick={handlePrint}
            className="flex-1 py-3.5 btn-glossy rounded-xl text-xs uppercase font-mono tracking-wider flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" /> Print / Save PDF Certificate
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3.5 btn-obsidian rounded-xl text-xs uppercase font-mono tracking-wider"
          >
            Dismiss
          </button>
        </div>

      </div>
    </div>
  );
}
