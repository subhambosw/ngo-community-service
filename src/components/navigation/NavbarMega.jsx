import React, { useState, useRef, useEffect } from 'react';
import { 
  Shield, 
  Menu, 
  RotateCcw, 
  PanelLeftClose, 
  PanelLeft, 
  PhoneCall, 
  Search,
  ChevronDown,
  X,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Command
} from 'lucide-react';
import { navigationConfig, allNavItems } from '../../config/navigation';

export default function NavbarMega({ 
  activeView, 
  setActiveView, 
  setMobileOpen, 
  isSidebarCollapsed, 
  onToggleSidebar, 
  userState, 
  onResetProgress 
}) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Global Ctrl+K / Cmd+K shortcut for search
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        setSearchModalOpen(false);
        setOpenDropdown(null);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto focus input when search modal opens
  useEffect(() => {
    if (searchModalOpen) {
      setSearchQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [searchModalOpen]);

  // Filter items for search modal
  const filteredNavItems = searchQuery.trim() === ''
    ? allNavItems
    : allNavItems.filter(item => {
        const query = searchQuery.toLowerCase();
        const matchesLabel = item.label.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesKeywords = item.keywords?.some(k => k.toLowerCase().includes(query));
        return matchesLabel || matchesDesc || matchesKeywords;
      });

  // Handle keyboard navigation inside search modal
  const handleSearchKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (filteredNavItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + (filteredNavItems.length || 1)) % (filteredNavItems.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredNavItems[selectedIndex]) {
        setActiveView(filteredNavItems[selectedIndex].id);
        setSearchModalOpen(false);
      }
    }
  };

  const getBreadcrumb = () => {
    const item = allNavItems.find(i => i.id === activeView);
    return item ? item.id : activeView;
  };

  // Find category definitions
  const labsCategory = navigationConfig.find(c => c.id === 'labs');
  const learnCategory = navigationConfig.find(c => c.id === 'learn');
  const intelCategory = navigationConfig.find(c => c.id === 'intel');
  const resourcesCategory = navigationConfig.find(c => c.id === 'resources');

  const isLabsActive = labsCategory?.items.some(i => i.id === activeView);
  const isLearnActive = learnCategory?.items.some(i => i.id === activeView);
  const isIntelActive = intelCategory?.items.some(i => i.id === activeView);
  const isResourcesActive = resourcesCategory?.items.some(i => i.id === activeView);

  return (
    <>
      <header className="sticky top-0 z-30 h-16 bg-[#000000]/90 backdrop-blur-2xl border-b border-white/15 flex items-center justify-between px-3 sm:px-6 shadow-[0_10px_30px_rgba(0,0,0,0.8),inset_0_-1px_0_rgba(255,255,255,0.08)]">
        
        {/* Left Section: Mobile Menu, Logo, Sidebar Toggle & Breadcrumb */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Hamburger Trigger */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open mobile navigation"
            className="lg:hidden p-2 rounded-xl text-zinc-400 hover:text-white bg-white/5 border border-white/10 shadow-sm cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Brand / Logo (clickable to Home) */}
          <button 
            type="button"
            onClick={() => setActiveView('home')}
            className={`flex items-center gap-2.5 cursor-pointer text-left group ${!isSidebarCollapsed ? 'lg:hidden' : 'flex'}`}
            title="Go to Home"
          >
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.4)] group-hover:scale-105 transition-transform">
              <Shield className="w-4 h-4 text-black fill-black" />
            </div>
            <span className="font-heading font-black tracking-wider text-white text-base leading-none hidden sm:block">
              CYBERBUDDY
            </span>
          </button>

          {/* Desktop Sidebar Toggle Button */}
          <button
            type="button"
            onClick={onToggleSidebar}
            title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            className="hidden lg:flex items-center gap-1.5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors border border-transparent hover:border-white/15 cursor-pointer"
          >
            {isSidebarCollapsed ? (
              <PanelLeft className="w-4 h-4 text-zinc-300" />
            ) : (
              <PanelLeftClose className="w-4 h-4 text-zinc-400" />
            )}
          </button>

          {/* Terminal Breadcrumb Chip */}
          <div className="hidden xl:flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
              user@cyberbuddy:~/{getBreadcrumb()}
            </span>
          </div>
        </div>

        {/* Center Section: Direct Clickable Top Navigation Links */}
        <nav 
          ref={dropdownRef}
          className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1 rounded-2xl border border-white/10 shadow-inner"
          aria-label="Primary Navigation"
        >
          {/* 1. Home Button (Direct Click) */}
          <button
            type="button"
            onClick={() => {
              setActiveView('home');
              setOpenDropdown(null);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
              activeView === 'home'
                ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                : 'text-zinc-300 hover:text-white hover:bg-white/[0.08]'
            }`}
          >
            Home
          </button>

          {/* 2. Dashboard Button (Direct Click) */}
          <button
            type="button"
            onClick={() => {
              setActiveView('overview');
              setOpenDropdown(null);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
              activeView === 'overview'
                ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                : 'text-zinc-300 hover:text-white hover:bg-white/[0.08]'
            }`}
          >
            Dashboard
          </button>

          {/* 3. Security Labs (Direct Click to Phishing or Current Lab + Dropdown) */}
          <div className="relative group">
            <div className="flex items-center rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => {
                  // Direct navigation: go to first lab or toggle
                  setActiveView('phishing');
                  setOpenDropdown(null);
                }}
                className={`px-2.5 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                  isLabsActive
                    ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                    : 'text-zinc-300 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                Labs
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDropdown(openDropdown === 'labs' ? null : 'labs');
                }}
                aria-label="Toggle Labs Menu"
                className={`px-1.5 py-1.5 text-xs transition-colors cursor-pointer ${
                  isLabsActive
                    ? 'bg-white text-black'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === 'labs' ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Labs Dropdown Menu */}
            {openDropdown === 'labs' && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-[#09090d]/95 border border-white/20 rounded-2xl p-2 shadow-2xl backdrop-blur-2xl z-50 animate-fade-in">
                <div className="px-3 py-1.5 border-b border-white/10 mb-1">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">
                    Hands-On Security Labs
                  </p>
                </div>
                <div className="space-y-1">
                  {labsCategory?.items.map(item => {
                    const isActive = activeView === item.id;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setActiveView(item.id);
                          setOpenDropdown(null);
                        }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs transition-all cursor-pointer ${
                          isActive 
                            ? 'bg-white text-black font-bold shadow-md' 
                            : 'text-zinc-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-black' : 'text-zinc-400'}`} />
                        <div className="flex-1 min-w-0">
                          <p className="truncate font-semibold">{item.label}</p>
                          <p className={`text-[10px] truncate ${isActive ? 'text-zinc-700' : 'text-zinc-500'}`}>
                            {item.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 4. Learn & Practice (Direct Click to Lessons + Dropdown) */}
          <div className="relative group">
            <div className="flex items-center rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => {
                  setActiveView('lessons');
                  setOpenDropdown(null);
                }}
                className={`px-2.5 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                  isLearnActive
                    ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                    : 'text-zinc-300 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                Learn
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDropdown(openDropdown === 'learn' ? null : 'learn');
                }}
                aria-label="Toggle Learn Menu"
                className={`px-1.5 py-1.5 text-xs transition-colors cursor-pointer ${
                  isLearnActive
                    ? 'bg-white text-black'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === 'learn' ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Learn Dropdown Menu */}
            {openDropdown === 'learn' && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-[#09090d]/95 border border-white/20 rounded-2xl p-2 shadow-2xl backdrop-blur-2xl z-50 animate-fade-in">
                <div className="px-3 py-1.5 border-b border-white/10 mb-1">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">
                    Curriculum & Practice
                  </p>
                </div>
                <div className="space-y-1">
                  {learnCategory?.items.map(item => {
                    const isActive = activeView === item.id;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setActiveView(item.id);
                          setOpenDropdown(null);
                        }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs transition-all cursor-pointer ${
                          isActive 
                            ? 'bg-white text-black font-bold shadow-md' 
                            : 'text-zinc-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-black' : 'text-zinc-400'}`} />
                        <div className="flex-1 min-w-0">
                          <p className="truncate font-semibold">{item.label}</p>
                          <p className={`text-[10px] truncate ${isActive ? 'text-zinc-700' : 'text-zinc-500'}`}>
                            {item.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 5. Live Threat Radar (Direct Click) */}
          <button
            type="button"
            onClick={() => {
              setActiveView('threat-map');
              setOpenDropdown(null);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
              activeView === 'threat-map'
                ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                : 'text-zinc-300 hover:text-white hover:bg-white/[0.08]'
            }`}
          >
            Threat Radar
          </button>

          {/* 6. Resources & Career (Direct Click to Glossary + Dropdown) */}
          <div className="relative group">
            <div className="flex items-center rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => {
                  setActiveView('glossary');
                  setOpenDropdown(null);
                }}
                className={`px-2.5 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                  isResourcesActive
                    ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                    : 'text-zinc-300 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                Resources
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDropdown(openDropdown === 'resources' ? null : 'resources');
                }}
                aria-label="Toggle Resources Menu"
                className={`px-1.5 py-1.5 text-xs transition-colors cursor-pointer ${
                  isResourcesActive
                    ? 'bg-white text-black'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === 'resources' ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Resources Dropdown Menu */}
            {openDropdown === 'resources' && (
              <div className="absolute top-full right-0 mt-2 w-72 bg-[#09090d]/95 border border-white/20 rounded-2xl p-2 shadow-2xl backdrop-blur-2xl z-50 animate-fade-in">
                <div className="px-3 py-1.5 border-b border-white/10 mb-1">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">
                    Resources & Community
                  </p>
                </div>
                <div className="space-y-1">
                  {resourcesCategory?.items.map(item => {
                    const isActive = activeView === item.id;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setActiveView(item.id);
                          setOpenDropdown(null);
                        }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs transition-all cursor-pointer ${
                          isActive 
                            ? 'bg-white text-black font-bold shadow-md' 
                            : 'text-zinc-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-black' : 'text-zinc-400'}`} />
                        <div className="flex-1 min-w-0">
                          <p className="truncate font-semibold">{item.label}</p>
                          <p className={`text-[10px] truncate ${isActive ? 'text-zinc-700' : 'text-zinc-500'}`}>
                            {item.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right Section: Quick Search, SOS 1930 & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Quick Search Trigger (Ctrl+K) */}
          <button
            type="button"
            onClick={() => setSearchModalOpen(true)}
            className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-400 hover:text-white transition-all cursor-pointer"
            title="Search any topic (Ctrl + K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden md:inline font-sans text-xs">Search...</span>
            <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] font-mono bg-white/10 border border-white/15 rounded text-zinc-300">
              Ctrl K
            </kbd>
          </button>

          {/* Quick Emergency Help Pill (Direct Click to 1930 Guide) */}
          <button
            type="button"
            onClick={() => {
              setActiveView('help');
              setOpenDropdown(null);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono transition-all cursor-pointer shadow-sm ${
              activeView === 'help'
                ? 'bg-red-600 border-red-400 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)] font-bold'
                : 'bg-red-950/40 hover:bg-red-900/60 border-red-500/40 text-red-200 hover:text-white'
            }`}
            title="Emergency Cyber Fraud Helpline & Guide"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
            <PhoneCall className="w-3 h-3 text-red-400" />
            <span className="font-bold">SOS: 1930</span>
          </button>

          {/* Reset Progress Button */}
          {onResetProgress && (
            <button
              type="button"
              onClick={onResetProgress}
              title="Reset Learning Progress"
              className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors border border-transparent hover:border-white/15 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          {/* User Profile Capsule */}
          <div className="flex items-center gap-2 pl-1">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-white leading-tight">
                {userState?.userName || 'Student'}
              </p>
              <p className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase leading-tight mt-0.5">
                {userState?.xp || 460} XP &bull; LVL 04
              </p>
            </div>

            <div className="w-8 h-8 rounded-lg bg-gradient-to-b from-white/20 to-white/5 border border-white/25 flex items-center justify-center text-xs font-bold text-white font-mono shadow-[0_0_15px_rgba(255,255,255,0.15)]">
              <span>{userState?.userInitials || 'NA'}</span>
            </div>
          </div>

        </div>

      </header>

      {/* Quick Search / Command Palette Modal */}
      {searchModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-20 px-4 animate-fade-in"
          onClick={() => setSearchModalOpen(false)}
        >
          <div 
            className="w-full max-w-xl bg-[#0c0c10] border border-white/20 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Search Input Box */}
            <div className="p-4 border-b border-white/10 flex items-center gap-3">
              <Search className="w-5 h-5 text-zinc-400 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleSearchKeyDown}
                placeholder="Jump to module, lab, game, or tool... (e.g., phishing, password, quiz)"
                className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none font-sans"
              />
              <button
                type="button"
                onClick={() => setSearchModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filteredNavItems.length === 0 ? (
                <div className="py-8 text-center text-zinc-500 text-xs">
                  No matching cybersecurity modules found for "{searchQuery}".
                </div>
              ) : (
                filteredNavItems.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveView(item.id);
                        setSearchModalOpen(false);
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-white text-black font-semibold shadow-md'
                          : 'text-zinc-300 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`p-2 rounded-lg shrink-0 ${
                          isSelected ? 'bg-black text-white' : 'bg-white/5 text-zinc-400'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold truncate">{item.label}</p>
                          <p className={`text-[11px] truncate ${isSelected ? 'text-zinc-700' : 'text-zinc-500'}`}>
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 ml-3">
                        {item.badge && (
                          <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${
                            isSelected ? 'bg-black text-white' : 'bg-white/10 text-zinc-300'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                        <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-black' : 'text-zinc-500'}`} />
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Modal Footer Tips */}
            <div className="p-3 bg-black/40 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>Use &uarr; &darr; to navigate, Enter to select</span>
              <span>ESC to cancel</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
