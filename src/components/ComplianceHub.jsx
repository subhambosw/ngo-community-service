import React, { useState } from 'react';
import { 
  FileCheck2, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Layers, 
  Lock, 
  Server, 
  Eye, 
  Printer, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function ComplianceHub() {
  const frameworks = [
    { id: 'soc2', name: 'SOC 2 Type II', authority: 'AICPA Standard', desc: 'Trust Services Criteria evaluating Security, Availability, and Data Confidentiality.' },
    { id: 'iso27001', name: 'ISO/IEC 27001:2022', authority: 'International ISO/IEC', desc: 'Global benchmark for organizational Information Security Management Systems (ISMS).' },
    { id: 'nist_csf', name: 'NIST CSF 2.0', authority: 'US Dept of Commerce', desc: 'Five core pillars: Govern, Identify, Protect, Detect, Respond, and Recover.' },
    { id: 'gdpr', name: 'GDPR / DPDP 2023', authority: 'Data Protection Authority', desc: 'Mandatory user privacy, data minimization, and 72-hour breach disclosure compliance.' }
  ];

  const [activeFramework, setActiveFramework] = useState('soc2');
  const [controls, setControls] = useState({
    mfa_enforced: true,
    data_encrypted_rest: true,
    data_encrypted_transit: true,
    immutable_backups: true,
    incident_plan_tested: false,
    penetration_test_annual: false,
    least_privilege_rbac: true,
    vendor_sbom_audit: false
  });

  const toggleControl = (key) => {
    setControls(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const totalControls = Object.keys(controls).length;
  const passedControls = Object.values(controls).filter(Boolean).length;
  const complianceScore = Math.round((passedControls / totalControls) * 100);

  const getStatusRating = (score) => {
    if (score >= 85) return { text: 'AUDIT READY (COMPLIANT)', color: 'text-emerald-400', border: 'border-emerald-500/40 bg-emerald-950/30' };
    if (score >= 60) return { text: 'SUBSTANTIAL PROGRESS', color: 'text-amber-400', border: 'border-amber-500/40 bg-amber-950/30' };
    return { text: 'NON-COMPLIANT (ELEVATED RISK)', color: 'text-red-400', border: 'border-red-500/40 bg-red-950/30' };
  };

  const status = getStatusRating(complianceScore);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono tracking-wider uppercase mb-1">
            <FileCheck2 className="w-3.5 h-3.5 text-white" /> Enterprise Governance & Risk Management
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight">
            Security Compliance & Policy Auditor
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Benchmark security architecture against global regulatory standards: SOC 2, ISO 27001, and NIST CSF 2.0.
          </p>
        </div>

        <button 
          onClick={() => window.print()}
          className="btn-glossy px-4 py-2.5 rounded-xl font-mono text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Export Audit Memo</span>
        </button>
      </div>

      {/* Framework Switcher Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {frameworks.map(f => (
          <div
            key={f.id}
            onClick={() => setActiveFramework(f.id)}
            className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
              activeFramework === f.id
                ? 'bg-gradient-to-b from-white/15 to-white/5 border-white shadow-[0_0_25px_rgba(255,255,255,0.15)] -translate-y-1'
                : 'glass border-white/10 hover:border-white/30 text-zinc-400'
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-mono uppercase text-zinc-500 font-semibold">{f.authority}</span>
              {activeFramework === f.id && <CheckCircle2 className="w-4 h-4 text-white" />}
            </div>
            <h3 className="text-sm font-bold text-white mb-1">{f.name}</h3>
            <p className="text-[11px] text-zinc-400 leading-snug">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Audit Readiness Score Overview Card */}
      <div className={`p-6 sm:p-8 rounded-3xl border ${status.border} shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6`}>
        <div className="space-y-2 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono font-bold tracking-wider uppercase">
            <ShieldCheck className="w-4 h-4 text-white" />
            <span className={status.color}>{status.text}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            Compliance Readiness Index: {complianceScore}%
          </h2>
          <p className="text-xs text-zinc-300 max-w-xl font-sans">
            {passedControls} of {totalControls} baseline governance controls verified. To achieve full attestation, resolve unfulfilled gap requirements below.
          </p>
        </div>

        {/* Progress Bar & Stat Box */}
        <div className="w-full sm:w-64 space-y-2">
          <div className="flex justify-between text-xs font-mono text-zinc-400">
            <span>Audit Posture</span>
            <span className="text-white font-bold">{passedControls}/{totalControls} Passed</span>
          </div>
          <div className="w-full bg-black/60 border border-white/10 h-3 rounded-full overflow-hidden p-0.5">
            <div 
              className="bg-gradient-to-r from-zinc-300 to-white h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(255,255,255,0.7)]" 
              style={{ width: `${complianceScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Control Checklist Grid */}
      <div className="glass p-6 sm:p-8 rounded-3xl border border-white/15 space-y-6">
        <div>
          <h3 className="text-base sm:text-lg font-bold font-heading text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-white" /> Mandatory Trust Controls Checklist
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Click any control item to toggle audit attestation status based on your organization’s current implementation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Control 1 */}
          <div 
            onClick={() => toggleControl('mfa_enforced')}
            className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
              controls.mfa_enforced ? 'bg-white/10 border-white/30 text-white' : 'bg-black/40 border-white/10 text-zinc-400'
            }`}
          >
            <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
              controls.mfa_enforced ? 'bg-white text-black font-bold' : 'border border-zinc-600'
            }`}>
              {controls.mfa_enforced && <CheckCircle2 className="w-4 h-4" />}
            </div>
            <div>
              <p className="text-xs font-bold text-white">CC6.1: Universal Multi-Factor Authentication (MFA)</p>
              <p className="text-[11px] text-zinc-400 mt-0.5">Hardware FIDO2 or TOTP required for all employee and administrative access.</p>
            </div>
          </div>

          {/* Control 2 */}
          <div 
            onClick={() => toggleControl('data_encrypted_rest')}
            className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
              controls.data_encrypted_rest ? 'bg-white/10 border-white/30 text-white' : 'bg-black/40 border-white/10 text-zinc-400'
            }`}
          >
            <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
              controls.data_encrypted_rest ? 'bg-white text-black font-bold' : 'border border-zinc-600'
            }`}>
              {controls.data_encrypted_rest && <CheckCircle2 className="w-4 h-4" />}
            </div>
            <div>
              <p className="text-xs font-bold text-white">CC6.6: AES-256 Encryption at Rest</p>
              <p className="text-[11px] text-zinc-400 mt-0.5">All customer databases, object storage, and backups encrypted with KMS rotated keys.</p>
            </div>
          </div>

          {/* Control 3 */}
          <div 
            onClick={() => toggleControl('data_encrypted_transit')}
            className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
              controls.data_encrypted_transit ? 'bg-white/10 border-white/30 text-white' : 'bg-black/40 border-white/10 text-zinc-400'
            }`}
          >
            <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
              controls.data_encrypted_transit ? 'bg-white text-black font-bold' : 'border border-zinc-600'
            }`}>
              {controls.data_encrypted_transit && <CheckCircle2 className="w-4 h-4" />}
            </div>
            <div>
              <p className="text-xs font-bold text-white">CC6.7: TLS 1.3 Cryptography in Transit</p>
              <p className="text-[11px] text-zinc-400 mt-0.5">Strict HTTPS enforcement, HSTS preload header enabled, weak ciphers disabled.</p>
            </div>
          </div>

          {/* Control 4 */}
          <div 
            onClick={() => toggleControl('immutable_backups')}
            className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
              controls.immutable_backups ? 'bg-white/10 border-white/30 text-white' : 'bg-black/40 border-white/10 text-zinc-400'
            }`}
          >
            <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
              controls.immutable_backups ? 'bg-white text-black font-bold' : 'border border-zinc-600'
            }`}>
              {controls.immutable_backups && <CheckCircle2 className="w-4 h-4" />}
            </div>
            <div>
              <p className="text-xs font-bold text-white">A1.2: Immutable Air-Gapped Backups</p>
              <p className="text-[11px] text-zinc-400 mt-0.5">Daily automated snapshots stored with WORM (Write Once, Read Many) locks to defeat ransomware.</p>
            </div>
          </div>

          {/* Control 5 */}
          <div 
            onClick={() => toggleControl('incident_plan_tested')}
            className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
              controls.incident_plan_tested ? 'bg-white/10 border-white/30 text-white' : 'bg-black/40 border-white/10 text-zinc-400'
            }`}
          >
            <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
              controls.incident_plan_tested ? 'bg-white text-black font-bold' : 'border border-zinc-600'
            }`}>
              {controls.incident_plan_tested && <CheckCircle2 className="w-4 h-4" />}
            </div>
            <div>
              <p className="text-xs font-bold text-white">CC7.3: Annual Tabletop Incident Response Drill</p>
              <p className="text-[11px] text-zinc-400 mt-0.5">Simulated breach exercise conducted with executive leadership and legal counsel.</p>
            </div>
          </div>

          {/* Control 6 */}
          <div 
            onClick={() => toggleControl('penetration_test_annual')}
            className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
              controls.penetration_test_annual ? 'bg-white/10 border-white/30 text-white' : 'bg-black/40 border-white/10 text-zinc-400'
            }`}
          >
            <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
              controls.penetration_test_annual ? 'bg-white text-black font-bold' : 'border border-zinc-600'
            }`}>
              {controls.penetration_test_annual && <CheckCircle2 className="w-4 h-4" />}
            </div>
            <div>
              <p className="text-xs font-bold text-white">CC4.1: Third-Party External Penetration Testing</p>
              <p className="text-[11px] text-zinc-400 mt-0.5">Independent CREST-certified white-hat penetration test performed within last 12 months.</p>
            </div>
          </div>

          {/* Control 7 */}
          <div 
            onClick={() => toggleControl('least_privilege_rbac')}
            className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
              controls.least_privilege_rbac ? 'bg-white/10 border-white/30 text-white' : 'bg-black/40 border-white/10 text-zinc-400'
            }`}
          >
            <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
              controls.least_privilege_rbac ? 'bg-white text-black font-bold' : 'border border-zinc-600'
            }`}>
              {controls.least_privilege_rbac && <CheckCircle2 className="w-4 h-4" />}
            </div>
            <div>
              <p className="text-xs font-bold text-white">CC6.3: Least-Privilege Role-Based Access Control (RBAC)</p>
              <p className="text-[11px] text-zinc-400 mt-0.5">Zero standing admin privileges; just-in-time (JIT) access approval logs enforced.</p>
            </div>
          </div>

          {/* Control 8 */}
          <div 
            onClick={() => toggleControl('vendor_sbom_audit')}
            className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
              controls.vendor_sbom_audit ? 'bg-white/10 border-white/30 text-white' : 'bg-black/40 border-white/10 text-zinc-400'
            }`}
          >
            <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
              controls.vendor_sbom_audit ? 'bg-white text-black font-bold' : 'border border-zinc-600'
            }`}>
              {controls.vendor_sbom_audit && <CheckCircle2 className="w-4 h-4" />}
            </div>
            <div>
              <p className="text-xs font-bold text-white">CC9.2: Software Bill of Materials (SBOM) & Supply Chain Audit</p>
              <p className="text-[11px] text-zinc-400 mt-0.5">Automated dependency scanning in CI/CD pipelines to prevent SolarWinds-style attacks.</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
