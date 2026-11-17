import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ArrowRight, Sparkles } from 'lucide-react';
import { navigationConfig } from '../../config/navigation';

export default function MegaMenu({ activeView, setActiveView }) {
  const [openCategoryId, setOpenCategoryId] = useState(null);
  const menuRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenCategoryId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setOpenCategoryId(null);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMouseEnter = (catId) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setOpenCategoryId(catId);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setOpenCategoryId(null);
    }, 200);
  };

  const toggleCategory = (catId) => {
    setOpenCategoryId(prev => (prev === catId ? null : catId));
  };

  const activeCategory = navigationConfig.find(cat => cat.id === openCategoryId);

  return (
    <div 
      ref={menuRef} 
      className="relative flex items-center"
      onMouseLeave={handleMouseLeave}
    >
      {/* Category Triggers */}
      <nav className="flex items-center gap-1" role="menubar" aria-label="Main Navigation">
        {navigationConfig.map((cat) => {
          const isOpen = openCategoryId === cat.id;
          const isCategoryActive = cat.columns.some(col => 
            col.items.some(item => item.id === activeView)
          );

          return (
            <div
              key={cat.id}
              className="relative"
              onMouseEnter={() => handleMouseEnter(cat.id)}
            >
              <button
                type="button"
                onClick={() => toggleCategory(cat.id)}
                aria-haspopup="true"
                aria-expanded={isOpen}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                  isOpen
                    ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                    : isCategoryActive
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'text-zinc-300 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                <span>{cat.shortLabel || cat.label}</span>
                <ChevronDown 
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-black' : isCategoryActive ? 'text-white' : 'text-zinc-400'
                  }`} 
                />
              </button>
            </div>
          );
        })}
      </nav>

      {/* Mega Menu Dropdown Panel */}
      {activeCategory && (
        <div 
          role="menu"
          aria-label={activeCategory.label}
          onMouseEnter={() => {
            if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
          }}
          className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[820px] max-w-[92vw] z-50 animate-fade-in"
        >
          <div className="glass-specular rounded-3xl p-6 border border-white/20 shadow-[0_30px_70px_rgba(0,0,0,0.95),inset_0_1px_1.5px_rgba(255,255,255,0.3)] backdrop-blur-3xl overflow-hidden relative">
            
            {/* Top Category Description Banner */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                  <activeCategory.icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-heading text-white">
                    {activeCategory.label}
                  </h3>
                  <p className="text-[11px] text-zinc-400 font-sans">
                    {activeCategory.description}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest hidden sm:inline">
                ESC to close
              </span>
            </div>

            {/* Multi-Column Submenu Grid */}
            <div className={`grid gap-6 ${
              activeCategory.columns.length === 3 
                ? 'grid-cols-3' 
                : activeCategory.columns.length === 2 
                  ? 'grid-cols-2' 
                  : 'grid-cols-1'
            }`}>
              {activeCategory.columns.map((col, colIdx) => (
                <div key={colIdx} className="space-y-3">
                  <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 font-semibold px-1">
                    {col.heading}
                  </h4>

                  <div className="space-y-1.5">
                    {col.items.map((item) => {
                      const isItemActive = activeView === item.id;
                      const IconComponent = item.icon;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          role="menuitem"
                          onClick={() => {
                            setActiveView(item.id);
                            setOpenCategoryId(null);
                          }}
                          className={`w-full text-left p-3 rounded-2xl transition-all duration-200 flex items-start gap-3 group cursor-pointer border ${
                            isItemActive
                              ? 'bg-white text-black border-white shadow-[0_6px_25px_rgba(255,255,255,0.35)]'
                              : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.08] hover:border-white/20 text-zinc-300'
                          }`}
                        >
                          <div className={`p-2 rounded-xl shrink-0 mt-0.5 transition-all ${
                            isItemActive
                              ? 'bg-black text-white shadow-inner'
                              : 'bg-white/5 text-zinc-300 border border-white/10 group-hover:bg-white/10 group-hover:text-white'
                          }`}>
                            <IconComponent className="w-4 h-4" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1.5">
                              <span className={`text-xs font-bold font-sans tracking-wide truncate ${
                                isItemActive ? 'text-black' : 'text-white group-hover:text-white'
                              }`}>
                                {item.label}
                              </span>

                              {item.badge && (
                                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold shrink-0 ${
                                  isItemActive
                                    ? 'bg-black text-white'
                                    : item.badge === '1930' || item.badge === 'ALERT'
                                      ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                                      : 'bg-white/10 text-zinc-300 border border-white/10'
                                }`}>
                                  {item.badge}
                                </span>
                              )}
                            </div>

                            <p className={`text-[11px] leading-snug mt-1 line-clamp-2 ${
                              isItemActive ? 'text-zinc-700' : 'text-zinc-400 group-hover:text-zinc-300'
                            }`}>
                              {item.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
