import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Radio, 
  AlertTriangle, 
  ShieldAlert, 
  Activity, 
  RefreshCw, 
  Crosshair, 
  Search, 
  Server, 
  Zap, 
  Shield, 
  ExternalLink,
  Filter
} from 'lucide-react';

export default function ThreatMap() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [ipQuery, setIpQuery] = useState('');
  const [lookupResult, setLookupResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // Simulated live threat stream
  const [events, setEvents] = useState([
    { id: 1, time: '11:24:02', src: '185.220.101.5', srcCountry: 'DE', target: 'Financial Core', targetCity: 'Frankfurt', type: 'DDoS SYN Flood', severity: 'critical', protocol: 'TCP/443' },
    { id: 2, time: '11:24:00', src: '45.154.255.89', srcCountry: 'NL', target: 'Cloud Storage API', targetCity: 'Virginia', type: 'Credential Stuffing', severity: 'high', protocol: 'HTTPS' },
    { id: 3, time: '11:23:58', src: '103.203.57.12', srcCountry: 'IN', target: 'Healthcare Telemetry', targetCity: 'London', type: 'Ransomware Beacon', severity: 'critical', protocol: 'DNS/53' },
    { id: 4, time: '11:23:55', src: '91.240.118.230', srcCountry: 'RO', target: 'Power Grid SCADA', targetCity: 'Kyiv', type: 'Modbus ICS Exploit', severity: 'critical', protocol: 'Modbus/502' },
    { id: 5, time: '11:23:51', src: '194.26.29.112', srcCountry: 'SE', target: 'E-Commerce Gateway', targetCity: 'Tokyo', type: 'SQL Injection Probe', severity: 'medium', protocol: 'HTTP/80' },
    { id: 6, time: '11:23:48', src: '198.54.130.2', srcCountry: 'US', target: 'Government Portal', targetCity: 'Canberra', type: 'Zero-Day CVE-2026', severity: 'high', protocol: 'SSH/22' },
  ]);

  // Periodic simulated threat ingestion
  useEffect(() => {
    const threatTypes = [
      { type: 'DDoS Reflection', severity: 'critical', protocol: 'UDP/389' },
      { type: 'Brute-Force SSH', severity: 'high', protocol: 'TCP/22' },
      { type: 'Phishing Token Exfil', severity: 'high', protocol: 'HTTPS/443' },
      { type: 'C2 CobaltStrike Ping', severity: 'critical', protocol: 'HTTPS/8443' },
      { type: 'API Key Scraping', severity: 'medium', protocol: 'REST' },
      { type: 'Directory Traversal', severity: 'medium', protocol: 'HTTP' }
    ];

    const targets = [
      { target: 'Defence Network', city: 'Washington D.C.' },
      { target: 'Central Banking API', city: 'Zurich' },
      { target: 'Telecommunications Node', city: 'Singapore' },
      { target: 'Satellite Uplink', city: 'Houston' },
      { target: 'Public Transit Terminal', city: 'Seoul' }
    ];

    const sources = [
      { ip: '185.191.171.12', country: 'RU' },
      { ip: '103.75.190.22', country: 'VN' },
      { ip: '193.106.191.8', country: 'IR' },
      { ip: '45.134.140.2', country: 'BR' },
      { ip: '94.102.61.18', country: 'NL' }
    ];

    const interval = setInterval(() => {
      const randomThreat = threatTypes[Math.floor(Math.random() * threatTypes.length)];
      const randomTarget = targets[Math.floor(Math.random() * targets.length)];
      const randomSource = sources[Math.floor(Math.random() * sources.length)];
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];

      const newEvent = {
        id: Date.now(),
        time: timeStr,
        src: randomSource.ip,
        srcCountry: randomSource.country,
        target: randomTarget.target,
        targetCity: randomTarget.city,
        type: randomThreat.type,
        severity: randomThreat.severity,
        protocol: randomThreat.protocol
      };

      setEvents((prev) => [newEvent, ...prev.slice(0, 11)]);
    }, 3800);

    return () => clearInterval(interval);
  }, []);

  const handleIpLookup = (e) => {
    e.preventDefault();
    if (!ipQuery.trim()) return;
    setIsSearching(true);
    setLookupResult(null);

    setTimeout(() => {
      setIsSearching(false);
      setLookupResult({
        ip: ipQuery,
        asn: 'AS16276 OVH SAS',
        threatScore: 88,
        status: 'MALICIOUS_REPUTATION',
        category: 'Bulletproof Hosting / Known Tor Exit Node',
        reports: 412,
        firstSeen: '14 days ago',
        lastSeen: '18 mins ago',
        country: 'Netherlands (NL)'
      });
    }, 700);
  };

  const filteredEvents = activeFilter === 'all' 
    ? events 
    : events.filter(e => e.severity === activeFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono tracking-wider uppercase mb-1">
            <Radio className="w-3.5 h-3.5 text-white animate-pulse" /> Live SOC Telemetry
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight">
            Global Cyber Threat Intelligence Radar
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Real-time visualization of distributed denial-of-service, zero-day exploits, and autonomous malware beaconing across international border nodes.
          </p>
        </div>

        {/* Global DEFCON Status */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-950/40 border border-red-500/30 rounded-2xl flex items-center gap-3 shadow-[0_0_20px_rgba(239,68,68,0.15)]">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-red-300">GLOBAL READINESS</p>
              <p className="text-xs font-bold font-mono text-white">DEFCON 2 &mdash; HIGH ALERT</p>
            </div>
          </div>
        </div>
      </div>

      {/* Metric Counters Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl glass border border-white/10 space-y-1">
          <p className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">Attacks Intercepted Today</p>
          <p className="text-2xl sm:text-3xl font-black font-heading text-white">4,892,104</p>
          <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">+18.4% vs avg</span>
        </div>
        <div className="p-5 rounded-2xl glass border border-white/10 space-y-1">
          <p className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">Active Threat Actor Groups</p>
          <p className="text-2xl sm:text-3xl font-black font-heading text-white">142</p>
          <span className="text-[11px] font-mono text-zinc-400">APT28, Lazarus, FIN7</span>
        </div>
        <div className="p-5 rounded-2xl glass border border-white/10 space-y-1">
          <p className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">Zero-Day CVEs (2026)</p>
          <p className="text-2xl sm:text-3xl font-black font-heading text-white">29</p>
          <span className="text-[11px] font-mono text-amber-400">8 Under Active Exploitation</span>
        </div>
        <div className="p-5 rounded-2xl glass border border-white/10 space-y-1">
          <p className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">HoneyPot Sensors Active</p>
          <p className="text-2xl sm:text-3xl font-black font-heading text-white">1,820</p>
          <span className="text-[11px] font-mono text-emerald-400">100% Operational</span>
        </div>
      </div>

      {/* Main Radar Screen & Attack Vector Map */}
      <div className="glass-specular p-6 sm:p-8 rounded-3xl border border-white/15 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-white" />
            <h2 className="text-lg font-bold font-heading text-white">Global Attack Vector Radar</h2>
          </div>

          {/* Severity Filters */}
          <div className="flex items-center gap-1.5 bg-black/60 p-1 rounded-xl border border-white/15 text-xs font-mono">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeFilter === 'all' ? 'bg-white text-black font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              All Feeds
            </button>
            <button
              onClick={() => setActiveFilter('critical')}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeFilter === 'critical' ? 'bg-red-500 text-white font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Critical
            </button>
            <button
              onClick={() => setActiveFilter('high')}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeFilter === 'high' ? 'bg-amber-500 text-black font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              High
            </button>
          </div>
        </div>

        {/* Visual Simulated World Grid Radar (SVG Canvas) */}
        <div className="relative w-full h-[320px] sm:h-[400px] bg-black/90 rounded-2xl border border-white/15 overflow-hidden flex items-center justify-center shadow-inner">
          {/* Subtle Grid Matrix Background */}
          <div className="absolute inset-0 bg-grid-monochrome opacity-25" />
          
          {/* Animated Radar Sweep Line */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(255,255,255,0.03)_100%)] pointer-events-none" />

          {/* Interactive World Continent Nodes (Stylized SVG coordinates) */}
          <svg className="w-full h-full text-zinc-800" viewBox="0 0 1000 500" fill="none">
            {/* World Grid Lines */}
            <circle cx="500" cy="250" r="120" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
            <circle cx="500" cy="250" r="220" stroke="rgba(255,255,255,0.05)" strokeDasharray="6 6" />
            <line x1="500" y1="30" x2="500" y2="470" stroke="rgba(255,255,255,0.06)" />
            <line x1="50" y1="250" x2="950" y2="250" stroke="rgba(255,255,255,0.06)" />

            {/* Simulated Vector Arcs connecting Attack Hubs */}
            <path d="M 240,160 Q 400,60 520,180" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="6 4" className="animate-pulse" />
            <path d="M 520,180 Q 650,110 780,210" stroke="rgba(239,68,68,0.7)" strokeWidth="2" strokeDasharray="8 4" />
            <path d="M 780,210 Q 550,320 280,310" stroke="rgba(245,158,11,0.6)" strokeWidth="1.5" strokeDasharray="5 5" />
            <path d="M 520,180 Q 560,260 590,320" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="4 4" />

            {/* Pulsating Attack Nodes */}
            {/* North America */}
            <circle cx="240" cy="160" r="7" fill="#ffffff" className="animate-ping opacity-75" />
            <circle cx="240" cy="160" r="4" fill="#ffffff" />
            <text x="255" y="165" fill="#a1a1aa" fontSize="11" fontFamily="monospace">US-EAST (AWS-V1)</text>

            {/* Europe */}
            <circle cx="520" cy="180" r="9" fill="#ef4444" className="animate-ping opacity-60" />
            <circle cx="520" cy="180" r="5" fill="#ef4444" />
            <text x="535" y="185" fill="#ef4444" fontSize="11" fontFamily="monospace" fontWeight="bold">FRANKFURT (FIN-HUB)</text>

            {/* Asia */}
            <circle cx="780" cy="210" r="8" fill="#f59e0b" className="animate-ping opacity-70" />
            <circle cx="780" cy="210" r="4" fill="#f59e0b" />
            <text x="795" y="215" fill="#a1a1aa" fontSize="11" fontFamily="monospace">TOKYO (DC-04)</text>

            {/* South America */}
            <circle cx="280" cy="310" r="4" fill="#ffffff" />
            <text x="295" y="315" fill="#71717a" fontSize="10" fontFamily="monospace">SAO PAULO</text>

            {/* Australia */}
            <circle cx="820" cy="380" r="5" fill="#ffffff" />
            <text x="835" y="385" fill="#71717a" fontSize="10" fontFamily="monospace">SYDNEY</text>

            {/* India / South Asia */}
            <circle cx="680" cy="250" r="6" fill="#ef4444" className="animate-pulse" />
            <circle cx="680" cy="250" r="3" fill="#ef4444" />
            <text x="695" y="255" fill="#a1a1aa" fontSize="11" fontFamily="monospace">MUMBAI (TELEMETRY)</text>
          </svg>

          {/* Floating Live Telemetry Badge */}
          <div className="absolute bottom-4 left-4 bg-black/85 backdrop-blur-md border border-white/20 px-3.5 py-2 rounded-xl text-xs font-mono text-zinc-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>GEO-DNS THREAT MESH: ACTIVE (54 NODES SYNCED)</span>
          </div>
        </div>

        {/* Live Attack Feed Stream */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1.5 font-bold text-white uppercase tracking-wider">
              <Activity className="w-4 h-4" /> Live Interception Stream
            </span>
            <span>Real-time Ingestion</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-zinc-500 uppercase text-[10px] tracking-wider">
                  <th className="pb-2.5">Timestamp</th>
                  <th className="pb-2.5">Source IP</th>
                  <th className="pb-2.5">Origin</th>
                  <th className="pb-2.5">Target Asset</th>
                  <th className="pb-2.5">Attack Signature</th>
                  <th className="pb-2.5">Protocol</th>
                  <th className="pb-2.5 text-right">Severity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredEvents.map((ev) => (
                  <tr key={ev.id} className="hover:bg-white/[0.04] transition-colors">
                    <td className="py-2.5 text-zinc-400">{ev.time}</td>
                    <td className="py-2.5 text-white font-bold">{ev.src}</td>
                    <td className="py-2.5 text-zinc-300">
                      <span className="px-1.5 py-0.5 rounded bg-white/10 text-[10px]">{ev.srcCountry}</span>
                    </td>
                    <td className="py-2.5 text-zinc-300">
                      {ev.target} <span className="text-zinc-500">({ev.targetCity})</span>
                    </td>
                    <td className="py-2.5 text-zinc-200 font-semibold">{ev.type}</td>
                    <td className="py-2.5 text-zinc-400 text-[11px]">{ev.protocol}</td>
                    <td className="py-2.5 text-right">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        ev.severity === 'critical' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                        ev.severity === 'high' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                        'bg-zinc-800 text-zinc-300'
                      }`}>
                        {ev.severity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Bottom Section: Threat Intelligence IP & Domain Reputation Scanner */}
      <div className="glass p-6 sm:p-8 rounded-3xl border border-white/15 space-y-6">
        <div>
          <h3 className="text-base sm:text-lg font-bold font-heading text-white flex items-center gap-2">
            <Search className="w-5 h-5 text-white" /> Global Threat Reputation Lookup
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Query suspicious IP addresses, Tor exit nodes, or autonomous system numbers against aggregated global blacklist feeds.
          </p>
        </div>

        <form onSubmit={handleIpLookup} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={ipQuery}
            onChange={(e) => setIpQuery(e.target.value)}
            placeholder="Search IP, Domain or CIDR (e.g. 185.220.101.5 or api.phish-login.com)"
            className="flex-1 bg-black/90 border border-white/20 rounded-xl px-4 py-3 text-white font-mono text-xs focus:outline-none focus:border-white shadow-inner"
          />
          <button
            type="submit"
            disabled={isSearching}
            className="btn-glossy px-6 py-3 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSearching ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Crosshair className="w-3.5 h-3.5" />}
            <span>Query Threat Intelligence</span>
          </button>
        </form>

        {lookupResult && (
          <div className="p-5 rounded-2xl bg-black/80 border border-white/20 space-y-4 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <p className="text-xs font-mono font-bold text-white flex items-center gap-2">
                  <span>{lookupResult.ip}</span>
                  <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30 text-[10px]">
                    {lookupResult.status}
                  </span>
                </p>
                <p className="text-[11px] font-mono text-zinc-400 mt-0.5">{lookupResult.asn} &bull; {lookupResult.country}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-mono uppercase text-zinc-500">Threat Score</p>
                <p className="text-xl font-bold font-heading text-red-400">{lookupResult.threatScore} / 100</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-zinc-500 block">CATEGORY</span>
                <span className="text-zinc-200">{lookupResult.category}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-zinc-500 block">PUBLIC REPORTS</span>
                <span className="text-zinc-200">{lookupResult.reports} Abuse Reports</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-zinc-500 block">FIRST IDENTIFIED</span>
                <span className="text-zinc-200">{lookupResult.firstSeen}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-zinc-500 block">LAST BEACON</span>
                <span className="text-red-400 font-bold">{lookupResult.lastSeen}</span>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
