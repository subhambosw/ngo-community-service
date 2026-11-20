import React, { useState } from 'react';
import { 
  Shield, 
  X, 
  ChevronDown, 
  PhoneCall, 
  RotateCcw,
  Search
} from 'lucide-react';
import { navigationConfig } from '../../config/navigation';

export default function MobileNavDrawer({ 
  isOpen, 
  onClose, 
  activeView, 
  setActiveView, 
  userState,
  onResetProgress
}) {
  const [filterQuery, setFilterQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({
    core: true,
    labs: true,
    learn: true,
    intel: true,
    resources: true
  });

  if (!isOpen) return null;

  const toggleCategory = (catId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  const handleSelectView = (viewId) => {
    setActiveView(viewId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden animate-fade-in" role="dialog" aria-modal="true">
      {/* 1. Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* 2. Slide-In Navigation Drawer */}
      <div className="fixed inset-y-0 left-0 w-[300px] max-w-[85vw] bg-[#050507] border-r border-white/20 shadow-2xl flex flex-col justify-between z-50 overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between shrink-0 bg-black/40">
          <button 
            type="button"
            onClick={() => handleSelectView('home')}
            className="flex items-center gap-2.5 cursor-pointer text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.4)]">
              <Shield className="w-4 h-4 text-black fill-black" />
            </div>
            <div>
              <span className="font-heading font-black tracking-wider text-white text-base leading-none block">
                CYBERBUDDY
              </span>
              <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase">
                ACADEMY
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Filter Search */}
        <div className="px-3 pt-3 pb-1 shrink-0">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={filterQuery}
              onChange={e => setFilterQuery(e.target.value)}
              placeholder="Search topics..."
              className="w-full bg-white/[0.05] border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 font-sans"
            />
          </div>
        </div>

        {/* Scrollable Accordion Section List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
          {navigationConfig.map((category) => {
            const filteredItems = filterQuery.trim() === ''
              ? category.items
              : category.items.filter(item => {
                  const query = filterQuery.toLowerCase();
                  const matchesLabel = item.label.toLowerCase().includes(query);
                  const matchesKeywords = item.keywords?.some(k => k.toLowerCase().includes(query));
                  return matchesLabel || matchesKeywords;
                });

            if (filterQuery.trim() !== '' && filteredItems.length === 0) {
              return null;
            }

            const isExpanded = filterQuery.trim() !== '' ? true : !!expandedCategories[category.id];
            const isCategoryActive = category.items.some(item => item.id === activeView);
            const CategoryIcon = category.icon;

            return (
              <div 
                key={category.id}
                className={`rounded-2xl border transition-all ${
                  isCategoryActive 
                    ? 'border-white/25 bg-white/[0.04]' 
                    : 'border-white/10 bg-white/[0.02]'
                }`}
              >
                {/* Category Accordion Header */}
                <button
                  type="button"
                  onClick={() => toggleCategory(category.id)}
                  className="w-full p-3 flex items-center justify-between text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`p-1.5 rounded-lg shrink-0 ${
                      isCategoryActive ? 'bg-white text-black' : 'bg-white/10 text-zinc-400'
                    }`}>
                      <CategoryIcon className="w-3.5 h-3.5" />
                    </div>
                    <span className={`text-xs font-bold font-sans tracking-wide truncate ${
                      isCategoryActive ? 'text-white' : 'text-zinc-200'
                    }`}>
                      {category.label}
                    </span>
                  </div>

                  <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
                    isExpanded ? 'rotate-180 text-white' : ''
                  }`} />
                </button>

                {/* Submenu List */}
                {isExpanded && (
                  <div className="px-2 pb-2.5 pt-0.5 space-y-1 border-t border-white/5">
                    {filteredItems.map((item) => {
                      const isItemActive = activeView === item.id;
                      const ItemIcon = item.icon;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleSelectView(item.id)}
                          className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                            isItemActive
                              ? 'bg-white text-black font-bold shadow-md'
                              : 'text-zinc-300 hover:text-white hover:bg-white/10 active:bg-white/15'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <ItemIcon className={`w-3.5 h-3.5 shrink-0 ${
                              isItemActive ? 'text-black' : 'text-zinc-400'
                            }`} />
                            <span className="truncate">{item.label}</span>
                          </div>

                          {item.badge && (
                            <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold shrink-0 ml-2 ${
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

        {/* Footer: Emergency Helpline + User Profile */}
        <div className="p-3 border-t border-white/10 bg-black/60 space-y-2.5 shrink-0">
          <button
            type="button"
            onClick={() => handleSelectView('help')}
            className="w-full py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-bold flex items-center justify-center gap-2 shadow-lg cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Emergency Helpline: 1930</span>
          </button>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-xs font-bold text-white font-mono">
                {userState?.userInitials || 'NA'}
              </div>
              <div>
                <p className="text-xs font-bold text-white leading-none">
                  {userState?.userName || 'Student'}
                </p>
                <p className="text-[10px] font-mono text-zinc-400 mt-0.5">
                  {userState?.xp || 460} XP &bull; LEVEL 04
                </p>
              </div>
            </div>

            {onResetProgress && (
              <button
                type="button"
                onClick={onResetProgress}
                title="Reset Progress"
                className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
