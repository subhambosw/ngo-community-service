import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  ChevronRight, 
  ChevronDown, 
  PanelLeftClose, 
  PanelLeft, 
  Sparkles,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { navigationConfig, findCategoryForView } from '../../config/navigation';

export default function SidebarAccordion({ 
  activeView, 
  setActiveView, 
  isCollapsed, 
  onToggleCollapse, 
  userState 
}) {
  // Map of open state per category ID: { [catId]: boolean }
  const [expandedCategories, setExpandedCategories] = useState(() => {
    // By default, open the category that contains the activeView
    const found = findCategoryForView(activeView);
    const initial = {
      operations: true,
      labs: true,
      academy: false,
      enterprise: false
    };
    if (found) {
      initial[found.category.id] = true;
    }
    return initial;
  });

  // Whenever activeView changes, make sure its parent category is auto-expanded
  useEffect(() => {
    const found = findCategoryForView(activeView);
    if (found) {
      setExpandedCategories(prev => ({
        ...prev,
        [found.category.id]: true
      }));
    }
  }, [activeView]);

  const toggleCategory = (catId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  return (
    <aside 
      className={`
        fixed top-0 bottom-0 left-0 z-40 bg-[#000000]/90 backdrop-blur-2xl border-r border-white/15 flex flex-col justify-between transition-all duration-300 shadow-[15px_0_50px_rgba(0,0,0,0.9),inset_-1px_0_0_rgba(255,255,255,0.06)]
        ${isCollapsed ? 'w-16' : 'w-72'}
        hidden lg:flex
      `}
      aria-label="Sidebar Accordion Navigation"
    >
      
      {/* 1. Sidebar Top Header */}
      <div className="h-16 px-4 border-b border-white/10 flex items-center justify-between shrink-0">
        {!isCollapsed ? (
          <div 
            onClick={() => setActiveView('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(255,255,255,0.5),inset_0_1px_1px_#ffffff]">
              <Shield className="w-5 h-5 text-black fill-black" />
            </div>
            <div className="min-w-0">
              <span className="font-heading font-black tracking-wider text-white text-base leading-none block drop-shadow-[0_2px_8px_rgba(255,255,255,0.2)]">
                CYBERBUDDY
              </span>
              <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase mt-0.5 block">
                SECURITY ACADEMY
              </span>
            </div>
          </div>
        ) : (
          <div 
            onClick={() => setActiveView('home')}
            className="w-8 h-8 mx-auto rounded-lg bg-white flex items-center justify-center shrink-0 cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.5)]"
            title="CyberBuddy Home"
          >
            <Shield className="w-4 h-4 text-black fill-black" />
          </div>
        )}

        {/* Collapse / Expand Toggle Button */}
        <button
          type="button"
          onClick={onToggleCollapse}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          className={`p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer ${
            isCollapsed ? 'mx-auto mt-1' : ''
          }`}
        >
          {isCollapsed ? (
            <PanelLeft className="w-4 h-4" />
          ) : (
            <PanelLeftClose className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* 2. Scrollable Accordion Body */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3">
        {navigationConfig.map((category) => {
          const isExpanded = !!expandedCategories[category.id];
          const isCategoryActive = category.columns.some(col =>
            col.items.some(item => item.id === activeView)
          );
          const CategoryIcon = category.icon;

          if (isCollapsed) {
            // Collapsed Rail View: Just icon triggers with active indicator
            return (
              <div key={category.id} className="relative group flex justify-center">
                <button
                  type="button"
                  onClick={() => {
                    onToggleCollapse(); // expand when clicking icon in collapsed mode
                    toggleCategory(category.id);
                  }}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                    isCategoryActive
                      ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                      : 'text-zinc-400 hover:text-white hover:bg-white/10'
                  }`}
                  title={category.label}
                >
                  <CategoryIcon className="w-4 h-4" />
                </button>
              </div>
            );
          }

          return (
            /* Expanded Accordion Group */
            <div 
              key={category.id}
              className={`rounded-2xl transition-all duration-200 border ${
                isCategoryActive 
                  ? 'border-white/20 bg-white/[0.04]' 
                  : 'border-white/5 bg-transparent hover:border-white/10'
              }`}
            >
              {/* Category Header Accordion Trigger */}
              <button
                type="button"
                onClick={() => toggleCategory(category.id)}
                aria-expanded={isExpanded}
                className="w-full flex items-center justify-between p-3 rounded-xl text-left transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`p-1.5 rounded-lg shrink-0 transition-colors ${
                    isCategoryActive 
                      ? 'bg-white text-black font-bold' 
                      : 'bg-white/5 text-zinc-400 group-hover:text-white group-hover:bg-white/10'
                  }`}>
                    <CategoryIcon className="w-4 h-4" />
                  </div>
                  <span className={`text-xs font-bold font-sans tracking-wide truncate ${
                    isCategoryActive ? 'text-white' : 'text-zinc-300 group-hover:text-white'
                  }`}>
                    {category.label}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  <ChevronDown 
                    className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180 text-white' : 'text-zinc-500'
                    }`} 
                  />
                </div>
              </button>

              {/* Submenu Accordion Content (Nested) */}
              {isExpanded && (
                <div className="px-2 pb-2.5 pt-0.5 space-y-3 animate-fade-in">
                  {category.columns.map((col, colIdx) => (
                    <div key={colIdx} className="space-y-1">
                      {/* Sub-heading */}
                      <div className="px-2 pt-1 text-[10px] font-mono uppercase tracking-[0.15em] text-zinc-500 font-semibold">
                        {col.heading}
                      </div>

                      {/* Nested Links */}
                      <div className="space-y-0.5 pl-1">
                        {col.items.map((item) => {
                          const isItemActive = activeView === item.id;
                          const ItemIcon = item.icon;

                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setActiveView(item.id)}
                              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                                isItemActive
                                  ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.35)]'
                                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.08]'
                              }`}
                            >
                              <div className="flex items-center gap-2 truncate">
                                <ItemIcon className={`w-3.5 h-3.5 shrink-0 ${
                                  isItemActive ? 'text-black' : 'text-zinc-400'
                                }`} />
                                <span className="truncate">{item.label}</span>
                              </div>

                              {item.badge && (
                                <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold shrink-0 ml-1.5 ${
                                  isItemActive
                                    ? 'bg-black text-white'
                                    : item.badge === '1930' || item.badge === 'ALERT'
                                      ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                                      : 'bg-white/10 text-zinc-300'
                                }`}>
                                  {item.badge}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 3. Bottom Readiness Card */}
      {!isCollapsed && (
        <div className="p-3 border-t border-white/10 shrink-0">
          <div className="p-3 rounded-xl bg-gradient-to-b from-white/[0.06] to-black/80 border border-white/10 space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-white">Readiness Score</span>
              <span className="text-zinc-300 font-mono">{userState.xp || 460} XP</span>
            </div>
            
            <div className="w-full bg-black/60 border border-white/10 h-1.5 rounded-full overflow-hidden p-[1px]">
              <div className="bg-gradient-to-r from-zinc-300 to-white h-full rounded-full w-[80%] shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            </div>

            <p className="text-[10px] font-mono text-zinc-400 leading-tight">
              CYBERBUDDY &bull; LEVEL 04
            </p>
          </div>
        </div>
      )}

    </aside>
  );
}
