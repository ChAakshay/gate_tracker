import React from 'react';
import { useProgressStore } from './store/useProgressStore';
import { DailyEssentialsCard } from './components/DailyEssentialsCard';
import { BitsHdBlueprint } from './components/BitsHdBlueprint';
import { TopicMasteryTracker } from './components/TopicMasteryTracker';
import { FormulaVault } from './components/FormulaVault';
import { DailyRoadmapPlanner } from './components/DailyRoadmapPlanner';
import { ErrorLogTracker } from './components/ErrorLogTracker';
import { 
  CheckSquare, 
  Layers, 
  ImageIcon,
  CalendarDays, 
  FileWarning, 
  Flame, 
  Cpu, 
  Award,
  Target,
  Shuffle
} from 'lucide-react';

export const App: React.FC = () => {
  const { activeView, setActiveView, streak, getSecuredMarks } = useProgressStore();
  const securedMarks = getSecuredMarks();

  const navigationTabs = [
    { id: 'today', label: "Today's Essentials", icon: CheckSquare },
    { id: 'roadmap', label: 'Topic Pairs Variety Hub', icon: Shuffle },
    { id: 'syllabus', label: 'Topic Mastery & Books', icon: Layers },
    { id: 'blueprint', label: '185+ Blueprint & Cutoffs', icon: Target },
    { id: 'formula', label: 'Formula Vault', icon: ImageIcon },
    { id: 'errors', label: '3-Line Error Log', icon: FileWarning },
  ] as const;

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      
      {/* 🚀 Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#0e1118]/95 backdrop-blur-md border-b border-[#1a1f2e] px-4 sm:px-8 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveView('today')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20 border border-blue-400/20">
              <Cpu className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-bold text-base tracking-tight text-white flex items-center gap-2">
                <span>BITS HD (ECE)</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold">
                  Target 185+ / 300
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-medium">M.E. Embedded Systems (BITS Pilani) Seat Target</div>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-[#131722] p-1 rounded-xl border border-[#202638]">
            {navigationTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeView === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Metrics (Secured Marks & Streak) */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#131722] border border-[#202638] text-xs font-mono font-bold text-blue-400" title="Secured Marks toward 185+ Safe Space">
              <Award className="w-3.5 h-3.5 text-blue-400" />
              <span>{securedMarks}M / 185M</span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#131722] border border-[#202638] text-xs font-mono font-bold text-amber-400" title="Active Study Streak">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{streak}d</span>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-1.5 mt-2 border-t border-slate-800/60 scrollbar-none">
          {navigationTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  isActive ? 'bg-blue-600 text-white' : 'text-slate-400 bg-[#131722]'
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
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6">
        {activeView === 'today' && <DailyEssentialsCard />}
        {activeView === 'blueprint' && <BitsHdBlueprint />}
        {activeView === 'syllabus' && <TopicMasteryTracker />}
        {activeView === 'formula' && <FormulaVault />}
        {activeView === 'roadmap' && <DailyRoadmapPlanner />}
        {activeView === 'errors' && <ErrorLogTracker />}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#181d2a] py-5 px-4 text-center text-xs text-slate-500">
        BITS HD (ECE) Preparation Tracker • Target: 185+ / 300 Raw Marks • M.E. Embedded Systems (BITS Pilani)
      </footer>
    </div>
  );
};
export default App;
