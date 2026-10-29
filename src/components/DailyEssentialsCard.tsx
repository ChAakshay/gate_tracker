import React, { useState } from 'react';
import { useProgressStore } from '../store/useProgressStore';
import { 
  CheckCircle2, 
  Circle, 
  Flame, 
  BookOpen, 
  Target, 
  BrainCircuit, 
  Award, 
  ChevronRight, 
  ChevronLeft,
  ArrowRight,
  Check,
  ShieldAlert,
  Sparkles,
  Layers,
  Edit3
} from 'lucide-react';

export const DailyEssentialsCard: React.FC = () => {
  const { 
    todayChecklist, 
    updateTodayChecklist, 
    isMvdMode, 
    toggleMvdMode, 
    streak,
    getSecuredMarks,
    setActiveView,
    activeDayNumber,
    setActiveDayNumber,
    dayPlans
  } = useProgressStore();

  const [notesDraft, setNotesDraft] = useState<string>(todayChecklist.notes || '');
  const [notesSaved, setNotesSaved] = useState<boolean>(false);

  const securedMarks = getSecuredMarks();
  const bitsHdTargetMarks = 185; // 185+ Safe space for BITS Pilani M.E. Embedded

  // Active day details from 18-week plan
  const currentDayPlan = dayPlans.find(d => d.dayNumber === activeDayNumber) || dayPlans[0];

  const pyqGoal = isMvdMode ? 5 : (currentDayPlan?.pyqTargetCount || 20);
  const isPyqDone = todayChecklist.pyqsCount >= pyqGoal;
  const isTodayComplete = todayChecklist.theoryChecked && isPyqDone && todayChecklist.retentionChecked;

  // Save notes handler
  const handleNotesChange = (val: string) => {
    setNotesDraft(val);
    updateTodayChecklist({ notes: val });
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2000);
  };

  // Advance to next day
  const handleAdvanceNextDay = () => {
    if (activeDayNumber < dayPlans.length) {
      setActiveDayNumber(activeDayNumber + 1);
      updateTodayChecklist({ theoryChecked: false, pyqsCount: 0, retentionChecked: false, notes: '' });
      setNotesDraft('');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* 🧭 CALM FOCUS: PROGRESS & BENCHMARK BAR */}
      <div className="bg-[#10131d] border border-[#1b2234] rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                BITS Pilani Target
              </span>
              <span className="text-xs text-slate-400">
                M.E. Embedded Systems Safe Space
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1 flex items-baseline gap-2">
              <span>{securedMarks}</span>
              <span className="text-xs text-slate-400 font-normal">/ {bitsHdTargetMarks} Marks Target</span>
              <span className="text-xs font-mono font-medium text-emerald-400 ml-1">
                ({Math.min(100, Math.round((securedMarks / bitsHdTargetMarks) * 100))}% secured)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#141824] border border-[#202738] text-xs font-mono font-bold text-amber-400">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{streak} Day Streak</span>
            </div>

            <button
              onClick={() => setActiveView('blueprint')}
              className="px-3 py-1.5 rounded-xl bg-[#141824] hover:bg-slate-800 text-xs text-slate-300 font-semibold border border-[#202738] transition-colors"
            >
              185+ Blueprint
            </button>
          </div>
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-full bg-[#161a26] h-2 rounded-full overflow-hidden border border-slate-800/80 mt-4">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${Math.min(100, (securedMarks / bitsHdTargetMarks) * 100)}%` }}
          />
        </div>
      </div>

      {/* 🎯 TODAY'S MISSION CARD */}
      <div className="bg-[#10131d] border border-[#1b2234] rounded-2xl p-5 sm:p-7 shadow-sm space-y-5">
        
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1b2234]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-blue-400 bg-blue-950/60 px-2.5 py-0.5 rounded-md border border-blue-900/60">
                Day {currentDayPlan.dayNumber} of 126
              </span>
              <span className="text-xs font-semibold text-emerald-400">
                +{currentDayPlan.targetMarksValue} Marks Value
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {currentDayPlan.topicTitle.split(':')[1]?.trim() || currentDayPlan.topicTitle}
            </h1>
          </div>

          {/* Quick Day Stepper */}
          <div className="flex items-center gap-1.5 self-start sm:self-center">
            <button
              onClick={() => setActiveDayNumber(Math.max(1, activeDayNumber - 1))}
              disabled={activeDayNumber <= 1}
              className="p-2 rounded-lg bg-[#141824] hover:bg-slate-800 disabled:opacity-30 text-slate-300 border border-[#202738] transition-colors"
              title="Previous Day"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <select
              value={activeDayNumber}
              onChange={(e) => setActiveDayNumber(parseInt(e.target.value, 10))}
              className="bg-[#141824] border border-[#202738] rounded-lg px-2.5 py-1.5 text-xs text-slate-200 font-mono font-bold outline-none"
            >
              {dayPlans.map(d => (
                <option key={d.dayNumber} value={d.dayNumber}>
                  Day {d.dayNumber}: {d.topicTitle.split(':')[1]?.trim() || d.topicTitle}
                </option>
              ))}
            </select>

            <button
              onClick={() => setActiveDayNumber(Math.min(dayPlans.length, activeDayNumber + 1))}
              disabled={activeDayNumber >= dayPlans.length}
              className="p-2 rounded-lg bg-[#141824] hover:bg-slate-800 disabled:opacity-30 text-slate-300 border border-[#202738] transition-colors"
              title="Next Day"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Minimum Viable Day Toggle (Small, Clean) */}
        <div className="flex items-center justify-between bg-[#141824]/60 p-3 rounded-xl border border-[#1b2234] text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <ShieldAlert className={`w-4 h-4 ${isMvdMode ? 'text-amber-400' : 'text-slate-500'}`} />
            <span>
              <strong>Minimum Viable Day (MVD Mode):</strong> {isMvdMode ? 'Active (5 questions target)' : 'Standard (20 questions target)'}
            </span>
          </div>
          <button
            onClick={toggleMvdMode}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              isMvdMode ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {isMvdMode ? 'Enabled' : 'Enable MVD'}
          </button>
        </div>

        {/* 3 DAILY ESSENTIALS (THE CORE FOCUS) */}
        <div className="space-y-3">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
            Today's 3 Outputs (Check each to secure today's mark)
          </div>

          {/* 1. Theory Task */}
          <div
            onClick={() => updateTodayChecklist({ theoryChecked: !todayChecklist.theoryChecked })}
            className={`cursor-pointer p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${
              todayChecklist.theoryChecked 
                ? 'bg-blue-950/20 border-blue-500/40 text-slate-200' 
                : 'bg-[#141824] border-[#1f273a] hover:border-slate-600 text-slate-300'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                todayChecklist.theoryChecked ? 'bg-blue-600 text-white' : 'border border-slate-600'
              }`}>
                {todayChecklist.theoryChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
              <div>
                <div className="text-sm font-semibold text-white flex items-center gap-2">
                  <span>1. Core Theory & Concept Extraction</span>
                  <span className="text-[10px] text-slate-400 font-normal">~2.0 hrs</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  {currentDayPlan.theoryTarget}
                </p>
              </div>
            </div>
            <span className={`text-[11px] font-mono font-medium ${todayChecklist.theoryChecked ? 'text-blue-400' : 'text-slate-500'}`}>
              {todayChecklist.theoryChecked ? 'Done' : 'Pending'}
            </span>
          </div>

          {/* 2. Problem Solving (PYQs) */}
          <div className={`p-4 rounded-xl border transition-all space-y-3 ${
            isPyqDone 
              ? 'bg-purple-950/20 border-purple-500/40' 
              : 'bg-[#141824] border-[#1f273a]'
          }`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                  isPyqDone ? 'bg-purple-600 text-white' : 'border border-slate-600'
                }`}>
                  {isPyqDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white flex items-center gap-2">
                    <span>2. Active Problem Solving</span>
                    <span className="text-[10px] text-slate-400 font-normal">~1.5 hrs</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Target: solve standard questions on <strong className="text-slate-200">{currentDayPlan.topicTitle.split(':')[1]?.trim() || currentDayPlan.topicTitle}</strong>.
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className={`text-sm font-mono font-bold ${isPyqDone ? 'text-purple-400' : 'text-slate-300'}`}>
                  {todayChecklist.pyqsCount} / {pyqGoal}
                </span>
                <div className="text-[10px] text-slate-500">questions</div>
              </div>
            </div>

            {/* Progress & Quick Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <div className="flex-1 bg-slate-800/80 h-2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-500 transition-all duration-300"
                  style={{ width: `${Math.min(100, (todayChecklist.pyqsCount / pyqGoal) * 100)}%` }}
                />
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => updateTodayChecklist({ pyqsCount: Math.max(0, todayChecklist.pyqsCount - 1) })}
                  className="px-2 py-1 rounded-md bg-[#1c2233] hover:bg-slate-700 text-slate-300 text-xs font-mono font-bold"
                  title="Minus 1"
                >
                  -1
                </button>
                <button
                  onClick={() => updateTodayChecklist({ pyqsCount: todayChecklist.pyqsCount + 1 })}
                  className="px-3 py-1 rounded-md bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-colors"
                >
                  +1 Solved
                </button>
                <button
                  onClick={() => updateTodayChecklist({ pyqsCount: todayChecklist.pyqsCount + 5 })}
                  className="px-2.5 py-1 rounded-md bg-[#1c2233] hover:bg-slate-700 text-purple-300 text-xs font-bold"
                >
                  +5
                </button>
                <button
                  onClick={() => updateTodayChecklist({ pyqsCount: pyqGoal })}
                  className="px-2.5 py-1 rounded-md bg-[#1c2233] hover:bg-slate-700 text-slate-300 text-xs font-bold"
                  title="Mark All Completed"
                >
                  Done
                </button>
              </div>
            </div>
          </div>

          {/* 3. Retention & Formula Lock */}
          <div
            onClick={() => updateTodayChecklist({ retentionChecked: !todayChecklist.retentionChecked })}
            className={`cursor-pointer p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${
              todayChecklist.retentionChecked 
                ? 'bg-amber-950/20 border-amber-500/40 text-slate-200' 
                : 'bg-[#141824] border-[#1f273a] hover:border-slate-600 text-slate-300'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                todayChecklist.retentionChecked ? 'bg-amber-600 text-white' : 'border border-slate-600'
              }`}>
                {todayChecklist.retentionChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
              <div>
                <div className="text-sm font-semibold text-white flex items-center gap-2">
                  <span>3. Retention, Formula Card & Error Check</span>
                  <span className="text-[10px] text-slate-400 font-normal">~45 mins</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  {currentDayPlan.retentionFocus}
                </p>
              </div>
            </div>
            <span className={`text-[11px] font-mono font-medium ${todayChecklist.retentionChecked ? 'text-amber-400' : 'text-slate-500'}`}>
              {todayChecklist.retentionChecked ? 'Done' : 'Pending'}
            </span>
          </div>
        </div>

        {/* 🏆 COMPLETION CELEBRATION & ONE-CLICK ADVANCE */}
        {isTodayComplete ? (
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all animate-in fade-in">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <div className="font-bold text-sm text-emerald-300">
                  Day {activeDayNumber} Essentials Complete!
                </div>
                <div className="text-xs text-emerald-400/80">
                  +{currentDayPlan.targetMarksValue} marks locked toward BITS Pilani M.E. Embedded.
                </div>
              </div>
            </div>

            <button
              onClick={handleAdvanceNextDay}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold font-mono transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>Lock & Start Day {activeDayNumber + 1}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <span>Tick off all 3 essentials above to mark Day {activeDayNumber} complete.</span>
            <button
              onClick={() => setActiveView('syllabus')}
              className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
            >
              <span>Topic Checklist</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* 📝 MINIMAL DAILY TAKEAWAY / FORMULA MEMO */}
        <div className="pt-3 border-t border-[#1b2234] space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-medium">
              <Edit3 className="w-3.5 h-3.5 text-slate-500" />
              <span>Today's Formula / Shortcut Takeaway</span>
            </span>
            {notesSaved && <span className="text-[10px] text-emerald-400 font-mono">Saved</span>}
          </div>
          <input
            type="text"
            value={notesDraft}
            onChange={(e) => handleNotesChange(e.target.value)}
            placeholder="e.g., Det(adj A) = |A|^(n-1); TRAP vector = 0024H; 1-step shortcut..."
            className="w-full bg-[#141824] border border-[#202738] rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50"
          />
        </div>

      </div>

    </div>
  );
};
