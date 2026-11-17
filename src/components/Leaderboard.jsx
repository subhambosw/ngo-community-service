import React, { useState } from 'react';
import { 
  Trophy, 
  Award, 
  Users, 
  Flame, 
  ShieldCheck, 
  Search, 
  ArrowUpRight, 
  Zap, 
  ExternalLink,
  MessageSquare,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function Leaderboard({ userState }) {
  const [activeTab, setActiveTab] = useState('global'); // 'global' | 'weekly' | 'bounties'
  const [searchQuery, setSearchQuery] = useState('');

  const globalRoster = [
    { rank: 1, name: 'k3rn3l_p4n1c', handle: '@zero_day', xp: 2480, streak: 34, badge: 'ELITE THREAT HUNTER', country: 'SE' },
    { rank: 2, name: 'Ada_Lovelace_99', handle: '@crypto_queen', xp: 2210, streak: 28, badge: 'FORENSIC SPECIALIST', country: 'UK' },
    { rank: 3, name: 'c0balt_str1k3', handle: '@red_teamer', xp: 1950, streak: 22, badge: 'RED TEAM OPERATOR', country: 'US' },
    { rank: 4, name: 'Satoshi_N', handle: '@hash_master', xp: 1820, streak: 19, badge: 'CRYPTANALYST', country: 'JP' },
    { rank: 5, name: 'cyber_valkyrie', handle: '@defend_sys', xp: 1710, streak: 16, badge: 'SOC SENTINEL', country: 'DE' },
    { rank: 6, name: 'hex_dump_pro', handle: '@binary_ninja', xp: 1540, streak: 14, badge: 'MALWARE REVERSER', country: 'CA' },
    { rank: 7, name: 'packet_sniffer', handle: '@wireshark_guru', xp: 1420, streak: 12, badge: 'NETWORK DEFENDER', country: 'NL' },
    { rank: 8, name: 'phantom_root', handle: '@priv_esc', xp: 1280, streak: 11, badge: 'SECURITY ARCHITECT', country: 'CH' },
    { rank: 9, name: 'cyber_sentinel', handle: '@blue_team', xp: 1150, streak: 9, badge: 'INCIDENT COMMANDER', country: 'IN' },
    { rank: 10, name: 'byte_warden', handle: '@dfir_analyst', xp: 980, streak: 8, badge: 'VULN RESEARCHER', country: 'FR' },
    { rank: 14, name: 'N. Aggarwal (You)', handle: '@cyberbuddy_user', xp: userState?.xp || 460, streak: userState?.streak || 7, badge: 'ACTIVE OPERATOR', country: 'IN', isUser: true }
  ];

  const bounties = [
    {
      id: 1,
      title: 'Analyze Reverse Proxy AiTM Phishing Header',
      difficulty: 'HARD',
      reward: '+80 XP',
      desc: 'Inspect Evilginx session token interception logs and identify the stolen OAuth cookie before expiration.',
      participants: 412,
      active: true
    },
    {
      id: 2,
      title: 'Deobfuscate Base64 Encoded PowerShell Payload',
      difficulty: 'MEDIUM',
      reward: '+60 XP',
      desc: 'Decode nested XOR string masking in a malicious macro file and isolate the C2 staging IP address.',
      participants: 680,
      active: true
    },
    {
      id: 3,
      title: 'Calculate Collision Resistance of Weak Hash (MD5)',
      difficulty: 'EASY',
      reward: '+40 XP',
      desc: 'Generate two conflicting certificate payloads sharing an identical MD5 fingerprint to demonstrate collision risk.',
      participants: 890,
      active: true
    }
  ];

  const filteredRoster = globalRoster.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.handle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono tracking-wider uppercase mb-1">
            <Trophy className="w-3.5 h-3.5 text-white" /> Global Cyber Defense Community
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight">
            Leaderboard & Forensic Bounties
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Compare defensive acumen against security engineers worldwide, claim active forensic bounties, and climb global percentiles.
          </p>
        </div>

        {/* View Tabs */}
        <div className="flex bg-black/60 p-1 rounded-2xl border border-white/15 text-xs font-mono">
          <button
            onClick={() => setActiveTab('global')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'global' ? 'bg-white text-black font-bold shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Global Rankings
          </button>
          <button
            onClick={() => setActiveTab('bounties')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'bounties' ? 'bg-white text-black font-bold shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Active Bounties (3)
          </button>
        </div>
      </div>

      {activeTab === 'global' ? (
        <div className="space-y-6">
          
          {/* Top 3 Podium Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
            
            {/* Rank 2 */}
            <div className="p-6 rounded-3xl glass border border-white/15 text-center space-y-3 relative overflow-hidden order-2 md:order-1">
              <div className="w-12 h-12 rounded-2xl bg-zinc-400/10 border border-zinc-400/30 flex items-center justify-center mx-auto text-zinc-300 font-mono font-bold text-lg">
                #2
              </div>
              <div>
                <p className="font-bold text-white text-base">{globalRoster[1].name}</p>
                <p className="text-xs text-zinc-500 font-mono">{globalRoster[1].handle}</p>
              </div>
              <div className="inline-block px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-300">
                {globalRoster[1].badge}
              </div>
              <p className="text-xl font-black font-heading text-white pt-2">{globalRoster[1].xp} XP</p>
            </div>

            {/* Rank 1 (Gold / Elevated) */}
            <div className="p-7 rounded-3xl glass-specular border border-white/30 text-center space-y-3 relative overflow-hidden order-1 md:order-2 shadow-[0_0_40px_rgba(255,255,255,0.1)] -translate-y-2">
              <div className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center mx-auto font-mono font-black text-xl shadow-[0_0_25px_rgba(255,255,255,0.4)]">
                #1
              </div>
              <div>
                <p className="font-extrabold text-white text-lg">{globalRoster[0].name}</p>
                <p className="text-xs text-zinc-400 font-mono">{globalRoster[0].handle}</p>
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/25 text-[10px] font-mono text-white font-bold">
                {globalRoster[0].badge}
              </div>
              <p className="text-2xl font-black font-heading text-white pt-2">{globalRoster[0].xp} XP</p>
            </div>

            {/* Rank 3 */}
            <div className="p-6 rounded-3xl glass border border-white/15 text-center space-y-3 relative overflow-hidden order-3">
              <div className="w-12 h-12 rounded-2xl bg-zinc-600/10 border border-zinc-600/30 flex items-center justify-center mx-auto text-zinc-400 font-mono font-bold text-lg">
                #3
              </div>
              <div>
                <p className="font-bold text-white text-base">{globalRoster[2].name}</p>
                <p className="text-xs text-zinc-500 font-mono">{globalRoster[2].handle}</p>
              </div>
              <div className="inline-block px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-300">
                {globalRoster[2].badge}
              </div>
              <p className="text-xl font-black font-heading text-white pt-2">{globalRoster[2].xp} XP</p>
            </div>

          </div>

          {/* Search Filter & Table */}
          <div className="glass p-6 sm:p-8 rounded-3xl border border-white/15 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by operator name or handle..."
                  className="w-full bg-black/80 border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-white shadow-inner"
                />
              </div>
              <span className="text-xs font-mono text-zinc-400">
                Tracking 1,280 Verified Operators
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-zinc-500 uppercase text-[10px] tracking-wider">
                    <th className="pb-3 pl-2">Rank</th>
                    <th className="pb-3">Operator</th>
                    <th className="pb-3">Specialty Certification</th>
                    <th className="pb-3">Day Streak</th>
                    <th className="pb-3 text-right pr-2">Total XP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredRoster.map((op) => (
                    <tr 
                      key={op.rank} 
                      className={`transition-colors ${
                        op.isUser 
                          ? 'bg-white/10 font-bold border-l-2 border-white' 
                          : 'hover:bg-white/[0.04]'
                      }`}
                    >
                      <td className="py-3.5 pl-2 font-bold text-white">#{op.rank}</td>
                      <td className="py-3.5">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-bold">{op.name}</span>
                          <span className="text-zinc-500 text-[11px]">{op.handle}</span>
                          <span className="text-[10px] px-1 rounded bg-white/10 text-zinc-400">{op.country}</span>
                        </div>
                      </td>
                      <td className="py-3.5 text-zinc-300">
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px]">
                          {op.badge}
                        </span>
                      </td>
                      <td className="py-3.5 text-zinc-300 flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span>{op.streak} days</span>
                      </td>
                      <td className="py-3.5 text-right pr-2 text-white font-extrabold">{op.xp} XP</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      ) : (
        /* Bounties Tab */
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bounties.map((b) => (
              <div 
                key={b.id}
                className="glass p-6 rounded-3xl border border-white/15 space-y-4 flex flex-col justify-between hover:border-white/35 transition-all shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      b.difficulty === 'HARD' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                      b.difficulty === 'MEDIUM' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {b.difficulty}
                    </span>
                    <span className="text-xs font-mono font-bold text-white bg-white/10 px-2 py-0.5 rounded">
                      {b.reward}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white leading-snug">{b.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{b.desc}</p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-zinc-500">{b.participants} active submissions</span>
                  <button className="btn-glossy px-4 py-2 rounded-xl text-xs font-mono font-bold cursor-pointer">
                    Inspect Challenge &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
