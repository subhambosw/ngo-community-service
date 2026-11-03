import React, { useState } from 'react';
import { Search, BookOpen, ShieldCheck } from 'lucide-react';
import { glossaryTerms } from '../data/glossaryTerms';

export default function ThreatGlossary() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Social Engineering', 'Malware', 'Authentication', 'Network', 'Attack Tactics', 'Password Security', 'Software Flaw'];

  const filtered = glossaryTerms.filter((term) => {
    const matchesQuery = term.term.toLowerCase().includes(query.toLowerCase()) || term.definition.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = activeCategory === 'All' || term.category === activeCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div className="border-b border-white/10 pb-6">
        <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono tracking-wider uppercase mb-1">
          <BookOpen className="w-3.5 h-3.5 text-white" /> Intelligence Repository
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight">Threat Glossary & Countermeasure Index</h1>
        <p className="text-zinc-500 text-xs sm:text-sm mt-1">
          Taxonomy of attack vectors, protocol vulnerabilities, and cryptographic mitigations.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-zinc-500 absolute left-4 top-3.5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter index (e.g. Phishing, Ransomware, Passkey)..."
            className="w-full bg-black/90 border border-white/15 rounded-2xl pl-11 pr-4 py-3 text-white text-xs font-mono focus:outline-none focus:border-white shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] transition-all"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {categories.map((cat) => {
            const isCat = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all border ${
                  isCat
                    ? 'bg-white text-black font-bold border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                    : 'bg-zinc-950 text-zinc-400 border-white/10 hover:text-white hover:bg-zinc-900'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

      </div>

      {/* Grid of Glossary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="glass-specular p-6 rounded-3xl border border-white/15 space-y-4 hover:border-white/30 transition-all shadow-[0_15px_30px_-10px_rgba(0,0,0,0.9)]"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white font-heading">{t.term}</h3>
              <span className="text-[9px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/[0.06] text-zinc-400 border border-white/10">
                {t.category}
              </span>
            </div>

            <p className="text-zinc-400 text-xs leading-relaxed font-sans">
              {t.definition}
            </p>

            <div className="p-3.5 rounded-xl bg-black/80 border border-white/10 text-xs text-zinc-200 flex items-start gap-2.5 font-mono shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
              <ShieldCheck className="w-4 h-4 shrink-0 text-white mt-0.5" />
              <span className="text-[11px] leading-relaxed"><strong className="text-white font-bold">Countermeasure:</strong> {t.tip}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
