import React, { useState } from 'react';
import { 
  Compass, 
  ShieldCheck, 
  Terminal, 
  Award, 
  ExternalLink, 
  CheckCircle2, 
  ArrowRight, 
  Briefcase, 
  Cpu, 
  BookOpen, 
  Layers, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { TR } from '../data/cyberawareData';

export default function CareerTracks({ setActiveView }) {
  const [selectedTrackId, setSelectedTrackId] = useState(TR[0].id);

  const selectedTrack = TR.find(t => t.id === selectedTrackId) || TR[0];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="glass-specular rounded-3xl p-6 sm:p-10 border border-white/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.04] rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-zinc-300">
            <Compass className="w-3.5 h-3.5 text-blue-400" />
            <span>INDUSTRY CAREER PATHWAYS & SPECIALIZATIONS</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold font-heading text-white">
            Cybersecurity Career Roadmaps
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Discover where your technical strengths match high-demand industry roles. Explore day-to-day duties, essential prerequisite skills, hands-on starter projects, and top global certifications.
          </p>
        </div>
      </div>

      {/* Track Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {TR.map((track) => {
          const isSelected = track.id === selectedTrackId;
          return (
            <button
              key={track.id}
              onClick={() => setSelectedTrackId(track.id)}
              className={`p-4 rounded-2xl text-left transition-all border cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-white text-black border-white shadow-[0_10px_30px_rgba(255,255,255,0.35)] -translate-y-1'
                  : 'bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <div className="text-2xl mb-2">{track.ico}</div>
              <div>
                <div className="text-xs font-bold leading-snug line-clamp-2">
                  {track.t}
                </div>
                <div className={`text-[10px] mt-1 font-mono line-clamp-1 ${isSelected ? 'text-zinc-600' : 'text-zinc-400'}`}>
                  {track.s}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Track Detailed Breakdown */}
      <div className="glass-specular rounded-3xl p-6 sm:p-10 border border-white/20 space-y-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-3xl shadow-inner">
              {selectedTrack.ico}
            </div>
            <div>
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                ROLE PROFILE
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading mt-0.5">
                {selectedTrack.t}
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm mt-0.5 font-mono">
                {selectedTrack.s}
              </p>
            </div>
          </div>

          {setActiveView && (
            <button
              onClick={() => setActiveView('practice')}
              className="btn-glossy px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md self-start md:self-auto"
            >
              <span>Practice Relevant Labs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Day-to-Day Responsibilities */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-blue-400" />
            <span>What You Actually Do (Core Mission)</span>
          </h3>
          <p className="text-base text-zinc-200 leading-relaxed font-sans bg-black/40 p-5 rounded-2xl border border-white/10">
            {selectedTrack.w}
          </p>
        </div>

        {/* 3 Columns: Skills, Starter Projects, Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 1. Essential Skills */}
          <div className="glass rounded-2xl p-6 border border-white/15 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>Core Skills Needed</span>
            </h4>
            <div className="flex flex-col gap-2">
              {selectedTrack.sk.map((skill, sIdx) => (
                <div 
                  key={sIdx}
                  className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-zinc-200 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Starter Projects */}
          <div className="glass rounded-2xl p-6 border border-white/15 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>How To Start Right Now</span>
            </h4>
            <div className="flex flex-col gap-2.5">
              {selectedTrack.st.map((starter, stIdx) => (
                <div 
                  key={stIdx}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-300 leading-relaxed font-sans flex items-start gap-2.5"
                >
                  <span className="font-mono text-[10px] font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded shrink-0">
                    #{stIdx + 1}
                  </span>
                  <span>{starter}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Industry Certifications */}
          <div className="glass rounded-2xl p-6 border border-white/15 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-400" />
              <span>Recognized Certifications</span>
            </h4>
            <div className="flex flex-col gap-2">
              {selectedTrack.c.map((cert, cIdx) => (
                <div 
                  key={cIdx}
                  className="px-3 py-2.5 rounded-xl bg-purple-950/20 border border-purple-500/30 text-xs font-mono text-purple-200 flex items-center gap-2 font-medium"
                >
                  <Award className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
