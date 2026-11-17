import React, { useState } from 'react';
import NavbarMega from './components/navigation/NavbarMega';
import SidebarAccordion from './components/navigation/SidebarAccordion';
import MobileNavDrawer from './components/navigation/MobileNavDrawer';
import Overview from './components/Overview';
import LessonsHub from './components/LessonsHub';
import PhishingSimulator from './components/PhishingSimulator';
import PasswordLab from './components/PasswordLab';
import PrivacyAuditor from './components/PrivacyAuditor';
import NetworkSafety from './components/NetworkSafety';
import MalwareLab from './components/MalwareLab';
import SecurityQuiz from './components/SecurityQuiz';
import CertificateModal from './components/CertificateModal';
import ThreatGlossary from './components/ThreatGlossary';
import HomeWelcome from './components/HomeWelcome';
import ThreatMap from './components/ThreatMap';
import IncidentResponse from './components/IncidentResponse';
import ComplianceHub from './components/ComplianceHub';
import Leaderboard from './components/Leaderboard';
import ResourceLibrary from './components/ResourceLibrary';
import CyberAlerts from './components/CyberAlerts';
import PracticeGames from './components/PracticeGames';
import SecurityHealthCheck from './components/SecurityHealthCheck';
import EmergencyHelp from './components/EmergencyHelp';
import CareerTracks from './components/CareerTracks';
import { getUserState, addXP, resetProgress } from './utils/storage';
import { Zap, Compass, MessageSquare, Home, Globe } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userState, setUserState] = useState(getUserState());
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync state changes to storage
  const handleAwardXP = (amount, badgeId = null) => {
    const updated = addXP(amount, badgeId);
    setUserState(updated);

    let msg = `+${amount} XP Earned`;
    if (badgeId) {
      msg = `+${amount} XP & Badge Unlocked`;
    }

    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleResetProgress = () => {
    if (window.confirm('Reset all earned XP, streaks, and badges?')) {
      const reset = resetProgress();
      setUserState(reset);
      setToastMessage('Progress reset successfully');
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-zinc-100 font-sans selection:bg-white selection:text-black relative overflow-x-hidden">
      
      {/* 1. Immersive 3D Monochrome Fluted Background Wallpaper */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-70 filter contrast-125 brightness-115 scale-105 transition-opacity duration-1000"
        style={{ backgroundImage: `url('/monochrome-bg.jpg')` }}
      />

      {/* 2. Tuned Ambient Chrome Lighting & Specular Flare */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/60 via-black/45 to-black/85 pointer-events-none" />
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white/[0.18] via-white/[0.04] to-transparent pointer-events-none" />
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_80%_80%,_var(--tw-gradient-stops))] from-white/[0.05] via-transparent to-transparent pointer-events-none" />
      <div className="fixed inset-0 z-0 bg-grid-monochrome opacity-15 pointer-events-none" />

      {/* 3. Collapsible Left Accordion Sidebar */}
      <SidebarAccordion 
        activeView={activeView}
        setActiveView={setActiveView}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        userState={userState}
      />

      {/* 4. Dedicated Responsive Mobile Slide-In Navigation Drawer */}
      <MobileNavDrawer 
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        activeView={activeView}
        setActiveView={setActiveView}
        userState={userState}
        onResetProgress={handleResetProgress}
      />

      {/* 5. Main Content Area */}
      <div className={`${sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-72'} flex flex-col min-h-screen relative z-10 transition-all duration-300`}>
        
        {/* Top Navigation Bar with Mega Menu */}
        <NavbarMega 
          activeView={activeView}
          setActiveView={setActiveView}
          setMobileOpen={setMobileOpen}
          isSidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          userState={userState}
          onResetProgress={handleResetProgress}
        />

        {/* Dynamic Viewport */}
        <main className="flex-1 pb-24">
          {activeView === 'home' && (
            <HomeWelcome 
              setActiveView={setActiveView}
              userState={userState}
              onAwardXP={handleAwardXP}
            />
          )}

          {activeView === 'overview' && (
            <Overview 
              setActiveView={setActiveView}
              userState={userState}
            />
          )}

          {activeView === 'alerts' && (
            <CyberAlerts 
              onAwardXP={handleAwardXP}
            />
          )}

          {activeView === 'help' && (
            <EmergencyHelp 
              setActiveView={setActiveView}
            />
          )}

          {activeView === 'practice' && (
            <PracticeGames 
              onAwardXP={handleAwardXP}
              setActiveView={setActiveView}
            />
          )}

          {activeView === 'health' && (
            <SecurityHealthCheck 
              setActiveView={setActiveView}
              onAwardXP={handleAwardXP}
            />
          )}

          {activeView === 'careers' && (
            <CareerTracks 
              setActiveView={setActiveView}
            />
          )}

          {activeView === 'threat-map' && (
            <ThreatMap />
          )}

          {activeView === 'incident-response' && (
            <IncidentResponse 
              onAwardXP={handleAwardXP}
            />
          )}

          {activeView === 'compliance' && (
            <ComplianceHub />
          )}

          {activeView === 'leaderboard' && (
            <Leaderboard 
              userState={userState}
            />
          )}

          {activeView === 'resources' && (
            <ResourceLibrary />
          )}

          {activeView === 'lessons' && (
            <LessonsHub 
              setActiveView={setActiveView}
            />
          )}

          {activeView === 'phishing' && (
            <PhishingSimulator 
              onCompleteChallenge={handleAwardXP}
            />
          )}

          {activeView === 'password' && (
            <PasswordLab 
              onCompleteChallenge={handleAwardXP}
            />
          )}

          {activeView === 'privacy' && (
            <PrivacyAuditor 
              onCompleteChallenge={handleAwardXP}
            />
          )}

          {activeView === 'network' && (
            <NetworkSafety 
              onCompleteChallenge={handleAwardXP}
            />
          )}

          {activeView === 'malware' && (
            <MalwareLab 
              onCompleteChallenge={handleAwardXP}
            />
          )}

          {activeView === 'glossary' && (
            <ThreatGlossary />
          )}

          {activeView === 'quiz' && (
            <SecurityQuiz 
              onCompleteChallenge={handleAwardXP}
              onOpenCertificate={() => setCertModalOpen(true)}
            />
          )}
        </main>

        {/* Floating Quick Action Capsule */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center bg-[#09090b]/85 border border-white/20 rounded-full p-1 shadow-[0_20px_50px_rgba(0,0,0,0.95),inset_0_1px_1px_rgba(255,255,255,0.4)] backdrop-blur-2xl">
          <button 
            type="button"
            onClick={() => setActiveView('home')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeView === 'home' 
                ? 'btn-glossy !text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <button 
            type="button"
            onClick={() => setActiveView('overview')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeView === 'overview' 
                ? 'btn-glossy !text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Terminal</span>
          </button>
          <button 
            type="button"
            onClick={() => setActiveView('threat-map')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeView === 'threat-map' 
                ? 'btn-glossy !text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Radar</span>
          </button>
          <button 
            type="button"
            onClick={() => setActiveView('glossary')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeView === 'glossary' 
                ? 'btn-glossy !text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ask CyberBuddy</span>
          </button>
        </div>

      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 right-6 z-50 bg-[#121216]/95 text-white font-mono text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-white/20 backdrop-blur-xl animate-bounce">
          <Zap className="w-4 h-4 fill-white text-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Printable Certificate Modal */}
      {certModalOpen && (
        <CertificateModal 
          userState={userState} 
          onClose={() => setCertModalOpen(false)} 
        />
      )}

    </div>
  );
}
