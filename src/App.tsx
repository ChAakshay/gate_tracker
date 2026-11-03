import React from 'react';
import { useProgressStore } from './store/useProgressStore';
import { DailyEssentialsCard } from './components/DailyEssentialsCard';
import { BitsHdBlueprint } from './components/BitsHdBlueprint';
import { TopicMasteryTracker } from './components/TopicMasteryTracker';
import { FormulaVault } from './components/FormulaVault';
import { DailyRoadmapPlanner } from './components/DailyRoadmapPlanner';
import { ErrorLogTracker } from './components/ErrorLogTracker';
import { VirtualCalculator } from './components/calculator/VirtualCalculator';
import { 
  CheckSquare, 
  Layers, 
  ImageIcon, 
  FileWarning, 
  Flame, 
  Cpu, 
  Award,
  Shuffle,
  Calculator,
  X
} from 'lucide-react';
import { ActiveNavView } from './types/progress';

export const App: React.FC = () => {
  const { 
    activeView, 
    setActiveView, 
    streak, 
    getSecuredMarks,
    isCalcOpen,
    toggleCalc
  } = useProgressStore();
  const securedMarks = getSecuredMarks();

  const navigationTabs: { id: ActiveNavView; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'today', label: "Today's Essentials", icon: CheckSquare },
    { id: 'roadmap', label: 'Topic Pairs Hub', icon: Shuffle },
    { id: 'syllabus', label: 'Topic Mastery & Books', icon: Layers },
    { id: 'blueprint', label: '185+ Blueprint', icon: Award },
    { id: 'formula', label: 'Formula Vault', icon: ImageIcon },
    { id: 'errors', label: '3-Line Error Log', icon: FileWarning },
  ];

  return (
    <div className="min-h-screen bg-[#0e1117] text-slate-200 flex flex-col selection:bg-[#3b69a1] selection:text-white relative font-sans antialiased">
      
      {/* 🌿 Soothing Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#121622]/90 backdrop-blur-md border-b border-[#1d2436] px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Logo & Calming Badge */}
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => setActiveView('today')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#2f5588] to-[#4c7cb8] flex items-center justify-center shadow-md shadow-blue-900/10 border border-[#4c7cb8]/20">
              <Cpu className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-bold text-sm sm:text-base tracking-tight text-slate-100 flex items-center gap-2">
                <span>BITS HD (ECE)</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-[#3b69a1]/15 text-[#6ba0de] border border-[#3b69a1]/30 font-semibold">
                  Target 185+ / 300
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-medium">M.E. Embedded Systems (BITS Pilani) Seat Target</div>
            </div>
          </div>

          {/* Desktop Nav Tabs (6 Focused Modules) */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#161c28] p-1 rounded-xl border border-[#232b40]">
            {navigationTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeView === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive 
                      ? 'bg-[#3b69a1] text-white shadow-sm' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#1e2536]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Metrics & Calculator Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleCalc}
              className={`p-2 rounded-xl border transition-all ${
                isCalcOpen 
                  ? 'bg-[#3b69a1] text-white border-[#5182be] shadow-sm' 
                  : 'bg-[#161c28] text-slate-400 border-[#232b40] hover:text-slate-200 hover:bg-[#1e2536]'
              }`}
              title="Toggle GATE Scientific Virtual Calculator"
            >
              <Calculator className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#161c28] border border-[#232b40] text-xs font-mono font-bold text-[#6ba0de]" title="Secured Marks toward 185+ Safe Space">
              <Award className="w-3.5 h-3.5 text-[#6ba0de]" />
              <span>{securedMarks}M / 185M</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#161c28] border border-[#232b40] text-xs font-mono font-bold text-[#d49e5b]" title="Active Study Streak">
              <Flame className="w-3.5 h-3.5 fill-[#d49e5b] text-[#d49e5b]" />
              <span>{streak}d</span>
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Navigation Tabs */}
        <div className="flex lg:hidden overflow-x-auto py-2 gap-1.5 mt-2 border-t border-slate-800/40 scrollbar-none">
          {navigationTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  isActive ? 'bg-[#3b69a1] text-white' : 'text-slate-400 bg-[#161c28]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main View Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 transition-all">
        {activeView === 'today' && <DailyEssentialsCard />}
        {activeView === 'roadmap' && <DailyRoadmapPlanner />}
        {activeView === 'syllabus' && <TopicMasteryTracker />}
        {activeView === 'blueprint' && <BitsHdBlueprint />}
        {activeView === 'formula' && <FormulaVault />}
        {activeView === 'errors' && <ErrorLogTracker />}
      </main>

      {/* Floating Scientific Calculator Modal Widget */}
      {isCalcOpen && (
        <div className="fixed bottom-6 right-6 z-50 shadow-2xl rounded-2xl overflow-hidden border border-[#2a344c] bg-[#161c28] animate-in fade-in slide-in-from-bottom-5">
          <div className="bg-[#1b2234] px-3.5 py-2.5 flex items-center justify-between border-b border-[#2a344c] text-xs">
            <span className="font-bold text-slate-200 flex items-center gap-1.5 font-mono">
              <Calculator className="w-3.5 h-3.5 text-[#6ba0de]" />
              GATE Scientific Virtual Calculator
            </span>
            <button onClick={toggleCalc} className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-700/50">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <VirtualCalculator isFloating onClose={toggleCalc} />
        </div>
      )}

      {/* Calming, Minimalist Footer */}
      <footer className="border-t border-[#181e2c] py-6 px-4 text-center text-xs text-slate-500">
        BITS HD (ECE) Preparation Tracker • Target: 185+ / 300 Raw Marks • M.E. Embedded Systems (BITS Pilani)
      </footer>
    </div>
  );
};
export default App;
