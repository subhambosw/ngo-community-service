import React from 'react';
import { Check, ChevronRight, Lock, KeyRound, AlertTriangle, Shield, Radio, FileCode, Award } from 'lucide-react';

export default function LessonsHub({ setActiveView }) {
  const tracks = [
    {
      id: 'password',
      num: '01',
      title: 'Password Foundations & Cryptographic Entropy',
      desc: 'Learn character set entropy, GPU cluster brute-force resistance, and how MFA neutralizes credential stuffing.',
      duration: '4 lessons · 18 min',
      completed: true,
      progress: 100,
      icon: KeyRound
    },
    {
      id: 'phishing',
      num: '02',
      title: 'Phishing Threat Detection & Forensics',
      desc: 'Inspect spoofed sender addresses, dissect artificial urgency tactics, and identify deceptive hyperlink destinations.',
      duration: '5 lessons · 25 min',
      completed: false,
      progress: 60,
      icon: AlertTriangle
    },
    {
      id: 'privacy',
      num: '03',
      title: 'Social Engineering & Digital Footprint',
      desc: 'Understand open-source intelligence (OSINT) scraping, app permissions boundaries, and least-privilege security.',
      duration: '3 lessons · 15 min',
      completed: false,
      progress: 25,
      icon: Shield
    },
    {
      id: 'network',
      num: '04',
      title: 'Safer Browsing & Network Encryption',
      desc: 'Public Wi-Fi risks, unencrypted packet sniffing, TLS 1.3 handshake verification, and VPN tunneling mechanics.',
      duration: '4 lessons · 22 min',
      completed: false,
      progress: 5,
      icon: Radio
    },
    {
      id: 'malware',
      num: '05',
      title: 'Malware Vectors & Double Extension Masks',
      desc: 'Analyze binary file masking techniques, malicious scripts (.vbs, .exe), and emergency containment procedures.',
      duration: '3 lessons · 16 min',
      completed: false,
      progress: 0,
      icon: FileCode
    },
    {
      id: 'quiz',
      num: '06',
      title: 'Certification Assessment & Credential Exam',
      desc: 'Comprehensive multi-disciplinary knowledge exam evaluating all completed security domains to earn a verifiable certificate.',
      duration: 'Final Exam · 10 min',
      completed: false,
      progress: 0,
      icon: Award
    }
  ];

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-[1400px] mx-auto">
      
      {/* Header */}
      <div className="border-b border-[#1e1e1e] pb-5">
        <p className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-semibold">
          SECURITY CURRICULUM
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight mt-1">
          Structured Learning Tracks
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Complete individual lesson tracks to raise your Security Score and unlock formal certification.
        </p>
      </div>

      {/* Tracks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {tracks.map((t) => (
          <div
            key={t.id}
            onClick={() => setActiveView(t.id)}
            className="bg-gradient-to-b from-[#18181b]/70 to-[#09090b]/90 backdrop-blur-2xl border border-white/15 hover:border-white/40 rounded-xl p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 group shadow-[0_15px_30px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.35)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.9),inset_0_1px_1.5px_rgba(255,255,255,0.55),0_0_20px_rgba(255,255,255,0.06)] hover:-translate-y-0.5"
          >
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono text-zinc-400 font-semibold tracking-wider">{t.num}</span>
                {t.completed ? (
                  <span className="flex items-center gap-1.5 text-[11px] font-mono text-white bg-white/10 px-2.5 py-0.5 rounded-full border border-white/25 shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" /> COMPLETED
                  </span>
                ) : (
                  <span className="text-[11px] font-mono text-zinc-400">
                    {t.duration}
                  </span>
                )}
              </div>

              <div className="flex items-start gap-3 mt-1">
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-white group-hover:text-black transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                  <t.icon className="w-4 h-4 text-zinc-300 group-hover:text-black transition-colors" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-zinc-100 transition-colors drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                    {t.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed font-medium">
                    {t.desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Progress & Action */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
              <div className="flex-1 bg-black/60 border border-white/10 h-1.5 rounded-full overflow-hidden p-[1px]">
                <div 
                  className="bg-gradient-to-r from-zinc-300 to-white h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(255,255,255,0.7)]" 
                  style={{ width: `${t.progress}%` }}
                />
              </div>
              <span className="text-xs font-mono text-zinc-300 group-hover:text-white flex items-center gap-1 shrink-0 font-semibold">
                Launch Lesson &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
