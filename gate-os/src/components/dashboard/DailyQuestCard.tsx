import React, { useState } from 'react';
import { TargetQuest } from '../../types/gate';
import { CheckCircle2, Circle, Flame, Sparkles, BookOpen, Target, BrainCircuit, ShieldAlert } from 'lucide-react';

interface DailyQuestCardProps {
  quest: TargetQuest;
  onUpdate: (updatedQuest: Partial<TargetQuest>) => void;
  streak: number;
}

export const DailyQuestCard: React.FC<DailyQuestCardProps> = ({ quest, onUpdate, streak }) => {
  const [isMVDMode, setIsMVDMode] = useState(false);

  const toggleTheory = () => onUpdate({ theoryCompleted: !quest.theoryCompleted });
  const incrementPYQs = (delta: number) => {
    const nextVal = Math.max(0, Math.min(quest.pyqsCompletedCount + delta, isMVDMode ? 5 : 20));
    onUpdate({ pyqsCompletedCount: nextVal });
  };
  const toggleRetention = () => onUpdate({ retentionCompleted: !quest.retentionCompleted });

  const pyqTarget = isMVDMode ? 5 : 20;
  const isPYQComplete = quest.pyqsCompletedCount >= pyqTarget;
  const isAllComplete = quest.theoryCompleted && isPYQComplete && quest.retentionCompleted;

  return (
    <div className={`relative overflow-hidden rounded-2xl border transition-all duration-500 ${
      isAllComplete 
        ? 'bg-gradient-to-br from-emerald-950/40 via-[#12141c] to-[#12141c] border-emerald-500/50 shadow-[0_0_35px_rgba(16,185,129,0.12)]' 
        : 'bg-[#12141c] border-[#1f2433]'
    } p-6 sm:p-8 text-white`}>
      {/* Background glow badge */}
      {isAllComplete && (
        <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      )}

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1f2433]">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
              Daily Quest Command Center
            </h2>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wide">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{streak} DAY STREAK</span>
            </div>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Zero-Guilt • Rule of 3 Protocol • <span className="text-blue-400 font-semibold">Week 1: Linear Algebra & Matrix Calculus</span>
          </p>
        </div>

        {/* Minimum Viable Day Toggle */}
        <div className="flex items-center gap-3 bg-[#181c28] p-2.5 rounded-xl border border-[#262c3e]">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1">
              <ShieldAlert className={`w-3.5 h-3.5 ${isMVDMode ? 'text-amber-400' : 'text-slate-500'}`} />
              MVD Mode
            </span>
            <span className="text-[10px] text-slate-500">{isMVDMode ? 'Target: 5 PYQs' : 'Standard: 20 PYQs'}</span>
          </div>
          <button
            type="button"
            onClick={() => setIsMVDMode(!isMVDMode)}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              isMVDMode ? 'bg-amber-600' : 'bg-slate-700'
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                isMVDMode ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* The 3 Core Quests */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        
        {/* Quest 1: Theory Input */}
        <div
          onClick={toggleTheory}
          className={`cursor-pointer group p-5 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
            quest.theoryCompleted 
              ? 'bg-blue-950/30 border-blue-500/50 shadow-sm' 
              : 'bg-[#161a26] border-[#22293d] hover:border-slate-600'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <BookOpen className="w-5 h-5" />
              </div>
              {quest.theoryCompleted ? (
                <CheckCircle2 className="w-6 h-6 text-blue-400" />
              ) : (
                <Circle className="w-6 h-6 text-slate-600 group-hover:text-slate-400" />
              )}
            </div>
            <h3 className="font-bold text-base text-slate-100 mb-1">1. Theory & Input</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Matrices, Eigenvalues, Jordan Canonical Form & Rank theorems.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
            <span className={quest.theoryCompleted ? 'text-blue-400 font-semibold' : 'text-slate-500'}>
              {quest.theoryCompleted ? 'Completed' : 'Pending'}
            </span>
            <span className="text-[10px] text-slate-500">~2.5 hrs</span>
          </div>
        </div>

        {/* Quest 2: Active Problem Solving */}
        <div
          className={`p-5 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
            isPYQComplete 
              ? 'bg-purple-950/30 border-purple-500/50 shadow-sm' 
              : 'bg-[#161a26] border-[#22293d]'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Target className="w-5 h-5" />
              </div>
              {isPYQComplete ? (
                <CheckCircle2 className="w-6 h-6 text-purple-400" />
              ) : (
                <Circle className="w-6 h-6 text-slate-600" />
              )}
            </div>
            <h3 className="font-bold text-base text-slate-100 mb-1">2. Active PYQs ({quest.pyqsCompletedCount}/{pyqTarget})</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Timed 4-min solve sessions in PYQ Arena. Tier 1 & 2 questions.
            </p>
          </div>

          <div className="mt-4">
            {/* Progress bar */}
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-3">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-300"
                style={{ width: `${Math.min(100, (quest.pyqsCompletedCount / pyqTarget) * 100)}%` }}
              />
            </div>
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={() => incrementPYQs(-1)}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded font-bold transition-colors"
              >
                -1
              </button>
              <button
                onClick={() => incrementPYQs(1)}
                className="flex-1 py-1 bg-purple-600 hover:bg-purple-500 text-white text-xs rounded font-bold transition-colors shadow-sm"
              >
                +1 PYQ Solved
              </button>
            </div>
          </div>
        </div>

        {/* Quest 3: Retention & Error Log */}
        <div
          onClick={toggleRetention}
          className={`cursor-pointer group p-5 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
            quest.retentionCompleted 
              ? 'bg-amber-950/30 border-amber-500/50 shadow-sm' 
              : 'bg-[#161a26] border-[#22293d] hover:border-slate-600'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <BrainCircuit className="w-5 h-5" />
              </div>
              {quest.retentionCompleted ? (
                <CheckCircle2 className="w-6 h-6 text-amber-400" />
              ) : (
                <Circle className="w-6 h-6 text-slate-600 group-hover:text-slate-400" />
              )}
            </div>
            <h3 className="font-bold text-base text-slate-100 mb-1">3. Retention & Log</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              3-Line Error Log summary entry + 1-page formula short note card.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
            <span className={quest.retentionCompleted ? 'text-amber-400 font-semibold' : 'text-slate-500'}>
              {quest.retentionCompleted ? 'Completed' : 'Pending'}
            </span>
            <span className="text-[10px] text-slate-500">~1.0 hr</span>
          </div>
        </div>

      </div>

      {/* Completion Banner */}
      {isAllComplete ? (
        <div className="p-4 rounded-xl bg-emerald-900/30 border border-emerald-500/40 flex items-center justify-between animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-emerald-400 animate-bounce" />
            <div>
              <div className="font-bold text-emerald-200">Daily Quest Completed! Zero-Guilt Secured.</div>
              <div className="text-xs text-emerald-400/80">You hit the target without cognitive burnout. Close the laptop or proceed to bonus review.</div>
            </div>
          </div>
          <span className="px-3 py-1 rounded bg-emerald-600 text-white text-xs font-extrabold uppercase">100% Done</span>
        </div>
      ) : (
        <div className="p-3 rounded-lg bg-[#181c28] border border-[#262c3e] flex items-center justify-between text-xs text-slate-400">
          <span>Remember: Output targets beat rigid timetables every single time.</span>
          <span className="text-slate-300 font-mono font-semibold">
            {[quest.theoryCompleted, isPYQComplete, quest.retentionCompleted].filter(Boolean).length} / 3 Tasks
          </span>
        </div>
      )}
    </div>
  );
};
