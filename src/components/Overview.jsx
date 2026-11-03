import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Check, ChevronRight, Shuffle } from 'lucide-react';

export default function Overview({ setActiveView, userState }) {
  // Collection of wallpapers:
  // 1. The exact reference image from the screenshot
  // 2. The pristine 8K studio photo of laptop & hardware security key
  // 3. Curated dark minimalist cyber wallpapers for random switching
  const wallpapers = [
    '/reference-mission.png',
    '/mission-bg-1.jpg',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80'
  ];

  const [currentWallpaperIdx, setCurrentWallpaperIdx] = useState(0);

  // Automatically cycle wallpaper every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWallpaperIdx((prev) => (prev + 1) % wallpapers.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [wallpapers.length]);

  const cycleWallpaper = (e) => {
    if (e) e.stopPropagation();
    setCurrentWallpaperIdx((prev) => (prev + 1) % wallpapers.length);
  };

  const curriculumCourses = [
    {
      id: 'password',
      num: '01',
      title: 'Password foundations',
      meta: '4 lessons · 18 min',
      progress: 100,
      completed: true,
    },
    {
      id: 'phishing',
      num: '02',
      title: 'Spot the phish',
      meta: '3 of 5 complete',
      progress: 60,
      completed: false,
    },
    {
      id: 'privacy',
      num: '03',
      title: 'Social engineering',
      meta: '1 of 5 complete',
      progress: 25,
      completed: false,
    },
    {
      id: 'network',
      num: '04',
      title: 'Safer browsing',
      meta: '4 lessons · 22 min',
      progress: 5,
      completed: false,
    },
  ];

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-[1400px] mx-auto">
      
      {/* 1. Daily Security Brief Card (Enhanced Monochrome Specular Highlights) */}
      <div className="bg-[#09090b]/75 backdrop-blur-2xl border border-white/20 hover:border-white/40 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_1.5px_rgba(255,255,255,0.45)] transition-all">
        <div className="space-y-3 max-w-2xl">
          <p className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase font-semibold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            WEDNESDAY &nbsp;&middot;&nbsp; SECURITY BRIEF 04
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-white tracking-tight leading-tight">
            Your digital instincts are getting sharper.
          </h2>
          <p className="text-sm text-zinc-300 font-normal">
            One focused action today can prevent a costly mistake tomorrow.
          </p>
        </div>

        {/* Security Score with Chrome Halo */}
        <div className="text-left md:text-right shrink-0 border-t md:border-t-0 border-white/10 pt-4 md:pt-0 w-full md:w-auto">
          <div className="flex items-baseline md:justify-end gap-1.5">
            <span className="text-5xl sm:text-6xl font-extrabold font-heading text-metallic drop-shadow-[0_0_25px_rgba(255,255,255,0.35)] tracking-tight">
              72
            </span>
            <span className="text-sm font-mono text-zinc-400">/ 100</span>
          </div>
          <p className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase mt-1 font-semibold">
            SECURITY SCORE
          </p>
        </div>
      </div>

      {/* 2. Middle Row: Next Mission Card with Wallpaper + 2 Stacked Stat Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Next Mission Card (Enhanced Specular Rim & Chrome Effects) */}
        <div className="lg:col-span-2 relative rounded-xl border border-white/25 overflow-hidden min-h-[320px] sm:min-h-[360px] flex flex-col justify-between p-6 sm:p-8 bg-[#09090b]/85 backdrop-blur-md group shadow-[0_25px_60px_rgba(0,0,0,0.95),inset_0_1.5px_1.5px_rgba(255,255,255,0.5)]">
          
          {/* Real Background Wallpaper Image (High Brightness & Smooth Auto Transition) */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out filter grayscale brightness-125 contrast-105 group-hover:scale-105"
            style={{ 
              backgroundImage: `url(${wallpapers[currentWallpaperIdx]})`,
              backgroundPosition: 'center 45%'
            }}
          />

          {/* Calibrated Contrast Gradients for Clear Brightness & Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/20 to-transparent pointer-events-none" />

          {/* Top Tag & Wallpaper Switcher Button */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="inline-block px-3 py-1 rounded bg-black/80 border border-white/20 text-[10px] font-mono tracking-widest text-zinc-200 uppercase font-semibold backdrop-blur-md">
              NEXT MISSION &nbsp;&middot;&nbsp; 08 MIN
            </span>

            {/* Change Wallpaper Button with 5s Auto Indicator */}
            <button
              onClick={cycleWallpaper}
              title="Cycles automatically every 5s (Click to shuffle manually)"
              className="p-1.5 px-2.5 rounded-lg bg-black/70 hover:bg-black/95 border border-white/25 text-zinc-300 hover:text-white transition-all text-xs flex items-center gap-1.5 backdrop-blur-md font-mono"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span className="text-[10px] hidden sm:inline">Auto 5s</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
            </button>
          </div>

          {/* Card Content & Action Button */}
          <div className="relative z-10 space-y-6 pt-12">
            <h3 className="text-2xl sm:text-4xl font-bold font-heading text-white tracking-tight max-w-md leading-tight drop-shadow-md">
              The email looks real.<br />Is it?
            </h3>

            <div>
              <button
                onClick={() => setActiveView('phishing')}
                className="btn-glossy px-6 py-3 rounded-lg text-xs sm:text-sm font-bold inline-flex items-center gap-2 hover:translate-x-0.5"
              >
                <span>Start challenge</span>
                <span className="text-base">&rarr;</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: 2 Stacked Stat Cards */}
        <div className="flex flex-col gap-6">
          
          {/* Total XP Card */}
          <div 
            onClick={() => setActiveView('lessons')}
            className="flex-1 bg-gradient-to-b from-[#18181b]/70 to-[#09090b]/90 backdrop-blur-2xl border border-white/20 hover:border-white/45 rounded-xl p-6 sm:p-7 flex flex-col justify-between cursor-pointer transition-all duration-300 group shadow-[0_20px_40px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.9),inset_0_1px_1.5px_rgba(255,255,255,0.6),0_0_25px_rgba(255,255,255,0.08)] hover:-translate-y-0.5"
          >
            <div className="flex justify-between items-start">
              <div className="text-4xl sm:text-5xl font-extrabold font-heading text-white tracking-tight drop-shadow-[0_2px_12px_rgba(255,255,255,0.25)]">
                {userState.xp || 460}
              </div>
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/35 transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
              </div>
            </div>

            <div className="space-y-1 pt-4">
              <p className="text-xs text-zinc-300 font-semibold tracking-wide">Total XP</p>
              <p className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                TOP 18% THIS WEEK
              </p>
            </div>
          </div>

          {/* Day Streak Card */}
          <div 
            onClick={() => setActiveView('overview')}
            className="flex-1 bg-gradient-to-b from-[#18181b]/70 to-[#09090b]/90 backdrop-blur-2xl border border-white/20 hover:border-white/45 rounded-xl p-6 sm:p-7 flex flex-col justify-between cursor-pointer transition-all duration-300 group shadow-[0_20px_40px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.9),inset_0_1px_1.5px_rgba(255,255,255,0.6),0_0_25px_rgba(255,255,255,0.08)] hover:-translate-y-0.5"
          >
            <div className="flex justify-between items-start">
              <div className="text-4xl sm:text-5xl font-extrabold font-heading text-white tracking-tight drop-shadow-[0_2px_12px_rgba(255,255,255,0.25)]">
                {userState.streak || 7}
              </div>
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/35 transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
              </div>
            </div>

            <div className="space-y-1 pt-4">
              <p className="text-xs text-zinc-300 font-semibold tracking-wide">Day streak</p>
              <p className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                PERSONAL BEST: 11
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* 3. Bottom Section: Curriculum / Continue Learning (Exact Reference Match) */}
      <div className="space-y-4 pt-4">
        
        {/* Section Header */}
        <div>
          <p className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-semibold">
            CURRICULUM
          </p>
          <div className="flex justify-between items-center mt-1">
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Continue learning
            </h3>
            <button
              onClick={() => setActiveView('lessons')}
              className="text-xs text-zinc-300 hover:text-white flex items-center gap-1 font-mono transition-colors font-semibold"
            >
              <span>View all</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {curriculumCourses.map((c) => (
            <div
              key={c.id}
              onClick={() => setActiveView(c.id)}
              className="bg-gradient-to-b from-[#18181b]/70 to-[#09090b]/90 backdrop-blur-2xl border border-white/15 hover:border-white/40 rounded-xl p-5 flex flex-col justify-between min-h-[145px] cursor-pointer transition-all duration-300 group shadow-[0_15px_30px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.35)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.9),inset_0_1px_1.5px_rgba(255,255,255,0.55),0_0_20px_rgba(255,255,255,0.06)] hover:-translate-y-0.5"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-mono text-zinc-400 font-semibold tracking-wider">{c.num}</span>
                  {c.completed && (
                    <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_10px_rgba(255,255,255,0.6)]">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </div>
                  )}
                </div>

                <h4 className="text-sm font-bold text-white group-hover:text-zinc-100 transition-colors drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                  {c.title}
                </h4>
                <p className="text-[11px] text-zinc-400 mt-1 font-medium">
                  {c.meta}
                </p>
              </div>

              {/* Progress bar at bottom of card */}
              <div className="w-full bg-black/60 border border-white/10 h-1.5 rounded-full overflow-hidden mt-4 p-[1px]">
                <div 
                  className="bg-gradient-to-r from-zinc-300 to-white h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(255,255,255,0.7)]" 
                  style={{ width: `${c.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
