import React, { useState } from 'react';
import { Wifi, Lock, ShieldCheck, Radio, AlertTriangle } from 'lucide-react';

export default function NetworkSafety({ onCompleteChallenge }) {
  const [vpnEnabled, setVpnEnabled] = useState(false);
  const [isHttps, setIsHttps] = useState(false);

  const toggleVpn = () => {
    const next = !vpnEnabled;
    setVpnEnabled(next);
    if (next) {
      onCompleteChallenge(40, 'wifi_sentinel');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Title */}
      <div className="border-b border-white/10 pb-6">
        <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono tracking-wider uppercase mb-1">
          <Wifi className="w-3.5 h-3.5 text-white" /> Network & Telemetry Defense Lab
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight">Public Network & Traffic Inspection Suite</h1>
        <p className="text-zinc-500 text-xs sm:text-sm mt-1">
          Analyze unencrypted plaintext packet sniffing, simulate AES-256 tunnel routing, and inspect TLS handshakes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Public Wi-Fi Sniffer Simulator (Glossy Obsidian) */}
        <div className="glass-specular p-8 rounded-3xl border border-white/15 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white font-heading flex items-center gap-2">
              <Radio className="w-5 h-5 text-white" /> Packet Sniffer Visualizer
            </h2>
            <button
              onClick={toggleVpn}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
                vpnEnabled
                  ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                  : 'bg-black/80 text-zinc-400 border-white/15'
              }`}
            >
              TUNNEL: {vpnEnabled ? 'ENCRYPTED ON ✓' : 'EXPOSED OFF ❌'}
            </button>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            On unencrypted shared networks, packet sniffing utilities can harvest plain-text payloads traversing the local gateway unless encapsulated inside an encrypted tunnel.
          </p>

          {/* Traffic Packet Visualizer */}
          <div className="bg-black/90 p-5 rounded-2xl border border-white/15 space-y-3 font-mono text-xs shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
            <div className="flex justify-between items-center text-zinc-500 border-b border-white/10 pb-2 text-[10px] uppercase tracking-wider">
              <span>PACKET ID</span>
              <span>PAYLOAD TRAFFIC</span>
              <span>STATUS</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 rounded-xl bg-zinc-900/80 border border-white/5">
                <span className="text-zinc-500">#8910</span>
                <span className={vpnEnabled ? 'text-white font-bold' : 'text-zinc-300 font-bold'}>
                  {vpnEnabled ? '0x89A1F... (AES-256 GCM Encrypted)' : 'GET /login?user=admin&pass=Secret123'}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-md border font-semibold ${
                  vpnEnabled ? 'bg-white text-black border-white' : 'bg-black text-zinc-400 border-zinc-700'
                }`}>
                  {vpnEnabled ? 'SECURED' : 'EXPOSED'}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-zinc-900/80 border border-white/5">
                <span className="text-zinc-500">#8911</span>
                <span className={vpnEnabled ? 'text-white font-bold' : 'text-zinc-300 font-bold'}>
                  {vpnEnabled ? '0x44BC2... (AES-256 GCM Encrypted)' : 'POST /auth Card=4532-xxxx-xxxx'}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-md border font-semibold ${
                  vpnEnabled ? 'bg-white text-black border-white' : 'bg-black text-zinc-400 border-zinc-700'
                }`}>
                  {vpnEnabled ? 'SECURED' : 'EXPOSED'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={toggleVpn}
            className={`w-full py-3.5 rounded-2xl text-xs font-mono uppercase tracking-wider font-bold transition-all ${
              vpnEnabled ? 'btn-obsidian' : 'btn-glossy'
            }`}
          >
            {vpnEnabled ? 'Deactivate Encrypted Tunnel' : 'Activate Encrypted VPN Tunnel (+40 XP)'}
          </button>
        </div>

        {/* HTTP vs HTTPS Protocol Inspector */}
        <div className="glass-specular p-8 rounded-3xl border border-white/15 space-y-6">
          <h2 className="text-lg font-bold text-white font-heading flex items-center gap-2">
            <Lock className="w-5 h-5 text-white" /> TLS Cryptographic Protocol Inspector
          </h2>

          <div className="flex gap-2">
            <button
              onClick={() => setIsHttps(false)}
              className={`flex-1 py-3 rounded-xl font-mono text-xs font-bold transition-all border ${
                !isHttps ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.25)]' : 'bg-black/60 text-zinc-500 border-white/10'
              }`}
            >
              http:// (Cleartext)
            </button>
            <button
              onClick={() => setIsHttps(true)}
              className={`flex-1 py-3 rounded-xl font-mono text-xs font-bold transition-all border ${
                isHttps ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.25)]' : 'bg-black/60 text-zinc-500 border-white/10'
              }`}
            >
              https:// (TLS 1.3 Certified)
            </button>
          </div>

          <div className={`p-6 rounded-2xl border space-y-3 font-mono text-xs ${
            isHttps ? 'bg-white/[0.08] border-white/30 text-white shadow-[0_0_20px_rgba(255,255,255,0.06)]' : 'bg-black/60 border-white/10 text-zinc-400'
          }`}>
            <div className="flex items-center gap-2 font-bold text-sm text-white">
              {isHttps ? <ShieldCheck className="w-5 h-5 text-white" /> : <AlertTriangle className="w-5 h-5 text-zinc-400" />}
              {isHttps ? 'TLS Encrypted & Authenticated' : 'Unencrypted Cleartext Channel'}
            </div>
            <p className="font-sans leading-relaxed text-zinc-300 text-xs">
              {isHttps 
                ? 'HTTPS establishes an asymmetric key exchange and encrypts transit data, rendering session hijacking and Man-in-the-Middle alterations computationally infeasible.' 
                : 'HTTP transmits headers and form inputs unencrypted. Network switches and routers in the routing path can capture transmitted credentials passively.'}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
