import React, { useState } from 'react';
import { useProgressStore } from '../store/useProgressStore';
import { 
  CheckCircle2, 
  Circle, 
  Flame, 
  Sparkles, 
  BookOpen, 
  Target, 
  BrainCircuit, 
  ShieldAlert, 
  Award, 
  ChevronRight, 
  ChevronLeft,
  TrendingUp, 
  HardDrive, 
  Download, 
  CalendarDays,
  Layers,
  ArrowRight,
  Check
} from 'lucide-react';

export const DailyEssentialsCard: React.FC = () => {
  const { 
    todayChecklist, 
    updateTodayChecklist, 
    isMvdMode, 
    toggleMvdMode, 
    streak,
    getSecuredMarks,
    getTotalTargetMarks,
    setActiveView,
    activeDayNumber,
    setActiveDayNumber,
    dayPlans
  } = useProgressStore();

  const [copiedBackup, setCopiedBackup] = useState(false);

  const securedMarks = getSecuredMarks();
  const iiitbBenchmark = 70; // 68-74 target range

  // Active day details from 18-week plan
  const currentDayPlan = dayPlans.find(d => d.dayNumber === activeDayNumber) || dayPlans[0];

  const pyqGoal = isMvdMode ? 5 : (currentDayPlan?.pyqTargetCount || 20);
  const isPyqDone = todayChecklist.pyqsCount >= pyqGoal;
  const isTodayComplete = todayChecklist.theoryChecked && isPyqDone && todayChecklist.retentionChecked;

  // Export JSON backup
  const handleExportBackup = () => {
    const backupData = {
      timestamp: new Date().toISOString(),
      securedMarks,
      streak,
      activeDayNumber,
      todayChecklist,
      subjects: localStorage.getItem('gate_subjects_mastery'),
      errorLogs: localStorage.getItem('gate_enhanced_error_logs'),
      formulaSheets: localStorage.getItem('gate_formula_sheets'),
      dayPlans: localStorage.getItem('gate_day_plans')
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GATE-OS-Progress-Backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setCopiedBackup(true);
    setTimeout(() => setCopiedBackup(false), 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* 🎯 TOP BENCHMARK & SECURED MARKS BANNER */}
      <div className="bg-gradient-to-br from-[#131b2e] via-[#10131f] to-[#0c0e17] border border-blue-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Award className="w-4 h-4 text-blue-400" />
              <span>IIIT Bangalore M.Tech Target Benchmark</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              GATE ECE Marks Mastery
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
              Target: <strong className="text-white">68–74 Raw Marks</strong> (GATE Score ≥ 650). Ticking off today's essentials directly locks in raw marks on your master tracker.
            </p>
          </div>

          {/* Live Marks Counter Card */}
          <div className="flex items-center gap-4 bg-[#141824]/90 p-4 sm:p-5 rounded-2xl border border-[#232b40] shadow-inner">
            <div className="text-right">
              <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Secured Marks</div>
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-400 font-mono tracking-tight">
                {securedMarks} <span className="text-sm font-sans text-slate-500 font-normal">/ {iiitbBenchmark}</span>
              </div>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <TrendingUp className="w-7 h-7" />
            </div>
          </div>
        </div>

        {/* Global Marks Progress Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800/80">
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="text-slate-400 flex items-center gap-1.5">
              Progress to IIIT-B Admission Cutoff (~70 Marks)
            </span>
            <span className="font-mono font-bold text-blue-300">
              {Math.min(100, Math.round((securedMarks / iiitbBenchmark) * 100))}% Reached
            </span>
          </div>
          <div className="w-full bg-[#161a26] h-3 rounded-full overflow-hidden border border-slate-800 p-0.5">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-400 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${Math.min(100, (securedMarks / iiitbBenchmark) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* 🗺️ ACTIVE 18-WEEK DAY TARGET MISSION CARD (CONNECTED TO ROADMAP & TOPIC TRACKER) */}
      <div className="bg-[#12141c] border border-blue-500/40 rounded-3xl p-6 sm:p-7 shadow-xl space-y-4">
        
        {/* Day Selector & Status Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1f2433]">
          
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-blue-400 uppercase bg-blue-950 px-2.5 py-0.5 rounded-full border border-blue-800">
                  Week {currentDayPlan.weekNumber} • Day {currentDayPlan.dayNumber}
                </span>
                <span className="text-xs font-bold text-emerald-400">
                  +{currentDayPlan.targetMarksValue} Marks Focus
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white mt-1">
                {currentDayPlan.topicTitle}
              </h2>
            </div>
          </div>

          {/* Day Navigation Controls */}
          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={() => setActiveDayNumber(Math.max(1, activeDayNumber - 1))}
              disabled={activeDayNumber <= 1}
              className="p-2 rounded-xl bg-[#181d2a] hover:bg-slate-700 disabled:opacity-30 text-slate-300 border border-slate-700 transition-colors"
              title="Previous Day Plan"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <select
              value={activeDayNumber}
              onChange={(e) => setActiveDayNumber(parseInt(e.target.value, 10))}
              className="bg-[#181d2a] border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-bold font-mono outline-none"
            >
              {dayPlans.map(d => (
                <option key={d.dayNumber} value={d.dayNumber}>
                  Day {d.dayNumber}: {d.topicTitle.split(':')[1] || d.topicTitle}
                </option>
              ))}
            </select>

            <button
              onClick={() => setActiveDayNumber(Math.min(dayPlans.length, activeDayNumber + 1))}
              disabled={activeDayNumber >= dayPlans.length}
              className="p-2 rounded-xl bg-[#181d2a] hover:bg-slate-700 disabled:opacity-30 text-slate-300 border border-slate-700 transition-colors"
              title="Next Day Plan"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Granular Day Targets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          
          <div className="p-3.5 rounded-2xl bg-[#161a26] border border-[#232a3c]">
            <div className="text-[10px] text-blue-400 uppercase font-bold flex items-center gap-1 mb-1">
              <BookOpen className="w-3.5 h-3.5" /> Theory Goal
            </div>
            <div className="text-slate-200 font-medium leading-relaxed">
              {currentDayPlan.theoryTarget}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#161a26] border border-[#232a3c]">
            <div className="text-[10px] text-purple-400 uppercase font-bold flex items-center gap-1 mb-1">
              <Target className="w-3.5 h-3.5" /> Active PYQ Target
            </div>
            <div className="text-slate-200 font-medium leading-relaxed">
              {isMvdMode ? '5 PYQs (MVD Mode)' : `${currentDayPlan.pyqTargetCount} Active GATE PYQs`}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#161a26] border border-[#232a3c]">
            <div className="text-[10px] text-amber-400 uppercase font-bold flex items-center gap-1 mb-1">
              <BrainCircuit className="w-3.5 h-3.5" /> Retention & Error Log
            </div>
            <div className="text-slate-200 font-medium leading-relaxed">
              {currentDayPlan.retentionFocus}
            </div>
          </div>

        </div>

        {/* Sync Info Indicator */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Auto-syncs with <strong>Topic Marks Tracker</strong> & <strong>18-Week Roadmap</strong></span>
          </div>

          <button
            onClick={() => setActiveView('syllabus')}
            className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1"
          >
            <span>View Connected Topic in Master Checklist</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* 📋 TODAY'S DAILY ESSENTIALS CHECKLIST CARD */}
      <div className={`p-6 sm:p-8 rounded-3xl border transition-all duration-500 ${
        isTodayComplete 
          ? 'bg-gradient-to-br from-emerald-950/40 via-[#12141c] to-[#12141c] border-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.1)]' 
          : 'bg-[#12141c] border-[#1f2433]'
      } text-white shadow-xl space-y-6`}>
        
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1f2433]">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-white">
                Today's Daily Output Check-off
              </h2>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wide">
                <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>{streak} DAY STREAK</span>
              </div>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Check off these 3 outputs to automatically mark Day {activeDayNumber} complete on your 18-week plan.
            </p>
          </div>

          {/* Minimum Viable Day Toggle */}
          <div className="flex items-center gap-3 bg-[#181c28] p-2.5 rounded-xl border border-[#262c3e]">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                <ShieldAlert className={`w-3.5 h-3.5 ${isMvdMode ? 'text-amber-400' : 'text-slate-500'}`} />
                MVD Mode
              </span>
              <span className="text-[10px] text-slate-500">{isMvdMode ? 'Target: 5 PYQs' : `Standard: ${currentDayPlan.pyqTargetCount} PYQs`}</span>
            </div>
            <button
              type="button"
              onClick={toggleMvdMode}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isMvdMode ? 'bg-amber-600' : 'bg-slate-700'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  isMvdMode ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* The 3 Essential Checkboxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Essential 1: Theory Input */}
          <div
            onClick={() => updateTodayChecklist({ theoryChecked: !todayChecklist.theoryChecked })}
            className={`cursor-pointer p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
              todayChecklist.theoryChecked
                ? 'bg-blue-950/30 border-blue-500/50 shadow-sm'
                : 'bg-[#161a26] border-[#22293d] hover:border-slate-600'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <BookOpen className="w-5 h-5" />
                </div>
                {todayChecklist.theoryChecked ? (
                  <CheckCircle2 className="w-6 h-6 text-blue-400" />
                ) : (
                  <Circle className="w-6 h-6 text-slate-600" />
                )}
              </div>
              <h3 className="font-bold text-base text-slate-100 mb-1">1. Theory & Concepts</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {currentDayPlan.theoryTarget}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
              <span className={todayChecklist.theoryChecked ? 'text-blue-400 font-semibold' : 'text-slate-500'}>
                {todayChecklist.theoryChecked ? '✓ Completed & Synced' : 'Pending'}
              </span>
              <span className="text-[10px] text-slate-500">~2.5 hrs</span>
            </div>
          </div>

          {/* Essential 2: Problem Solving (PYQs) */}
          <div
            className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
              isPyqDone
                ? 'bg-purple-950/30 border-purple-500/50 shadow-sm'
                : 'bg-[#161a26] border-[#22293d]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <Target className="w-5 h-5" />
                </div>
                {isPyqDone ? (
                  <CheckCircle2 className="w-6 h-6 text-purple-400" />
                ) : (
                  <Circle className="w-6 h-6 text-slate-600" />
                )}
              </div>
              <h3 className="font-bold text-base text-slate-100 mb-1">
                2. Active PYQs ({todayChecklist.pyqsCount}/{pyqGoal})
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Solve target GATE PYQs on {currentDayPlan.topicTitle.split(':')[1] || currentDayPlan.topicTitle}.
              </p>
            </div>

            <div className="mt-4 space-y-2">
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (todayChecklist.pyqsCount / pyqGoal) * 100)}%` }}
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateTodayChecklist({ pyqsCount: Math.max(0, todayChecklist.pyqsCount - 1) })}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg font-bold"
                >
                  -1
                </button>
                <button
                  onClick={() => updateTodayChecklist({ pyqsCount: todayChecklist.pyqsCount + 1 })}
                  className="flex-1 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs rounded-lg font-bold shadow-sm"
                >
                  +1 PYQ Solved
                </button>
                <button
                  onClick={() => updateTodayChecklist({ pyqsCount: pyqGoal })}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg font-bold"
                  title="Mark all target PYQs done"
                >
                  All
                </button>
              </div>
            </div>
          </div>

          {/* Essential 3: Retention & Error Log */}
          <div
            onClick={() => updateTodayChecklist({ retentionChecked: !todayChecklist.retentionChecked })}
            className={`cursor-pointer p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
              todayChecklist.retentionChecked
                ? 'bg-amber-950/30 border-amber-500/50 shadow-sm'
                : 'bg-[#161a26] border-[#22293d] hover:border-slate-600'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <BrainCircuit className="w-5 h-5" />
                </div>
                {todayChecklist.retentionChecked ? (
                  <CheckCircle2 className="w-6 h-6 text-amber-400" />
                ) : (
                  <Circle className="w-6 h-6 text-slate-600" />
                )}
              </div>
              <h3 className="font-bold text-base text-slate-100 mb-1">3. Retention & Notes</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {currentDayPlan.retentionFocus}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
              <span className={todayChecklist.retentionChecked ? 'text-amber-400 font-semibold' : 'text-slate-500'}>
                {todayChecklist.retentionChecked ? '✓ Completed & Synced' : 'Pending'}
              </span>
              <span className="text-[10px] text-slate-500">~1.0 hr</span>
            </div>
          </div>

        </div>

        {/* Completion Message */}
        {isTodayComplete ? (
          <div className="p-4 rounded-2xl bg-emerald-900/30 border border-emerald-500/40 flex items-center justify-between animate-in fade-in duration-300">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-emerald-400 animate-bounce" />
              <div>
                <div className="font-bold text-emerald-200 text-sm sm:text-base">
                  Day {activeDayNumber} Target Locked In!
                </div>
                <div className="text-xs text-emerald-400/80">
                  Automatically marked complete on your 18-week roadmap & topic tracker.
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (activeDayNumber < dayPlans.length) {
                    setActiveDayNumber(activeDayNumber + 1);
                    updateTodayChecklist({ theoryChecked: false, pyqsCount: 0, retentionChecked: false });
                  }
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
              >
                <span>Advance to Day {activeDayNumber + 1}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center text-xs text-slate-400 bg-[#161a26] p-3 rounded-xl border border-slate-800">
            <span>Daily Focus: Finish today's 3 outputs for Day {activeDayNumber}.</span>
            <button
              onClick={() => setActiveView('syllabus')}
              className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1"
            >
              <span>View Full Syllabus Matrix</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>

      {/* 💾 STORAGE & BACKUP CONTROL PANEL */}
      <div className="bg-[#12141c] border border-[#1f2433] rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
            <HardDrive className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-200 flex items-center gap-2">
              <span>Storage Status: Local-First Persistent Engine</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="text-slate-400 text-[11px]">
              All daily checks, 18-week roadmap completions, formula cards, and error logs stay permanently in your browser.
            </div>
          </div>
        </div>

        <button
          onClick={handleExportBackup}
          className="px-4 py-2 rounded-xl bg-[#181d2a] hover:bg-[#20273a] text-slate-300 hover:text-white border border-slate-700 font-semibold flex items-center gap-2 transition-colors self-start sm:self-center"
        >
          {copiedBackup ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5 text-blue-400" />}
          <span>{copiedBackup ? 'Backup Downloaded!' : 'Export Progress Backup (.json)'}</span>
        </button>
      </div>

    </div>
  );
};
