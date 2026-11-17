import React, { useState } from 'react';
import { 
  FileCode, 
  Terminal, 
  Copy, 
  Check, 
  Search, 
  Layers, 
  ShieldAlert, 
  Radio, 
  Cpu, 
  BookOpen, 
  ExternalLink 
} from 'lucide-react';

export default function ResourceLibrary() {
  const [activeCategory, setActiveCategory] = useState('linux_dfir');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const toolkits = {
    linux_dfir: {
      title: 'Linux Incident Response & Forensics (DFIR)',
      desc: 'Critical terminal triage commands for investigating compromised Linux production hosts, active reverse shells, and malicious processes.',
      items: [
        {
          title: 'Active Network Sockets & Listening Ports',
          cmd: 'ss -tulpn | grep -v "127.0.0.1"',
          purpose: 'Discloses all active listening ports and process IDs (PID) bound to non-localhost network interfaces.'
        },
        {
          title: 'Identify Process Holding a Network Connection',
          cmd: 'lsof -i :4444 -P -n',
          purpose: 'Reveals the exact binary, user, and execution path responsible for an outbound socket connection.'
        },
        {
          title: 'Process Tree with Full Command-Line Arguments',
          cmd: 'ps -eo pid,ppid,user,args --forest',
          purpose: 'Visualizes parent-child process relationships to detect spawned subshells (e.g. bash spawned from apache/nginx).'
        },
        {
          title: 'Audit User Accounts with UID 0 (Root Equivalents)',
          cmd: 'awk -F: \'($3 == "0") {print $1}\' /etc/passwd',
          purpose: 'Hunts for backdoor accounts that threat actors created with hidden root privileges.'
        },
        {
          title: 'Inspect Recent Failed Authentication Attempts',
          cmd: 'lastb -n 20',
          purpose: 'Examines /var/log/btmp to identify brute-force credential stuffing attempts and originating IPs.'
        },
        {
          title: 'Find Files Modified in the Last 60 Minutes',
          cmd: 'find / -type f -mmin -60 -not -path "*/proc/*" -not -path "*/sys/*" 2>/dev/null',
          purpose: 'Locates recently dropped malware payloads, staging directories, or modified configuration files.'
        }
      ]
    },
    windows_dfir: {
      title: 'Windows PowerShell Forensic Triage',
      desc: 'PowerShell cmdlets for memory triage, active C2 socket hunting, and persistence discovery on Windows endpoints.',
      items: [
        {
          title: 'Established Remote TCP Connections with PIDs',
          cmd: 'Get-NetTCPConnection -State Established | Select-Object LocalAddress, RemoteAddress, RemotePort, OwningProcess | Format-Table',
          purpose: 'Lists all active outbound network connections and maps them to running Windows process IDs.'
        },
        {
          title: 'Inspect Scheduled Tasks for Malicious Persistence',
          cmd: 'Get-ScheduledTask | Where-Object {$_.State -ne "Disabled" -and $_.TaskPath -notlike "\\Microsoft*"} | Select-Object TaskName, TaskPath',
          purpose: 'Filters out standard Microsoft OS tasks to quickly highlight third-party persistence jobs dropped by attackers.'
        },
        {
          title: 'List Running Processes with Hashes & Executable Paths',
          cmd: 'Get-Process | Where-Object {$_.Path} | Select-Object Name, Id, Path | Format-Table -AutoSize',
          purpose: 'Discloses processes running from suspicious staging locations like C:\\Users\\Public\\ or C:\\Windows\\Temp\\.'
        },
        {
          title: 'Audit User Accounts in Local Administrators Group',
          cmd: 'Get-LocalGroupMember -Group "Administrators"',
          purpose: 'Verifies whether unauthorized privilege escalation occurred.'
        }
      ]
    },
    wireshark: {
      title: 'Wireshark & PCAP Packet Inspection Filters',
      desc: 'Berkeley Packet Filters (BPF) and display filters for isolating exfiltration, cleartext credentials, and DNS tunneling.',
      items: [
        {
          title: 'Isolate Outbound HTTP POST Requests (Potential Data Exfiltration)',
          cmd: 'http.request.method == "POST"',
          purpose: 'Surfaces web forms, credentials, and file uploads sent across unencrypted HTTP channels.'
        },
        {
          title: 'Detect Potential DNS Tunneling & Subdomain C2 Beaconing',
          cmd: 'dns.flags.response == 0 and dns.qry.name.len > 40',
          purpose: 'Hunts for unusually long DNS queries used by malware to exfiltrate base64 encoded data inside DNS queries.'
        },
        {
          title: 'Identify TCP SYN Scan / Port Scanning Bursts',
          cmd: 'tcp.flags.syn == 1 and tcp.flags.ack == 0',
          purpose: 'Detects reconnaissance port sweeps and SYN floods against network hosts.'
        },
        {
          title: 'Filter Traffic to a Suspicious Foreign IP',
          cmd: 'ip.addr == 185.220.101.5',
          purpose: 'Isolates both ingress and egress communication with a confirmed malicious command-and-control IP.'
        }
      ]
    },
    owasp: {
      title: 'OWASP Top 10 Web Application Security Matrix',
      desc: 'Comprehensive reference for the most critical web application security vulnerabilities and architectural defenses.',
      items: [
        {
          title: 'A01: Broken Access Control (BAC)',
          cmd: '// Enforce strict server-side authorization check\nif (req.user.id !== resource.ownerId && !req.user.isAdmin) {\n  return res.status(403).json({ error: "Access Denied" });\n}',
          purpose: 'Attackers manipulate IDs (IDOR) to access other users’ data. Solution: Never rely on client-side routing alone.'
        },
        {
          title: 'A02: Cryptographic Failures',
          cmd: '// Mandatory password hashing with bcrypt/Argon2 + salt\nconst hash = await bcrypt.hash(password, 12);\n// Always enforce TLS 1.3 with HSTS header\nres.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");',
          purpose: 'Exposure of plaintext passwords, deprecated TLS 1.0, or unsalted SHA-1 hashes. Solution: Strong modern ciphers and salting.'
        },
        {
          title: 'A03: Injection Attacks (SQLi & Command Injection)',
          cmd: '// Parameterized Prepared Statement\nconst query = "SELECT * FROM users WHERE email = ? AND status = ?";\nconst [rows] = await db.execute(query, [email, "active"]);',
          purpose: 'Hostile data passed into interpreters executes unintended commands. Solution: Always use parameterized queries.'
        },
        {
          title: 'A10: Server-Side Request Forgery (SSRF)',
          cmd: '// Whitelist allowed destination domains\nconst ALLOWED_HOSTS = ["api.stripe.com", "api.github.com"];\nconst target = new URL(userProvidedUrl);\nif (!ALLOWED_HOSTS.includes(target.hostname)) {\n  throw new Error("Target host not permitted");\n}',
          purpose: 'Web apps fetch remote resources without validating destination IP, allowing attackers to query internal cloud metadata (169.254.169.254).'
        }
      ]
    }
  };

  const activeToolkit = toolkits[activeCategory];
  const filteredItems = activeToolkit.items.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.cmd.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.purpose.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono tracking-wider uppercase mb-1">
            <BookOpen className="w-3.5 h-3.5 text-white" /> Technical Reference & DFIR Cheat Sheets
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight">
            Security Engineering Resource Library
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Curated, field-tested command-line snippets, forensic triage commands, and OWASP mitigation patterns for security professionals.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search commands or rules..."
            className="w-full bg-black/80 border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-white shadow-inner"
          />
        </div>
      </div>

      {/* Category Navigation Pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory('linux_dfir')}
          className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all border flex items-center gap-2 ${
            activeCategory === 'linux_dfir'
              ? 'bg-white text-black border-white shadow-md'
              : 'glass border-white/10 text-zinc-400 hover:text-white'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Linux Incident Triage</span>
        </button>

        <button
          onClick={() => setActiveCategory('windows_dfir')}
          className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all border flex items-center gap-2 ${
            activeCategory === 'windows_dfir'
              ? 'bg-white text-black border-white shadow-md'
              : 'glass border-white/10 text-zinc-400 hover:text-white'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>Windows PowerShell DFIR</span>
        </button>

        <button
          onClick={() => setActiveCategory('wireshark')}
          className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all border flex items-center gap-2 ${
            activeCategory === 'wireshark'
              ? 'bg-white text-black border-white shadow-md'
              : 'glass border-white/10 text-zinc-400 hover:text-white'
          }`}
        >
          <Radio className="w-3.5 h-3.5" />
          <span>Wireshark PCAP Filters</span>
        </button>

        <button
          onClick={() => setActiveCategory('owasp')}
          className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all border flex items-center gap-2 ${
            activeCategory === 'owasp'
              ? 'bg-white text-black border-white shadow-md'
              : 'glass border-white/10 text-zinc-400 hover:text-white'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>OWASP Top 10 Mitigation</span>
        </button>
      </div>

      {/* Category Overview Card */}
      <div className="p-6 rounded-3xl glass border border-white/15 space-y-2 shadow-sm">
        <h2 className="text-lg font-bold font-heading text-white">{activeToolkit.title}</h2>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">{activeToolkit.desc}</p>
      </div>

      {/* Command Snippets List */}
      <div className="space-y-4">
        {filteredItems.map((item, idx) => (
          <div 
            key={idx}
            className="glass-specular p-5 sm:p-6 rounded-2xl border border-white/15 space-y-3 shadow-lg hover:border-white/30 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white/70" />
                <span>{item.title}</span>
              </h3>
              <button
                onClick={() => copyToClipboard(item.cmd, idx)}
                className="btn-obsidian px-3 py-1.5 rounded-lg text-[11px] font-mono flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
              >
                {copiedIndex === idx ? (
                  <>
                    <Check className="w-3 h-3 text-white" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-zinc-400" />
                    <span>Copy Command</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Block */}
            <div className="bg-[#050508] border border-white/15 rounded-xl p-3.5 font-mono text-xs text-zinc-200 overflow-x-auto shadow-inner">
              <pre className="font-mono text-xs text-white selection:bg-white selection:text-black whitespace-pre-wrap">
                {item.cmd}
              </pre>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              <strong className="text-zinc-300 font-mono">Purpose:</strong> {item.purpose}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
