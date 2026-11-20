import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  ChevronDown, 
  PanelLeftClose, 
  PanelLeft, 
  Search,
  Sparkles,
  Zap,
  CheckCircle2,
  X
} from 'lucide-react';
import { navigationConfig, findCategoryForView } from '../../config/navigation';

export default function SidebarAccordion({ 
  activeView, 
  setActiveView, 
  isCollapsed, 
  onToggleCollapse, 
  userState 
}) {
  const [filterQuery, setFilterQuery] = useState('');

  // Map of open state per category ID: all open by default for effortless discoverability
  const [expandedCategories, setExpandedCategories] = useState({
    core: true,
    labs: true,
    learn: true,
    intel: true,
    resources: true
  });

  // Whenever activeView changes, ensure its parent category is expanded
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
        fixed top-0 bottom-0 left-0 z-40 bg-[#000000]/95 backdrop-blur-2xl border-r border-white/15 flex flex-col justify-between transition-all duration-300 shadow-[15px_0_50px_rgba(0,0,0,0.9),inset_-1px_0_0_rgba(255,255,255,0.06)]
        ${isCollapsed ? 'w-16' : 'w-72'}
        hidden lg:flex
      `}
      aria-label="Sidebar Navigation"
    >
      
      {/* 1. Sidebar Top Header */}
      <div className="h-16 px-4 border-b border-white/10 flex items-center justify-between shrink-0">
        {!isCollapsed ? (
          <button 
            type="button"
            onClick={() => setActiveView('home')}
            className="flex items-center gap-3 cursor-pointer group text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(255,255,255,0.5),inset_0_1px_1px_#ffffff] group-hover:scale-105 transition-transform">
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
          </button>
        ) : (
          <button 
            type="button"
            onClick={() => setActiveView('home')}
            className="w-8 h-8 mx-auto rounded-lg bg-white flex items-center justify-center shrink-0 cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.5)] hover:scale-105 transition-transform"
            title="CyberBuddy Home"
          >
            <Shield className="w-4 h-4 text-black fill-black" />
          </button>
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

      {/* 2. Optional Quick Search Filter (Visible when expanded) */}
      {!isCollapsed && (
        <div className="px-3 pt-3 pb-1 shrink-0">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={filterQuery}
              onChange={e => setFilterQuery(e.target.value)}
              placeholder="Filter topics..."
              className="w-full bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-white/40 focus:bg-white/[0.07] rounded-xl pl-8 pr-7 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none transition-all font-sans"
            />
            {filterQuery && (
              <button
                type="button"
                onClick={() => setFilterQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* 3. Scrollable Clean Categorized Topic List */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 scrollbar-thin">
        {navigationConfig.map((category) => {
          // Filter items if user is searching
          const filteredItems = filterQuery.trim() === ''
            ? category.items
            : category.items.filter(item => {
                const query = filterQuery.toLowerCase();
                const matchesLabel = item.label.toLowerCase().includes(query);
                const matchesKeywords = item.keywords?.some(k => k.toLowerCase().includes(query));
                return matchesLabel || matchesKeywords;
              });

          // Skip section if filtering and no matching items
          if (filterQuery.trim() !== '' && filteredItems.length === 0) {
            return null;
          }

          const isExpanded = filterQuery.trim() !== '' ? true : !!expandedCategories[category.id];
          const isCategoryActive = category.items.some(item => item.id === activeView);
          const CategoryIcon = category.icon;

          if (isCollapsed) {
            // Collapsed Rail View: Clean icon triggers with active highlight
            return (
              <div key={category.id} className="relative group flex justify-center">
                <button
                  type="button"
                  onClick={() => {
                    onToggleCollapse();
                    toggleCategory(category.id);
                  }}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                    isCategoryActive
                      ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)] font-bold'
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
            /* Clean Section Container */
            <div 
              key={category.id}
              className={`rounded-2xl transition-all duration-200 border ${
                isCategoryActive 
                  ? 'border-white/20 bg-white/[0.04]' 
                  : 'border-white/5 bg-transparent hover:border-white/10'
              }`}
            >
              {/* Category Header (Accordion trigger) */}
              <button
                type="button"
                onClick={() => toggleCategory(category.id)}
                aria-expanded={isExpanded}
                className="w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`p-1.5 rounded-lg shrink-0 transition-colors ${
                    isCategoryActive 
                      ? 'bg-white text-black font-bold shadow-sm' 
                      : 'bg-white/5 text-zinc-400 group-hover:text-white group-hover:bg-white/10'
                  }`}>
                    <CategoryIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className={`text-xs font-bold font-sans tracking-wide truncate ${
                    isCategoryActive ? 'text-white' : 'text-zinc-300 group-hover:text-white'
                  }`}>
                    {category.label}
                  </span>
                </div>

                <ChevronDown 
                  className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${
                    isExpanded ? 'rotate-180 text-white' : 'text-zinc-500'
                  }`} 
                />
              </button>

              {/* Sub-items List */}
              {isExpanded && (
                <div className="px-2 pb-2 pt-0.5 space-y-0.5 animate-fade-in">
                  {filteredItems.map((item) => {
                    const isItemActive = activeView === item.id;
                    const ItemIcon = item.icon;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveView(item.id)}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                          isItemActive
                            ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.35)]'
                            : 'text-zinc-400 hover:text-white hover:bg-white/[0.08]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <ItemIcon className={`w-3.5 h-3.5 shrink-0 ${
                            isItemActive ? 'text-black' : 'text-zinc-400'
                          }`} />
                          <span className="truncate">{item.label}</span>
                        </div>

                        {item.badge && (
                          <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold shrink-0 ml-1.5 ${
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
              )}
            </div>
          );
        })}
      </div>

      {/* 4. Bottom Readiness Card */}
      {!isCollapsed && (
        <div className="p-3 border-t border-white/10 shrink-0">
          <div className="p-3 rounded-xl bg-gradient-to-b from-white/[0.06] to-black/80 border border-white/10 space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-white">Readiness Score</span>
              <span className="text-zinc-300 font-mono">{userState?.xp || 460} XP</span>
            </div>
            
            <div className="w-full bg-black/60 border border-white/10 h-1.5 rounded-full overflow-hidden p-[1px]">
              <div className="bg-gradient-to-r from-zinc-300 to-white h-full rounded-full w-[80%] shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            </div>

            <p className="text-[10px] font-mono text-zinc-400 leading-tight">
              CYBER DEFENDER &bull; LEVEL 04
            </p>
          </div>
        </div>
      )}

    </aside>
  );
}
