import React from 'react';
import { useProgressStore } from './store/useProgressStore';
import { DailyEssentialsCard } from './components/DailyEssentialsCard';
import { TopicMasteryTracker } from './components/TopicMasteryTracker';
import { FormulaVault } from './components/FormulaVault';
import { DailyRoadmapPlanner } from './components/DailyRoadmapPlanner';
import { ErrorLogTracker } from './components/ErrorLogTracker';
import { QuizArena } from './components/quiz/QuizArena';
import { 
  CheckSquare, 
  Layers, 
  ImageIcon,
  CalendarDays, 
  FileWarning, 
  Flame, 
  Cpu, 
  Award,
  BookOpen
} from 'lucide-react';

export const App: React.FC = () => {
  const { activeView, setActiveView, streak, getSecuredMarks } = useProgressStore();
  const securedMarks = getSecuredMarks();

  const navigationTabs = [
    { id: 'today', label: "Today's Essentials", icon: CheckSquare },
    { id: 'quiz', label: 'Unit 1 & 2 Quiz', icon: BookOpen },
    { id: 'syllabus', label: 'Topic Marks Tracker', icon: Layers },
    { id: 'formula', label: 'Formula Vault', icon: ImageIcon },
    { id: 'roadmap', label: '18-Week Roadmap', icon: CalendarDays },
    { id: 'errors', label: '3-Line Error Log', icon: FileWarning },
  ] as const;

  return (
    <div className="min-h-screen bg-[#08090d] text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      
      {/* 🚀 Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#0d1017]/90 backdrop-blur-lg border-b border-[#1b2130] px-4 sm:px-8 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveView('today')}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-blue-500/20 border border-blue-400/30">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-black text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400 flex items-center gap-2">
                <span>GATE-OS</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                  Target 70+
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-medium">IIIT Bangalore Marks Mastery</div>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="hidden md:flex items-center gap-1.5 bg-[#141824] p-1.5 rounded-2xl border border-[#232a3d]">
            {navigationTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeView === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Metrics (Secured Marks & Streak) */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#141824] border border-[#232a3d] text-xs font-mono font-bold text-blue-400" title="Secured Marks toward IIIT Bangalore">
              <Award className="w-4 h-4 text-blue-400" />
              <span>{securedMarks}M</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#141824] border border-[#232a3d] text-xs font-mono font-bold text-amber-400" title="Active Study Streak">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
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
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  isActive ? 'bg-blue-600 text-white' : 'text-slate-400 bg-[#141824]'
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
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-8">
        {activeView === 'today' && <DailyEssentialsCard />}
        {activeView === 'syllabus' && <TopicMasteryTracker />}
        {activeView === 'formula' && <FormulaVault />}
        {activeView === 'roadmap' && <DailyRoadmapPlanner />}
        {activeView === 'errors' && <ErrorLogTracker />}
        {activeView === 'quiz' && <QuizArena />}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1a1f2c] py-6 px-4 text-center text-xs text-slate-500">
        GATE-OS • Progress, Formula Vault & Daily Essentials System • Target: IIIT Bangalore (GATE Score ≥ 650)
      </footer>
    </div>
  );
};
export default App;
