import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  ExternalLink, 
  Search, 
  Calendar, 
  Building2, 
  ArrowRight, 
  Check, 
  Flame, 
  Smartphone, 
  QrCode, 
  FileText, 
  Bell, 
  Lock, 
  Zap, 
  HelpCircle,
  Clock,
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function CyberAlerts({ onAwardXP }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState('snowflake');
  const [completedSteps, setCompletedSteps] = useState({});

  const alerts = [
    {
      id: 'snowflake',
      title: 'Global Cloud Credential Stuffing Attack (Snowflake Outbreak)',
      category: 'breach',
      severity: 'CRITICAL',
      date: 'Recent Global Alert',
      targets: 'Ticketmaster, Santander, QuoteWizard & 165+ Enterprises',
      impact: 'Over 500 million records compromised due to stolen passwords without Multi-Factor Authentication (MFA).',
      howItHappened: 'Attackers did not hack the cloud infrastructure itself. Instead, they bought stolen employee passwords from past malware infections (infostealers) on the dark web. Because the victim accounts had NO Multi-Factor Authentication (MFA) enabled, the hackers logged right into the database like regular staff.',
      easyExplanation: 'Imagine having an expensive bank vault door, but leaving the master key under the doormat. Anyone who found the key could walk in without having to show an ID.',
      steps: [
        {
          id: 'sf-1',
          title: 'Turn on Multi-Factor Authentication (MFA) on Every Account',
          desc: 'Go to your Gmail, university portal, banking, and social media settings. Turn on 2-Step Verification using an authenticator app (like Google Authenticator or Microsoft Authenticator) instead of simple SMS text messages.'
        },
        {
          id: 'sf-2',
          title: 'Never Reuse the Same Password Across Multiple Websites',
          desc: 'If a hacker steals your password from one weak website, they will automatically try that exact same email and password combination on Netflix, Amazon, your bank, and your email within seconds.'
        },
        {
          id: 'sf-3',
          title: 'Remove Saved Passwords from Your Web Browser Autofill',
          desc: 'Infostealer malware specifically targets Chrome and Edge saved password vaults. Use an encrypted password manager (like Bitwarden or 1Password) instead of saving passwords directly in browser popups.'
        },
        {
          id: 'sf-4',
          title: 'Check If Your Email Was Leaked on HaveIBeenPwned',
          desc: 'Search your primary email address on trusted breach databases to see which past security leaks exposed your credentials so you can change those passwords immediately.'
        }
      ]
    },
    {
      id: 'healthcare',
      title: 'Change Healthcare / UnitedHealth Ransomware Catastrophe',
      category: 'ransomware',
      severity: 'CRITICAL',
      date: 'Recent Healthcare Alert',
      targets: 'Hospitals, Pharmacies, Medical Centers Nationwide',
      impact: 'Over 100 million medical files exposed; nationwide pharmacy prescription billing and claim processing frozen for weeks.',
      howItHappened: 'The criminal ransomware cartel (ALPHV/BlackCat) gained entry into the network through an old remote-access portal (Citrix) using a single stolen staff password that had NO two-factor authentication. Once inside, they silently encrypted servers and demanded a $22 million cryptocurrency ransom.',
      easyExplanation: 'A burglar found one old unlocked basement window, entered the hospital records department at midnight, locked all patient files in a safe, and demanded ransom money for the key.',
      steps: [
        {
          id: 'hc-1',
          title: 'Place a Free Credit Freeze at the 3 Major Credit Bureaus',
          desc: 'Lock your credit file at Experian, Equifax, and TransUnion. This completely blocks scammers from opening new credit cards, bank accounts, or loans in your name using your leaked Social Security or Aadhaar details.'
        },
        {
          id: 'hc-2',
          title: 'Beware of Urgent Phone Calls or SMS Demanding Medical Payments',
          desc: 'Scammers call patients pretending to be hospital billing departments demanding immediate payment for overdue prescriptions. Always hang up and call the official phone number printed on your physical hospital card.'
        },
        {
          id: 'hc-3',
          title: 'Inspect Your Medical Benefit Statements for Ghost Procedures',
          desc: 'Review your monthly health insurance Explanation of Benefits (EOB). If you see doctor appointments or medications you never received, notify your insurer immediately.'
        }
      ]
    },
    {
      id: 'oauth_teams',
      title: 'Fake Microsoft Teams & Calendar OAuth Phishing Waves',
      category: 'phishing',
      severity: 'HIGH',
      date: 'Active Enterprise Alert',
      targets: 'Office Workers, University Students, Remote Teams',
      impact: 'Attackers hijack full inbox and cloud file access without ever stealing the user’s actual password.',
      howItHappened: 'Victims receive an email or meeting invite that looks like an urgent Teams meeting from "HR" or "Faculty". Clicking the link opens a genuine Microsoft login window that asks to "Authorize App Permissions". Once accepted, a rogue third-party app gains permanent cloud access to read all emails and download sensitive files.',
      easyExplanation: 'You didn’t give the burglar your house key; instead, they handed you a legal document asking for "visitor permission," and you signed it, legally granting them 24/7 access to your house.',
      steps: [
        {
          id: 'oa-1',
          title: 'Never Click "Accept Permissions" on Popups You Didn\'t Request',
          desc: 'If a popup asks to "Read your mail", "Access files anytime", or "Send emails on your behalf", click CANCEL immediately. Legitimate meetings never require special third-party permission grants.'
        },
        {
          id: 'oa-2',
          title: 'Inspect the Sender’s Exact Email Address Domain',
          desc: 'Hover over the sender name. Official Microsoft notifications end in @microsoft.com or @office.com — not deceptive domains like @teams-meeting-support-portal.net.'
        },
        {
          id: 'oa-3',
          title: 'Audit and Revoke Connected Apps from Your Account',
          desc: 'Open your Google Account (myaccount.google.com/permissions) or Microsoft Account (account.live.com/consent/Manage) and delete any third-party apps you do not recognize.'
        }
      ]
    },
    {
      id: 'ai_voice',
      title: 'AI Deepfake Voice Cloning & Virtual Kidnapping Scams',
      category: 'social',
      severity: 'HIGH',
      date: 'Rapidly Growing Global Threat',
      targets: 'Families, Grandparents, Small Business Owners',
      impact: 'Tens of millions stolen by replicating family members’ voices with 3-second audio clips scraped from social media.',
      howItHappened: 'Scammers download a 3-second clip of your voice from a public Instagram story or TikTok video. Using modern generative AI, they clone your exact voice tone, call your parents or spouse in tears, and scream that you were in a car accident or held in jail, demanding immediate emergency funds.',
      easyExplanation: 'A scammer uses a digital parrot to mimic your child’s voice so convincingly that your family panics and transfers money before thinking clearly.',
      steps: [
        {
          id: 'ai-1',
          title: 'Create a Secret "Family Safe Word" Today',
          desc: 'Agree on a private secret word or phrase with your family that only you know. If someone calls claiming an emergency, ask for the safe word. An AI voice clone will never know it.'
        },
        {
          id: 'ai-2',
          title: 'Hang Up and Call the Person Back Directly',
          desc: 'Even if the caller ID shows your child or friend’s phone number (which scammers can easily fake using caller-ID spoofing), hang up immediately and dial their number back from your own contact list.'
        },
        {
          id: 'ai-3',
          title: 'Never Send Funds via Cryptocurrency, Wire Transfer, or Gift Cards',
          desc: 'Real police departments, hospitals, and government agencies will NEVER ask you to pay bail or medical emergency bills through Bitcoin, Western Union, or Apple Gift Cards.'
        }
      ]
    },
    {
      id: 'quishing',
      title: 'Physical & Digital Quishing (Malicious QR Code Fraud)',
      category: 'social',
      severity: 'HIGH',
      date: 'Recent Public Alert',
      targets: 'Drivers, Restaurant Diners, Airport Travelers',
      impact: 'Fraudulent credit card theft via stickers placed on parking meters and fake airport Wi-Fi posters.',
      howItHappened: 'Criminals print waterproof stickers containing malicious QR codes and stick them directly over real QR codes on public parking meters, restaurant tables, and charging stations. When scanned, the QR code redirects your phone to a counterfeit payment page that steals your credit card numbers.',
      easyExplanation: 'Someone glued a fake mailbox slot over a real street mailbox so that all incoming letters drop straight into their hands.',
      steps: [
        {
          id: 'qr-1',
          title: 'Inspect Public QR Codes for Physical Sticker Overlays',
          desc: 'Before scanning a QR code on a parking meter, billboard, or table, run your finger over it. If you feel an adhesive sticker pasted over an original sign, do NOT scan it.'
        },
        {
          id: 'qr-2',
          title: 'Always Inspect the URL Preview on Your Camera Screen',
          desc: 'When your camera recognizes a QR code, read the destination address before tapping. Look out for random scrambled letters or odd domain extensions like .xyz, .top, or .cc.'
        },
        {
          id: 'qr-3',
          title: 'Use Apple Pay / Google Pay Instead of Typing Card Numbers',
          desc: 'Apple Pay and Google Pay use temporary encrypted tokens (virtual cards) so the website never gets your actual 16-digit debit/credit card number.'
        }
      ]
    },
    {
      id: 'crowdstrike_malware',
      title: 'Fake CrowdStrike Fixes & Weaponized Update Scams',
      category: 'phishing',
      severity: 'MEDIUM',
      date: 'Recent IT Infrastructure Wave',
      targets: 'IT Staff, Workstations, Remote Employees',
      impact: 'Ransomware deployment and Remcos infostealer infections masquerading as "emergency crash recovery tools".',
      howItHappened: 'When thousands of Windows computers experienced the global IT crash, hackers immediately registered domains like "crowdstrike-hotfix.com" and sent emails pretending to provide "quick automated repair scripts" that actually installed remote trojan backdoors.',
      easyExplanation: 'Con artists set up a fake roadside repair booth next to a massive traffic jam, charging drivers to install tracking bugs inside their engines.',
      steps: [
        {
          id: 'cs-1',
          title: 'Only Download Updates from Official Vendor Portals',
          desc: 'Never download software fixes, drivers, or .exe files from links in emails, Reddit threads, Telegram groups, or unofficial blogs.'
        },
        {
          id: 'cs-2',
          title: 'Keep Automated Antivirus / Defender Real-Time Protection On',
          desc: 'Never disable your antivirus or firewall even if a forum post tells you "it is necessary to run this fix tool".'
        }
      ]
    }
  ];

  const toggleStep = (stepId) => {
    setCompletedSteps(prev => {
      const updated = { ...prev, [stepId]: !prev[stepId] };
      const totalCount = Object.values(updated).filter(Boolean).length;
      if (totalCount === 5 && onAwardXP) {
        onAwardXP(30, 'alert_sentinel');
      }
      return updated;
    });
  };

  const filteredAlerts = alerts.filter(a => {
    const matchesCat = activeCategory === 'all' || a.category === activeCategory;
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          a.targets.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          a.howItHappened.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* 1. Header */}
      <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono tracking-wider uppercase mb-1">
            <Bell className="w-3.5 h-3.5 text-red-400 animate-pulse" /> Live Threat Intelligence & Early Warnings
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight">
            Recent Global Cyber Attacks & Precaution Guide
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
            Plain-English breakdowns of real cyber attacks currently striking organizations worldwide, with step-by-step precautions you can take immediately to protect yourself.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-red-950/40 border border-red-500/30 text-xs font-mono text-red-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
            6 HIGH-PRIORITY INCIDENTS MONITORED
          </span>
        </div>
      </div>

      {/* 2. Red Alert Emergency Drill Banner (What to do if hacked RIGHT NOW) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-red-950/40 via-black to-red-950/30 border border-red-500/40 shadow-[0_0_35px_rgba(239,68,68,0.15)] space-y-4">
        <div className="flex items-center gap-2.5 text-red-400 font-bold text-xs uppercase font-mono tracking-wider">
          <ShieldAlert className="w-5 h-5 shrink-0" />
          <span>Emergency Rapid Action Protocol: Suspect You Are Compromised Right Now?</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-black/70 border border-red-500/20 space-y-1">
            <span className="text-red-400 font-bold block text-[10px]">STEP 1 &bull; SEVER C2</span>
            <p className="text-white font-bold">Disconnect Internet</p>
            <p className="text-[11px] text-zinc-400 font-sans">Immediately unplug Ethernet cable and toggle Wi-Fi OFF to halt malware data exfiltration.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-black/70 border border-red-500/20 space-y-1">
            <span className="text-red-400 font-bold block text-[10px]">STEP 2 &bull; ISOLATION</span>
            <p className="text-white font-bold">Use a Clean Device</p>
            <p className="text-[11px] text-zinc-400 font-sans">Do NOT type passwords on the infected machine. Use your mobile phone to rotate email passwords.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-black/70 border border-red-500/20 space-y-1">
            <span className="text-red-400 font-bold block text-[10px]">STEP 3 &bull; SESSION KILL</span>
            <p className="text-white font-bold">Sign Out of All Sessions</p>
            <p className="text-[11px] text-zinc-400 font-sans">Click "Log out of all devices" in Google/Microsoft security settings to invalidate stolen cookies.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-black/70 border border-red-500/20 space-y-1">
            <span className="text-red-400 font-bold block text-[10px]">STEP 4 &bull; FINANCIAL DEFENSE</span>
            <p className="text-white font-bold">Freeze Credit & Cards</p>
            <p className="text-[11px] text-zinc-400 font-sans">Lock your banking debit cards inside your mobile banking app and notify your bank fraud division.</p>
          </div>
        </div>
      </div>

      {/* 3. Filter Navigation & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
              activeCategory === 'all'
                ? 'bg-white text-black border-white shadow-md'
                : 'glass border-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            All Incidents ({alerts.length})
          </button>
          <button
            onClick={() => setActiveCategory('breach')}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
              activeCategory === 'breach'
                ? 'bg-white text-black border-white shadow-md'
                : 'glass border-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            Data Breaches
          </button>
          <button
            onClick={() => setActiveCategory('ransomware')}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
              activeCategory === 'ransomware'
                ? 'bg-white text-black border-white shadow-md'
                : 'glass border-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            Ransomware Outbreaks
          </button>
          <button
            onClick={() => setActiveCategory('phishing')}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
              activeCategory === 'phishing'
                ? 'bg-white text-black border-white shadow-md'
                : 'glass border-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            OAuth & Phishing
          </button>
          <button
            onClick={() => setActiveCategory('social')}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
              activeCategory === 'social'
                ? 'bg-white text-black border-white shadow-md'
                : 'glass border-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            AI Voice & QR Scams
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search breach, entity or tool..."
            className="w-full bg-black/80 border border-white/15 rounded-xl pl-10 pr-4 py-2 text-white font-mono text-xs focus:outline-none focus:border-white shadow-inner"
          />
        </div>
      </div>

      {/* 4. Active Incident Cards with Interactive Precaution Checklists */}
      <div className="space-y-6">
        {filteredAlerts.map((alert) => {
          const isExpanded = expandedId === alert.id;
          const completedCount = alert.steps.filter(s => completedSteps[s.id]).length;

          return (
            <div 
              key={alert.id}
              className={`glass-specular rounded-3xl border transition-all duration-300 shadow-xl overflow-hidden ${
                alert.severity === 'CRITICAL' ? 'border-red-500/30' : 'border-white/15'
              }`}
            >
              {/* Card Header (Click to expand/collapse) */}
              <div 
                onClick={() => setExpandedId(isExpanded ? null : alert.id)}
                className="p-6 sm:p-7 cursor-pointer hover:bg-white/[0.02] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      alert.severity === 'CRITICAL'
                        ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {alert.severity} THREAT
                    </span>
                    <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {alert.date}
                    </span>
                    <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                      <Building2 className="w-3 h-3" /> {alert.targets}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold font-heading text-white tracking-tight">
                    {alert.title}
                  </h3>
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans max-w-3xl">
                    {alert.impact}
                  </p>
                </div>

                {/* Progress Pill & Toggle Chevron */}
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right hidden sm:block">
                    <span className="text-[10px] font-mono uppercase text-zinc-500 block">Personal Protection</span>
                    <span className="text-xs font-mono font-bold text-white">
                      {completedCount} / {alert.steps.length} Actions Done
                    </span>
                  </div>

                  <button className="w-9 h-9 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center text-zinc-300 hover:text-white transition-colors">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Expanded Incident Analysis & Step-by-Step Action Plan */}
              {isExpanded && (
                <div className="p-6 sm:p-8 space-y-7 bg-black/60 animate-fade-in">
                  
                  {/* Two-Column Forensic Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* How It Happened (Plain English) */}
                    <div className="p-5 rounded-2xl bg-[#09090c] border border-white/15 space-y-2">
                      <div className="flex items-center gap-2 text-red-400 text-xs font-mono font-bold uppercase tracking-wider">
                        <AlertTriangle className="w-4 h-4" />
                        <span>How the Attackers Got In</span>
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                        {alert.howItHappened}
                      </p>
                    </div>

                    {/* Simple Analogy for Non-Tech Users */}
                    <div className="p-5 rounded-2xl bg-[#09090c] border border-white/15 space-y-2">
                      <div className="flex items-center gap-2 text-white text-xs font-mono font-bold uppercase tracking-wider">
                        <HelpCircle className="w-4 h-4 text-zinc-400" />
                        <span>Real-World Everyday Analogy</span>
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans italic">
                        "{alert.easyExplanation}"
                      </p>
                    </div>
                  </div>

                  {/* Step-by-Step Actionable Checklist */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>Precautions You Must Take (Step-by-Step Action Plan)</span>
                      </h4>
                      <span className="text-[11px] font-mono text-zinc-400">
                        Click checkmark when completed
                      </span>
                    </div>

                    <div className="space-y-3">
                      {alert.steps.map((step, sIdx) => {
                        const isDone = !!completedSteps[step.id];

                        return (
                          <div
                            key={step.id}
                            onClick={() => toggleStep(step.id)}
                            className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                              isDone 
                                ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                                : 'bg-black/50 border-white/10 hover:border-white/30 text-zinc-300 hover:bg-white/[0.02]'
                            }`}
                          >
                            {/* Checkbox Box */}
                            <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                              isDone 
                                ? 'bg-emerald-400 text-black font-bold shadow-[0_0_8px_rgba(16,185,129,0.8)]' 
                                : 'border border-zinc-600 bg-black/60'
                            }`}>
                              {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>

                            <div className="flex-1 space-y-0.5">
                              <p className={`text-xs sm:text-sm font-bold ${isDone ? 'text-white line-through decoration-emerald-400/60' : 'text-white'}`}>
                                Step {sIdx + 1}: {step.title}
                              </p>
                              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                                {step.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 5. Reporting Help Card */}
      <div className="p-6 rounded-3xl glass border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg text-center sm:text-left">
        <div>
          <h4 className="text-sm font-bold text-white font-mono">Found a new scam or suffered a personal cyber loss?</h4>
          <p className="text-xs text-zinc-400 mt-0.5 font-sans">
            File an immediate cybercrime complaint with national authorities (cybercrime.gov.in / IC3.gov / Europol).
          </p>
        </div>
        <a 
          href="https://cybercrime.gov.in" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-glossy px-5 py-2.5 rounded-xl font-mono text-xs font-bold flex items-center gap-2 shrink-0 cursor-pointer shadow-md"
        >
          <span>Official Incident Portal</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

    </div>
  );
}
